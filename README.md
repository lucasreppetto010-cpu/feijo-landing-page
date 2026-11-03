<div align="center">

# Método Feijo · Landing Page de Vendas

**Landing page de alta conversão para o mentor, autor e speaker Juan Feijo**
Livro · Mentoria · Conferências, com carrinho e checkout direto pelo WhatsApp

[**🔗 Ver o site no ar**]({{SITE_URL}})

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
![Responsivo](https://img.shields.io/badge/Mobile--first-0E0B0B?style=for-the-badge)

</div>

<!-- SCREENSHOTS -->

---

## 📌 Sobre o projeto

Juan Feijo é empresário, mentor e autor do livro **“Un Método para Prosperar”**. O cliente precisava de uma página que funcionasse como **portfólio de vendas** e aguentasse **tráfego pago em escala**: carregar rápido, convencer no celular e levar o visitante até a compra com o menor atrito possível.

A solução é uma landing page de página única, em espanhol rioplatense (a língua do público dele), que apresenta o autor e os três produtos:

| Produto | Como é vendido |
|---|---|
| 📕 **Livro** “Un Método para Prosperar” | Adicionado ao carrinho |
| 🚀 **CVV Mentoría** (produto principal) | Carrinho ou consulta direta |
| 🎤 **Conferências e seminários** | Contato direto pelo WhatsApp |
| 🔥 **Combo Livro + Mentoria** | Oferta destacada com upsell no carrinho |

O pedido é finalizado **no WhatsApp do cliente**, com a mensagem já escrita. Não há cadastro, gateway nem etapas extras: a pessoa escolhe, toca em um botão e já está conversando com a equipe de vendas.

---

## ✨ Destaques

### Conversão
- **Carrinho completo**: adicionar, alterar quantidade, remover. Os itens ficam salvos no navegador (`localStorage`), então a pessoa não os perde se recarregar a página.
- **Checkout por WhatsApp**: monta automaticamente a mensagem com os itens, o nome e as observações (cidade, dedicatória do livro).
- **Upsell inteligente**: o carrinho sugere trocar pelo combo quando a pessoa leva só um produto.
- **Barra de compra fixa no celular**: aparece quando o visitante passa da primeira dobra, com acesso ao carrinho e ao WhatsApp.
- **Menu fixo com o carrinho** sempre visível durante a rolagem.
- **CTAs distribuídos** em toda a jornada: hero, livro, mentoria, conferências, produtos e chamada final.

### Design e experiência
- Identidade visual derivada da capa do livro: vermelho, dourado e preto, com tipografia condensada de impacto.
- **Capa do livro desenhada 100% em CSS**: o texto escala sozinho com *container queries* (`cqw`), sem nenhuma imagem.
- **Ecossistema de marcas vetorizado**: os 16 logos das empresas do cliente foram extraídos de uma foto do livro impresso e **convertidos em SVG** (tratamento de imagem e vetorização com Potrace). Ficam nítidos em qualquer tela e pesam cerca de 100 KB no total.
- Animações de entrada suaves que respeitam `prefers-reduced-motion`.
- **Mobile-first de verdade**: testado de 320 px a desktop, sem rolagem lateral, áreas de toque de 44 px ou mais e efeitos de *hover* desligados em telas touch.

### Qualidade técnica
- **Zero dependências e zero build**: HTML, CSS e JavaScript puros. Abre direto no navegador e faz deploy em segundos.
- Código **separado e comentado** (HTML / CSS / JS / config), para qualquer pessoa conseguir editar.
- **Configuração centralizada** em um único arquivo: WhatsApp, produtos e depoimentos.
- SEO básico e Open Graph para compartilhamento em redes sociais.
- Acessibilidade: `aria-label`, foco visível, semântica correta e `aria-live` nos avisos.
- Plano B para navegadores antigos (`@supports`) e degradação elegante quando faltam imagens.

---

## 🛠️ Tecnologias

| Camada | Uso |
|---|---|
| **HTML5** semântico | Estrutura, SEO e acessibilidade |
| **CSS3** | Grid, Flexbox, Custom Properties, Container Queries, `clamp()`, `backdrop-filter` |
| **JavaScript (ES6+)** | Carrinho, checkout, IntersectionObserver, `localStorage` |
| **SVG** | Logos vetorizados e ícones |
| **Google Fonts** | Anton · Inter · Playfair Display |
| **Netlify** | Hospedagem com deploy contínuo a partir do GitHub |

---

## 📁 Estrutura

```
├── index.html        → conteúdo e textos da página
├── css/
│   └── style.css     → visual: cores, layout e versão mobile (seções comentadas)
├── js/
│   ├── config.js     → WhatsApp, produtos e depoimentos  ← edição do dia a dia
│   └── main.js       → carrinho, checkout e animações
├── img/
│   ├── marcas/       → logos vetorizados (SVG)
│   └── *.jpg / *.png → fotos
└── netlify.toml      → configuração de deploy e cache
```

---

## ⚙️ Como editar

Toda a configuração do dia a dia está em **`js/config.js`**:

```js
window.CONFIG = {
  whatsapp: "...",               // número que recebe os pedidos (só dígitos, com DDI)
  products: {
    libro:    { name: "...", sub: "..." },
    mentoria: { name: "...", sub: "..." },
    combo:    { name: "...", sub: "..." }
  },
  testimonials: [ /* depoimentos */ ]
};
```

- **Cores**: variáveis no topo de `css/style.css` (`--red`, `--gold`, `--ink`…).
- **Textos**: direto no `index.html`. Cada seção tem um cabeçalho comentado.
- **Fotos**: substitua os arquivos em `img/` mantendo os mesmos nomes.

---

## 💻 Rodando localmente

Não precisa instalar nada: basta abrir o `index.html` no navegador.

Se preferir um servidor local:

```bash
npx serve .
```

---

## 🚀 Deploy

O site está hospedado no **Netlify** com deploy contínuo: cada `git push` na branch `main` publica a nova versão automaticamente. A configuração está em `netlify.toml`, sem etapa de build.

---

## 👨‍💻 Desenvolvimento

Projeto desenvolvido por **[Lucas Reppetto](https://github.com/lucasreppetto010-cpu)**, do levantamento da marca do cliente à página no ar: estratégia de conversão, design, desenvolvimento front-end, tratamento e vetorização de marcas, responsividade e deploy.

> Textos, marcas, fotos e o conteúdo do livro pertencem a Juan Feijo / Método Feijo.
> O código é apresentado aqui como portfólio.
