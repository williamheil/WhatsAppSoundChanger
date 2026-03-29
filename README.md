# 🎵 WhatsApp Web Sound Changer

**Personalize o som de notificação do WhatsApp Web com qualquer arquivo MP3 do seu computador!**

---

## 📖 Sobre

Uma extensão para **Google Chrome** e **Microsoft Edge** que permite personalizar completamente o som de notificação do **WhatsApp Web**.  
Cansou daquele "ding" padrão? Agora você pode usar **qualquer MP3** que quiser! 🔥

---

## ✨ Características

- 🎵 **Som personalizado:** Use qualquer arquivo MP3 (até **500KB**)
- 🔊 **Teste antes de aplicar:** Ouça o som antes de salvar
- 💾 **Armazenamento local:** Seu som é salvo no próprio navegador
- 🚀 **Leve e rápido:** Não afeta o desempenho do WhatsApp
- 🎨 **Interface moderna:** Bonita, responsiva e fácil de usar
- 🔒 **100% seguro:** Código aberto e totalmente auditável

---

## 🚀 Instalação

### 🔹 Método 1 — Chrome Web Store (em breve)

> Baixe o zip [Aqui]([https://github.com/williamheil/WhatsAppSoundChanger/archive/refs/heads/main.zip)) e siga as instruções abaixo.

2. **Abra o gerenciador de extensões:**
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`

3. **Ative o "Modo do desenvolvedor"** (canto superior direito)

4. **Clique em "Carregar sem compactação"**

5. **Selecione a pasta do projeto** que você clonou

✅ **Pronto! A extensão estará instalada.**

---

## 📱 Como Usar

1. Clique no ícone 🎵 da extensão na barra do Chrome
2. Escolha um arquivo MP3 (máximo 500KB)
3. Clique em "▶️ Testar" para ouvir
4. Clique em "✅ Usar este som"
5. Recarregue o WhatsApp Web (F5)

🎉 **Pronto! Agora suas notificações tocam com seu som personalizado!**

---

## 🛠️ Tecnologias Utilizadas

- **JavaScript (ES6+)** — Lógica principal
- **Chrome Extension Manifest V3** — Estrutura da extensão
- **Chrome Storage API** — Armazenamento local
- **Web Audio API** — Reprodução do áudio
- **HTML5 / CSS3** — Interface moderna e leve

---

## 📂 Estrutura do Projeto
```
WhatsAppSoundChanger/
├── manifest.json       # Configuração da extensão
├── popup.html          # Interface da extensão
├── popup.js            # Lógica da interface
├── content.js          # Script injetado no WhatsApp
├── inject.js           # Intercepta o som padrão
├── icon.png            # Ícone da extensão
└── README.md           # Este arquivo
```

---

## 🔧 Como Funciona

A extensão intercepta o construtor `Audio()` do WhatsApp Web.  
Sempre que o WhatsApp tenta tocar o som padrão, a extensão substitui o áudio pelo seu MP3 personalizado.

**Fluxo técnico:**

1. `content.js` injeta `inject.js` na página
2. `inject.js` sobrescreve `window.Audio`
3. Quando o WhatsApp chama `new Audio()` para o som de notificação
4. O som é substituído pelo MP3 do usuário (armazenado em base64)
5. O áudio personalizado é reproduzido 🎧

---

## 🤝 Contribuindo

Contribuições são muito bem-vindas! 💡

1. Faça um **Fork** do projeto
2. Crie uma branch para sua feature
```bash
git checkout -b feature/minha-feature
```

3. Commit suas alterações
```bash
git commit -m "Adiciona nova feature"
```

4. Envie sua branch
```bash
git push origin feature/minha-feature
```

5. Abra um **Pull Request** 🚀

**Ideias para contribuir:**
- Biblioteca de sons pré-definidos
- Suporte para outros formatos (WAV, OGG)
- Controle de volume
- Sons diferentes por contato/grupo
- Modo escuro 🌙

---

## 🐛 Reportar Bug

Abra uma **[Issue](https://github.com/williamheil/WhatsAppSoundChanger/issues)** descrevendo:
- O que aconteceu
- O que esperava que acontecesse
- Passos para reproduzir
- Capturas de tela (se possível)

---

## ❓ FAQ

**P: Funciona no WhatsApp Desktop (app)?**  
R: Não. Apenas no WhatsApp Web.

**P: Por que preciso recarregar a página?**  
R: A interceptação do áudio ocorre no carregamento da página.

**P: Meu som não toca!**  
R: Verifique se o arquivo é MP3 válido e menor que 500KB.

**P: É seguro usar?**  
R: Sim! O código é 100% aberto e não coleta dados.

**P: Funciona em outros navegadores?**  
R: Sim, em qualquer navegador baseado em Chromium (Chrome, Edge, Brave, Opera).

---

⭐ **Se gostou do projeto, deixe uma estrela no GitHub!**
