Personalize o som de notificação do WhatsApp Web com qualquer arquivo MP3 do seu computador!

📖 Sobre
Uma extensão para Google Chrome/Edge que permite você personalizar completamente o som de notificação do WhatsApp Web. Cansou daquele "ding" padrão? Agora você pode usar qualquer MP3 que quiser!
✨ Características

🎵 Personalize seu som: Use qualquer arquivo MP3 (até 500KB)
🔊 Teste antes de aplicar: Ouça o som antes de salvar
💾 Armazenamento local: Seu som fica salvo no navegador
🚀 Leve e rápido: Não afeta a performance do WhatsApp
🎨 Interface moderna: Design bonito e fácil de usar
🔒 100% seguro: Todo código é aberto e auditável

🚀 Instalação
Método 1: Via Chrome Web Store (em breve)
Aguarde a publicação na Chrome Web Store
Método 2: Instalação Manual (Modo Desenvolvedor)

Clone o repositório

bashgit clone https://github.com/seu-usuario/whatsapp-sound-changer.git
cd whatsapp-sound-changer

Abra o Chrome/Edge e vá para as extensões

Chrome: chrome://extensions/
Edge: edge://extensions/


Ative o "Modo do desenvolvedor" (canto superior direito)
Clique em "Carregar sem compactação"
Selecione a pasta do projeto que você clonou
Pronto! A extensão estará instalada ✅

📱 Como Usar

Clique no ícone da extensão 🎵 na barra do Chrome
Escolha um arquivo MP3 (máximo 500KB)
Teste o som clicando em "▶️ Testar"
Clique em "✅ Usar este som"
Recarregue o WhatsApp Web (pressione F5)
Pronto! Agora receba notificações com seu som personalizado 🎉

🎨 Screenshots
Mostrar Imagem
Mostrar Imagem
Mostrar Imagem
🛠️ Tecnologias Utilizadas

JavaScript ES6+: Lógica principal
Chrome Extension Manifest V3: Arquitetura da extensão
Chrome Storage API: Armazenamento local
Web Audio API: Reprodução de áudio
HTML5/CSS3: Interface moderna

📂 Estrutura do Projeto
whatsapp-sound-changer/
├── manifest.json       # Configuração da extensão
├── popup.html          # Interface da extensão
├── popup.js            # Lógica da interface
├── content.js          # Script injetado no WhatsApp
├── inject.js           # Script que intercepta o Audio
├── icon.png            # Ícone da extensão
└── README.md           # Este arquivo
🔧 Como Funciona
A extensão funciona interceptando o construtor Audio() do JavaScript na página do WhatsApp Web. Quando o WhatsApp tenta reproduzir o som de notificação padrão, a extensão substitui pelo seu MP3 personalizado.
Fluxo Técnico:

content.js injeta inject.js na página
inject.js sobrescreve window.Audio
Quando WhatsApp cria um new Audio() para notificação
O som é substituído pelo MP3 do usuário (armazenado em base64)
O áudio personalizado é reproduzido

🤝 Contribuindo
Contribuições são bem-vindas! Sinta-se livre para:

Fazer um Fork do projeto
Criar uma Branch para sua feature (git checkout -b feature/NovaFeature)
Commit suas mudanças (git commit -m 'Adiciona nova feature')
Push para a Branch (git push origin feature/NovaFeature)
Abrir um Pull Request

Ideias para contribuir:

 Adicionar biblioteca de sons pré-definidos
 Suporte para outros formatos de áudio (WAV, OGG)
 Opção de volume customizado
 Sons diferentes para contatos/grupos específicos
 Modo escuro na interface

🐛 Encontrou um Bug?
Abra uma Issue descrevendo:

O que aconteceu
O que você esperava que acontecesse
Passos para reproduzir o problema
Screenshots (se possível)

❓ FAQ
P: A extensão funciona no WhatsApp Desktop (aplicativo)?
R: Não, apenas no WhatsApp Web (navegador).
P: Por que preciso recarregar a página?
R: A interceptação do áudio acontece no carregamento da página, então é necessário recarregar.
P: Meu som não está tocando!
R: Verifique se o arquivo é MP3 válido e está abaixo de 500KB.
P: É seguro usar esta extensão?
R: Sim! Todo o código é aberto e pode ser auditado. A extensão não coleta dados.
P: Funciona em outros navegadores?
R: Funciona em navegadores baseados em Chromium (Chrome, Edge, Brave, Opera).
💝 Apoie o Projeto
Se você gostou da extensão e quer apoiar o desenvolvimento:
PIX: sdh@hotmail.com.br
Qualquer valor é bem-vindo e ajuda a manter o projeto! ☕
📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
👨‍💻 Autor
Feito com ❤️ por Seu Nome

⭐ Se gostou do projeto, deixe uma estrela no GitHub!
🔗 Links Úteis

Reportar Bug
Solicitar Feature
Documentação do Chrome Extensions
WhatsApp Web
