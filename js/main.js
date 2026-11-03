/* ==========================================================================
   FEIJ∞ — LANDING PAGE · FUNCIONAMENTO
   --------------------------------------------------------------------------
   Arquivo: js/main.js
   Carrinho, checkout pelo WhatsApp, preços, depoimentos e animações.
   Preços, número e depoimentos NÃO ficam aqui → edite em js/config.js
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. FUNÇÕES AUXILIARES
   $ / $$  → atalhos para buscar elementos na página
   waUrl   → monta o link do WhatsApp com a mensagem pronta
   -------------------------------------------------------------------------- */
const $ = (s, el=document) => el.querySelector(s);
const $$ = (s, el=document) => [...el.querySelectorAll(s)];
const CONFIG = window.CONFIG;
const waUrl = text => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;

/* --------------------------------------------------------------------------
   2. LINKS DO WHATSAPP
   data-wa-link vira link do WhatsApp (mensagem geral);
   data-wa-mentor abre com mensagem sobre a mentoria.
   -------------------------------------------------------------------------- */
$$('[data-wa-mentor]').forEach(a => { a.href = waUrl("¡Hola Feijo! 🚀 Quiero saber más sobre tu mentoría."); a.target = "_blank"; a.rel = "noopener"; });
$$('[data-wa-link]').forEach(a => { a.href = waUrl("¡Hola Feijo! Vengo de tu página web y quiero más información."); a.target = "_blank"; a.rel = "noopener"; });
$('#yr').textContent = new Date().getFullYear();

/* --------------------------------------------------------------------------
   3. DEPOIMENTOS — gerados a partir de CONFIG.testimonials (js/config.js)
   -------------------------------------------------------------------------- */
$('#testiGrid').innerHTML = CONFIG.testimonials.map(t => `
  <article class="t-card rv">
    <div class="stars">★★★★★</div>
    <q>${t.text}</q>
    <div class="t-who"><div class="t-av">${t.photo ? `<img src="${t.photo}" alt="">` : t.name.charAt(0)}</div><div><b>${t.name}</b><span>${t.role}</span></div></div>
  </article>`).join('');

/* --------------------------------------------------------------------------
   4. CARRINHO
   O carrinho fica salvo no navegador do visitante (localStorage),
   então ele não perde os itens se recarregar a página.
   -------------------------------------------------------------------------- */
let cart = {};
try { cart = JSON.parse(localStorage.getItem('feijo_cart') || '{}') || {}; } catch(e) { cart = {}; }
// Remove do carrinho salvo produtos que não existem mais (ex: o antigo eBook)
Object.keys(cart).forEach(id => { if (!CONFIG.products[id]) delete cart[id]; });
const save = () => { try { localStorage.setItem('feijo_cart', JSON.stringify(cart)); } catch(e) {} };
const count = () => Object.values(cart).reduce((a,b) => a+b, 0);

const miniBook = () => `<div class="book"><span class="b-top">MF</span><div class="b-title"><div class="b-un">Un</div><div class="b-met">Método</div><div class="b-para">para</div><div class="b-pros">Prosperar</div></div></div>`;

/* Desenha o carrinho (itens, quantidades e oferta do combo) */
function render(){
  const n = count();
  const badge = $('#cartCount');
  badge.textContent = n; badge.classList.toggle('show', n > 0);
  $('#bbCount').textContent = n;
  const ids = Object.keys(cart);
  if (!ids.length){
    $('#cartBody').innerHTML = `<div class="d-empty">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
      <p><b>Tu carrito está vacío</b></p><p style="font-size:.9rem;margin:.3rem 0 1.2rem">Empezá con el combo: el libro + la mentoría con Feijo.</p>
      <button class="btn btn-primary" data-add="combo">Agregar combo Libro + Mentoría</button></div>`;
    $('#cartFoot').style.display = 'none';
    return;
  }
  $('#cartFoot').style.display = '';
  let html = ids.map(id => {
    const p = CONFIG.products[id]; const q = cart[id];
    const thumb = p.kind === 'mentor'
      ? `<div class="ci-thumb talk">1:1</div>`
      : `<div class="ci-thumb">${miniBook()}</div>`;
    return `<div class="ci">
      ${thumb}
      <div><h6>${p.name}</h6><div class="ci-sub">${p.sub}</div>
        <div class="qty"><button aria-label="Menos" data-dec="${id}">−</button><span>${q}</span><button aria-label="Más" data-inc="${id}">+</button></div></div>
      <div class="ci-right"><button class="ci-rm" data-rm="${id}">Quitar</button></div>
    </div>`;
  }).join('');
  // Oferta: trocar livro/mentoria avulsos pelo combo
  const hasL = cart.libro, hasM = cart.mentoria;
  if ((hasL || hasM) && !cart.combo){
    const txt = hasL && hasM
      ? `Cambiá a <b>Combo Libro + Mentoría</b> y llevá todo junto.`
      : hasL
        ? `Sumá la <b>mentoría con Feijo</b> con el Combo y aplicá el libro a tu negocio.`
        : `Sumá el <b>libro físico</b> con el Combo Libro + Mentoría.`;
    html += `<div class="upsell"><span>💡 ${txt}</span><button data-swap>Lo quiero</button></div>`;
  }
  $('#cartBody').innerHTML = html;
}

/* Adiciona um produto ao carrinho e mostra o aviso */
function add(id){
  if (!CONFIG.products[id]) return;
  cart[id] = (cart[id] || 0) + 1; save(); render();
  const b = $('#cartBtn'); b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump');
  toast(`${CONFIG.products[id].name.split('«')[0].trim()} agregado`);
}
let tt;
function toast(msg){ $('#toastMsg').textContent = msg; const t = $('#toast'); t.classList.add('show'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('show'), 3200); }

/* Abre / fecha a gaveta do carrinho */
function openCart(){ $('#drawer').classList.add('open'); $('#overlay').classList.add('open'); $('#drawer').setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; $('#toast').classList.remove('show'); }
function closeCart(){ $('#drawer').classList.remove('open'); $('#overlay').classList.remove('open'); $('#drawer').setAttribute('aria-hidden','true'); document.body.style.overflow=''; }

/* Cliques em botões do carrinho:
   data-add="id" → adiciona · data-inc / data-dec → + / − · data-rm → remove
   data-swap → troca livro/eBook pelo combo */
document.addEventListener('click', e => {
  const t = e.target.closest('[data-add],[data-inc],[data-dec],[data-rm],[data-swap]');
  if (!t) return;
  const d = t.dataset;
  if (d.add){ add(d.add); return; }
  if (d.inc){ cart[d.inc]++; }
  if (d.dec){ cart[d.dec]--; if (cart[d.dec] <= 0) delete cart[d.dec]; }
  if (d.rm){ delete cart[d.rm]; }
  if ('swap' in d){ ['libro','mentoria'].forEach(k => { if (cart[k] && --cart[k] <= 0) delete cart[k]; }); cart.combo = (cart.combo||0) + 1; }
  save(); render();
});
$('#cartBtn').onclick = openCart; $('#bbCart').onclick = openCart; $('#toastView').onclick = openCart;
$('#closeCart').onclick = closeCart; $('#overlay').onclick = closeCart;
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCart(); });

/* --------------------------------------------------------------------------
   5. FINALIZAR COMPRA → abre o WhatsApp com o pedido escrito
   Para mudar o texto da mensagem, edite as linhas do array "msg" abaixo.
   -------------------------------------------------------------------------- */
$('#checkout').onclick = () => {
  const name = $('#cNombre').value.trim();
  const note = $('#cNota').value.trim();
  const lines = Object.entries(cart).map(([id,q]) => `• ${q}x ${CONFIG.products[id].name}`);
  const msg = [
    `¡Hola Feijo! 👋 Quiero hacer este pedido desde la web:`,
    ``,
    ...lines,
    ``,
    name ? `Nombre: ${name}` : null,
    note ? `Notas: ${note}` : null,
    ``,
    `¿Me pasás el valor y cómo sigo con el pago?`
  ].filter(l => l !== null).join('\n');
  window.open(waUrl(msg), '_blank');
};

/* --------------------------------------------------------------------------
   6. BOTÕES DE CONFERÊNCIA → WhatsApp com mensagem própria
   -------------------------------------------------------------------------- */
$$('[data-wa-talk]').forEach(a => { a.href = waUrl("¡Hola Feijo! 🎤 Quiero llevarte a dar una conferencia en mi evento."); a.target = "_blank"; a.rel = "noopener"; });

/* --------------------------------------------------------------------------
   7. BARRA DE COMPRA NO CELULAR + ANIMAÇÃO AO ROLAR
   A barra aparece quando o topo (hero) sai da tela.
   -------------------------------------------------------------------------- */
const bb = $('#buybar');
const heroEl = $('.hero');
new IntersectionObserver(([en]) => { bb.classList.toggle('show', !en.isIntersecting); document.body.classList.toggle('bb-on', !en.isIntersecting); }, { threshold: 0 }).observe(heroEl);

const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } }), { threshold: .12 });
$$('.rv').forEach(el => io.observe(el));

/* Primeira renderização do carrinho ao abrir a página */
render();
