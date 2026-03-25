// =============================================
// SERVICE WORKER — Girassol PWA
// Gerencia cache offline + notificações diárias
// =============================================

const CACHE_NAME = 'girassol-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
];

// ── Instalação: cache dos arquivos ────────────
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// ── Ativação: limpar caches antigos ───────────
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
  // Reagendar notificações ao ativar
  agendarNotificacaoDiaria();
});

// ── Fetch: servir do cache quando offline ─────
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});

// ── Mensagens do app principal ────────────────
self.addEventListener('message', e => {
  if (e.data?.tipo === 'AGENDAR_NOTIF') {
    const { horario, dataEspecial, nomePessoa } = e.data;
    // Salvar configuração no SW (IndexedDB seria mais robusto, mas usamos variáveis globais)
    self.notifConfig = { horario, dataEspecial, nomePessoa };
    agendarNotificacaoDiaria();
  }
});

// ── Clique na notificação ─────────────────────
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cs => {
      if (cs.length > 0) { cs[0].focus(); return; }
      return clients.openWindow('/');
    })
  );
});

// ── Agendar notificação diária ────────────────
let notifTimeout = null;

function agendarNotificacaoDiaria() {
  if (!self.notifConfig) return;

  const { horario, dataEspecial, nomePessoa } = self.notifConfig;
  const [h, m] = horario.split(':').map(Number);

  const agora  = new Date();
  const alvo   = new Date();
  alvo.setHours(h, m, 0, 0);

  // Se já passou hoje, agendar para amanhã
  if (alvo <= agora) alvo.setDate(alvo.getDate() + 1);

  const msAte = alvo - agora;

  // Limpar timeout anterior
  if (notifTimeout) clearTimeout(notifTimeout);

  notifTimeout = setTimeout(async () => {
    await dispararNotificacao(dataEspecial, nomePessoa);
    // Reagendar para o próximo dia
    agendarNotificacaoDiaria();
  }, msAte);
}

async function dispararNotificacao(dataEspecial, nomePessoa) {
  const alvo = new Date(dataEspecial);
  const diff = alvo - new Date();

  let titulo, corpo;

  if (diff <= 0) {
    // Chegou o dia!
    titulo = '🎉 Chegou o dia!';
    corpo  = `Hoje é o dia especial de ${nomePessoa}! Feliz aniversário! 🌻💛`;
  } else {
    const dias  = Math.floor(diff / 86400000);
    const horas = Math.floor((diff % 86400000) / 3600000);

    if (dias === 0) {
      titulo = '🌻 Hoje é o grande dia!';
      corpo  = `Faltam apenas ${horas} hora${horas!==1?'s':''} para o dia especial de ${nomePessoa}! 💛`;
    } else if (dias === 1) {
      titulo = '🌻 Falta 1 dia!';
      corpo  = `Amanhã é o dia especial de ${nomePessoa}! Prepare-se! 💛`;
    } else if (dias <= 7) {
      titulo = `🌻 Faltam ${dias} dias!`;
      corpo  = `O dia especial de ${nomePessoa} está chegando! 💛`;
    } else if (dias <= 30) {
      titulo = `🌻 ${dias} dias para o grande dia`;
      corpo  = `A contagem regressiva continua para o aniversário de ${nomePessoa}! 🌸`;
    } else {
      titulo = `🌻 ${dias} dias restantes`;
      corpo  = `Ainda faltam ${dias} dias para o dia especial de ${nomePessoa}. Já se animando! 💛`;
    }
  }

  await self.registration.showNotification(titulo, {
    body:    corpo,
    icon:    '/icon-192.png',
    badge:   '/icon-192.png',
    tag:     'girassol-lembrete',        // substitui notif anterior (não empilha)
    renotify: true,
    vibrate: [200, 100, 200],
    data:    { url: '/' },
    actions: [
      { action: 'abrir', title: '💌 Abrir app' },
      { action: 'fechar', title: 'Fechar' },
    ],
  });
}
