document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Carrega todos os ficheiros JSON em paralelo de forma eficiente
    const [cabecalho, hero, servicos, qualidade, obras, contato] = await Promise.all([
      fetch('conteudo-cabecalho.json').then(res => res.json()).catch(() => ({})),
      fetch('conteudo-hero.json').then(res => res.json()).catch(() => ({})),
      fetch('conteudo-servicos.json').then(res => res.json()).catch(() => ({ servicos: [] })),
      fetch('conteudo-qualidade.json').then(res => res.json()).catch(() => ({})),
      fetch('conteudo-obras.json').then(res => res.json()).catch(() => ({ obras: [] })),
      fetch('conteudo-contato.json').then(res => res.json()).catch(() => ({}))
    ]);

    // 1. PREENCHER CABEÇALHO E RODAPÉ
    if (cabecalho.empresa_nome) {
      document.querySelectorAll('.empresa-nome').forEach(el => el.textContent = cabecalho.empresa_nome);
    }
    if (cabecalho.empresa_sub) {
      document.querySelectorAll('.empresa-sub').forEach(el => el.textContent = cabecalho.empresa_sub);
    }
    if (cabecalho.empresa_logo) {
      document.querySelectorAll('.empresa-logo').forEach(el => {
        el.src = cabecalho.empresa_logo;
        el.style.display = 'block';
      });
    }
    if (cabecalho.whatsapp_numero) {
      document.querySelectorAll('.whatsapp-link').forEach(el => {
        el.href = `https://wa.me/${cabecalho.whatsapp_numero}`;
      });
    }
    if (cabecalho.footer_cnpj) {
      const el = document.querySelector('.footer-cnpj');
      if (el) el.textContent = `CNPJ: ${cabecalho.footer_cnpj}`;
    }
    if (cabecalho.footer_endereco) {
      const el = document.querySelector('.footer-endereco');
      if (el) el.textContent = cabecalho.footer_endereco;
    }

    // 2. PREENCHER BANNER PRINCIPAL (HERO)
    if (hero.hero_titulo) {
      const el = document.querySelector('.hero-titulo');
      if (el) el.textContent = hero.hero_titulo;
    }
    if (hero.hero_subtitulo) {
      const el = document.querySelector('.hero-subtitulo');
      if (el) el.textContent = hero.hero_subtitulo;
    }
    if (hero.hero_imagem) {
      const el = document.querySelector('.hero-section');
      if (el) {
        el.style.backgroundImage = `url('${hero.hero_imagem}')`;
        el.style.backgroundSize = 'cover';
        el.style.backgroundPosition = 'center';
      }
    }

    // 3. PREENCHER TIPOS E SERVIÇOS
    const servicosContainer = document.querySelector('.servicos-container');
    if (servicosContainer && servicos.servicos) {
      servicosContainer.innerHTML = servicos.servicos.map(servico => `
        <div class="servico-card">
          ${servico.imagem ? `<img src="${servico.imagem}" alt="${servico.titulo}">` : ''}
          <h3>${servico.titulo}</h3>
          <p>${servico.descricao}</p>
        </div>
      `).join('');
    }

    // 4. PREENCHER PADRÃO DE QUALIDADE
    if (qualidade.qualidade_titulo) {
      const el = document.querySelector('.qualidade-titulo');
      if (el) el.textContent = qualidade.qualidade_titulo;
    }
    for (let i = 1; i <= 3; i++) {
      if (qualidade[`qual_tit_${i}`]) {
        const titEl = document.querySelector(`.qual-tit-${i}`);
        if (titEl) titEl.textContent = qualidade[`qual_tit_${i}`];
      }
      if (qualidade[`qual_desc_${i}`]) {
        const descEl = document.querySelector(`.qual-desc-${i}`);
        if (descEl) descEl.textContent = qualidade[`qual_desc_${i}`];
      }
    }

    // 5. PREENCHER OBRAS E PORTFÓLIO
    const obrasContainer = document.querySelector('.obras-container');
    if (obrasContainer && obras.obras) {
      obrasContainer.innerHTML = obras.obras.map(obra => `
        <div class="obra-card">
          ${obra.imagem ? `<img src="${obra.imagem}" alt="${obra.titulo}">` : ''}
          <span class="obra-tag">${obra.tag || ''}</span>
          <h3>${obra.titulo}</h3>
          <p>${obra.descricao}</p>
        </div>
      `).join('');
    }

    // 6. PREENCHER CONTATO
    if (contato.contato_titulo) {
      const el = document.querySelector('.contato-titulo');
      if (el) el.textContent = contato.contato_titulo;
    }
    if (contato.contato_texto) {
      const el = document.querySelector('.contato-texto');
      if (el) el.textContent = contato.contato_texto;
    }

  } catch (error) {
    console.error("Erro ao carregar os dados dinâmicos do site:", error);
  }
});