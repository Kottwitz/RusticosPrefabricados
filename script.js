document.addEventListener("DOMContentLoaded", async () => {
  try {
    const [cabecalho, hero, servicos, qualidade, obras, contato] = await Promise.all([
      fetch('conteudo-cabecalho.json').then(res => res.json()).catch(() => ({})),
      fetch('conteudo-hero.json').then(res => res.json()).catch(() => ({})),
      fetch('conteudo-servicos.json').then(res => res.json()).catch(() => ({ servicos: [] })),
      fetch('conteudo-qualidade.json').then(res => res.json()).catch(() => ({})),
      fetch('conteudo-obras.json').then(res => res.json()).catch(() => ({ obras: [] })),
      fetch('conteudo-contato.json').then(res => res.json()).catch(() => ({}))
    ]);

    // 1. CABEÇALHO E RODAPÉ
    if (cabecalho.empresa_nome) {
      const el = document.getElementById('empresa-nome');
      if (el) el.innerHTML = `<span class="text-primary">//</span> ${cabecalho.empresa_nome}`;
    }
    if (cabecalho.empresa_sub) {
      const el = document.getElementById('empresa-sub');
      if (el) el.textContent = cabecalho.empresa_sub;
    }
    if (cabecalho.empresa_logo && cabecalho.empresa_logo.trim() !== "") {
      const el = document.getElementById('logo-img');
      if (el) el.src = cabecalho.empresa_logo;
    }
    if (cabecalho.whatsapp_numero) {
      document.querySelectorAll('a[href^="https://wa.me"]').forEach(el => {
        const currentHref = el.getAttribute('href');
        const textParam = currentHref.includes('?text=') ? currentHref.substring(currentHref.indexOf('?text=')) : '';
        el.href = `https://wa.me/${cabecalho.whatsapp_numero}${textParam}`;
      });
      const footerPhone = document.getElementById('link-whats-footer');
      if (footerPhone && cabecalho.whatsapp_numero.length >= 11) {
        footerPhone.textContent = `(${cabecalho.whatsapp_numero.substring(2,4)}) ${cabecalho.whatsapp_numero.substring(4,8)}-${cabecalho.whatsapp_numero.substring(8)}`;
      }
    }
    if (cabecalho.footer_cnpj) {
      const el = document.getElementById('footer-cnpj');
      if (el) el.textContent = `CNPJ: ${cabecalho.footer_cnpj}`;
    }
    if (cabecalho.footer_endereco) {
      const el = document.getElementById('footer-endereco');
      if (el) el.textContent = cabecalho.footer_endereco;
    }

    // 2. HERO
    if (hero.hero_titulo) {
      const el = document.getElementById('hero-titulo');
      if (el) el.textContent = hero.hero_titulo;
    }
    if (hero.hero_subtitulo) {
      const el = document.getElementById('hero-subtitulo');
      if (el) el.textContent = hero.hero_subtitulo;
    }
    if (hero.hero_imagem && hero.hero_imagem.trim() !== "") {
      const el = document.getElementById('hero');
      if (el) el.style.backgroundImage = `url('${hero.hero_imagem}')`;
    }

    // 3. TIPOS E SERVIÇOS (Dinâmico)
    const containerServicos = document.querySelector('#servicos .grid');
    if (servicos.servicos && servicos.servicos.length > 0 && containerServicos) {
      containerServicos.innerHTML = '';
      servicos.servicos.forEach(item => {
        const cardHtml = `
          <div class="bg-card rounded-lg overflow-hidden shadow-xl border border-[#3a2e24] flex flex-col">
              <div class="h-52 bg-cover bg-center bg-neutral-800" style="background-image: url('${item.imagem || 'https://images.pexels.com/photos/14459280/pexels-photo-14459280.jpeg'}');"></div>
              <div class="p-6 flex flex-col flex-grow justify-between">
                  <div>
                      <h3 class="font-heading font-bold text-xl mb-2">${item.titulo || ''}</h3>
                      <p class="text-neutral-400 text-sm mb-6">${item.descricao || ''}</p>
                  </div>
                  <div><a href="#contato" class="inline-block border border-primary text-primary hover:bg-primary hover:text-white font-semibold text-sm py-2 px-4 rounded transition-all">Saiba Mais</a></div>
              </div>
          </div>
        `;
        containerServicos.innerHTML += cardHtml;
      });
    }

    // 4. QUALIDADE
    if (qualidade.qualidade_titulo) {
      const el = document.getElementById('qualidade-titulo');
      if (el) el.textContent = qualidade.qualidade_titulo;
    }
    for (let i = 1; i <= 3; i++) {
      if (qualidade[`qual_tit_${i}`]) {
        const titEl = document.getElementById(`qual-tit-${i}`);
        if (titEl) titEl.textContent = qualidade[`qual_tit_${i}`];
      }
      if (qualidade[`qual_desc_${i}`]) {
        const descEl = document.getElementById(`qual-desc-${i}`);
        if (descEl) descEl.innerHTML = qualidade[`qual_desc_${i}`];
      }
    }

    // 5. OBRAS E TRABALHOS (Dinâmico com Layout Alternado)
    const containerObras = document.querySelector('#obras .space-y-12');
    if (obras.obras && obras.obras.length > 0 && containerObras) {
      containerObras.innerHTML = '';
      obras.obras.forEach((item, index) => {
        const isEven = index % 2 === 0;
        const imageOrderClass = isEven ? '' : 'md:order-2';
        const contentOrderClass = isEven ? '' : 'md:order-1';

        const obraHtml = `
          <div class="bg-card rounded-xl overflow-hidden shadow-xl border border-[#3a2e24] grid grid-cols-1 md:grid-cols-2 gap-0">
              <div class="h-72 md:h-auto bg-cover bg-center ${imageOrderClass}" style="background-image: url('${item.imagem || 'https://images.pexels.com/photos/14459280/pexels-photo-14459280.jpeg'}');"></div>
              <div class="p-8 flex flex-col justify-center ${contentOrderClass}">
                  <span class="text-primary text-xs font-heading font-bold tracking-widest uppercase mb-2">${item.tag || ''}</span>
                  <h3 class="font-heading font-bold text-2xl mb-4 text-white">${item.titulo || ''}</h3>
                  <p class="text-neutral-300 text-sm leading-relaxed mb-6">${item.descricao || ''}</p>
                  <a href="#contato" class="inline-block text-primary font-semibold text-sm hover:underline">Solicitar projeto semelhante &rarr;</a>
              </div>
          </div>
        `;
        containerObras.innerHTML += obraHtml;
      });
    }

    // 6. CONTATO
    if (contato.contato_titulo) {
      const el = document.getElementById('contato-titulo');
      if (el) el.textContent = contato.contato_titulo;
    }
    if (contato.contato_texto) {
      const el = document.getElementById('contato-texto');
      if (el) el.textContent = contato.contato_texto;
    }

  } catch (error) {
    console.error("Erro ao carregar os dados:", error);
  }
});