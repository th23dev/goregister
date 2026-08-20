# GO REGISTER Landing Page

Landing page estática do GO REGISTER, sem etapa de build ou dependências locais.

## Estrutura

```text
.
├── index.html
└── assets
    ├── css
    │   └── styles.css
    ├── images
    │   └── logo.png
    └── js
        └── phone-mockup.js
```

- `index.html`: conteúdo e estrutura semântica da página.
- `assets/css/styles.css`: identidade visual, layout e responsividade.
- `assets/js/phone-mockup.js`: construção e interação do mockup 3D.
- `assets/images/logo.png`: marca usada no cabeçalho.

## Executar localmente

Como o projeto é estático, abra `index.html` diretamente no navegador ou sirva a pasta com qualquer servidor HTTP local.

## Vídeo do mockup

Para exibir um vídeo na tela do telefone, informe o caminho no atributo `data-video-src`:

```html
<div id="phoneBox" data-video-src="assets/videos/demo.mp4"></div>
```

Sem esse valor, o componente mostra uma mensagem de configuração.
