# 🌻 PWA — Para Ashley | Guia do José Augusto

## 📁 Arquivos do projeto

```
📂 pwa-ashley/
├── index.html      ← App principal (já personalizado!)
├── manifest.json   ← Metadados do app (já personalizado!)
├── sw.js           ← Service Worker — não precisa mexer
├── 1.jpeg          ← Foto 1 (já incluída)
├── 2.jpeg          ← Foto 2 (já incluída)
├── 3.jpeg          ← Foto extra (use se quiser)
├── 4.jpeg          ← Foto extra (use se quiser)
├── 5.jpeg          ← Foto extra (use se quiser)
├── icon-192.png    ← ⚠️ VOCÊ PRECISA CRIAR (veja abaixo)
└── icon-512.png    ← ⚠️ VOCÊ PRECISA CRIAR (veja abaixo)
```

---

## ✏️ O QUE VOCÊ AINDA PRECISA PERSONALIZAR

Abra o arquivo `index.html` e procure pelo bloco marcado com `✏️✏️✏️`.
São apenas **3 campos** que você precisa ajustar:

### Campo 1 — Textos da carta
```javascript
texto1: `Ashley, desde que você entrou...`,  // ✏️ Reescreva com suas palavras
texto2: `Que este aniversário seja...`,      // ✏️ Reescreva com suas palavras
```

### Campo 2 — Fotos (opcional)
```javascript
foto1: "1.jpeg",   // ✏️ Troque pelo nome da foto que preferir
foto2: "2.jpeg",   // ✏️ Troque pelo nome da foto que preferir
legenda1: "Juntos, sempre 🌻",    // ✏️ Legenda da primeira foto
legenda2: "Meu amor especial 💛", // ✏️ Legenda da segunda foto
```
> As fotos disponíveis no projeto são: 1.jpeg, 2.jpeg, 3.jpeg, 4.jpeg, 5.jpeg

### Campo 3 — Música
```javascript
musicaURL: "COLOQUE_AQUI_A_URL_DO_MP3",  // ✏️ Substitua pela URL real
```
> Opção fácil: suba o arquivo .mp3 junto com os outros arquivos no Netlify
> e coloque apenas o nome, ex: `"nossa-musica.mp3"`

---

## 🖼️ Criar os ícones (obrigatório para instalar como app)

1. Acesse: https://favicon.io/emoji-favicons/
2. Escolha o emoji 🌻
3. Baixe o pacote — renomeie os arquivos para:
   - `icon-192.png` (192×192 pixels)
   - `icon-512.png` (512×512 pixels)
4. Coloque esses dois arquivos na pasta do projeto

---

## 🚀 Como publicar (Netlify Drop — mais fácil)

1. Acesse: https://app.netlify.com/drop
2. Arraste a **pasta inteira** do projeto para a página
3. Seu app ficará disponível em `https://nome-aleatorio.netlify.app`

---

## 📱 Como instalar no celular

**Android (Chrome):**
1. Abra o link no Chrome
2. Menu (⋮) → "Adicionar à tela inicial"
3. Confirme

**iPhone (Safari):**
1. Abra o link no Safari
2. Compartilhar (ícone de caixa com seta) → "Adicionar à Tela de Início"
3. Confirme

---

## 🔔 Notificações diárias
Depois de instalar, abra o app → aba **Lembretes** → escolha o horário → "Ativar Notificações".
Você receberá um lembrete todo dia contando quantos dias faltam para 05/09/2026. 🎉
