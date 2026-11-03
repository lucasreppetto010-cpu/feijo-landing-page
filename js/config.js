/* ==========================================================================
   FEIJ∞ — LANDING PAGE · CONFIGURAÇÕES
   --------------------------------------------------------------------------
   Arquivo: js/config.js
   É AQUI que você edita no dia a dia, sem mexer no resto do código:
     • whatsapp     → número que recebe os pedidos (só números, com código do país)
                      Uruguai 598… · Argentina 549… · Brasil 55…
     • products     → nome e descrição curta de cada produto
                      (o site não mostra preços: o valor é combinado pelo WhatsApp)
     • testimonials → depoimentos (troque pelos reais antes de publicar)
                      photo: "img/testimonio-1.jpg" (opcional; vazio = mostra a inicial)
   ========================================================================== */

window.CONFIG = {
  // WhatsApp que recebe os pedidos — só números, com código do país (ex: 598 99 123 456 → "59899123456")
  whatsapp: "59898121715",
  // Produtos: name = nome no carrinho/WhatsApp · sub = descrição curta
  // ⚠ não mude as chaves libro / mentoria / combo nem o campo kind
  products: {
    libro:    { name: "Libro «Un Método para Prosperar»", sub: "Libro físico", kind: "book" },
    mentoria: { name: "CVV Mentoría con Feijo", sub: "Camino de la transformación", kind: "mentor" },
    combo:    { name: "Combo Prosperar: Libro + Mentoría", sub: "Libro físico + Mentoría", kind: "combo" }
  },
  // Depoimentos — TROCAR pelos reais. text = depoimento · name = nome · role = cargo/cidade
  // photo = foto opcional (ex: "img/testimonio-1.jpg"); vazio mostra a inicial do nome
  testimonials: [
    { text: "[Testimonio real de un lector sobre el libro]", name: "Nombre Apellido", role: "Emprendedor/a · Ciudad", photo: "" },
    { text: "[Testimonio real de una empresa que contrató la conferencia]", name: "Nombre Apellido", role: "Cargo · Empresa", photo: "" },
    { text: "[Testimonio real de alguien de la comunidad]", name: "Nombre Apellido", role: "Ciudad", photo: "" }
  ]
};
