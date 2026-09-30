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
    if (cabecalho.empresa_logo) {
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
    if (hero.hero_imagem) {
      const el = document.getElementById('hero');
      if (el) el.style.backgroundImage = `url('${hero.hero_imagem}')`;
    }

    // 3. TIPOS E SERVIÇOS (Se houver array dinâmico vindo do CMS)
    if (servicos.servicos && servicos.servicos.length > 0) {
      servicos.servicos.forEach((item, index) => {
        const i = index + 1;
        if (item.titulo) {
          const tEl = document.getElementById(`serv-tit-${i}`);
          if (tEl) tEl.textContent = item.titulo;
        }
        if (item.descricao) {
          const dEl = document.getElementById(`serv-desc-${i}`);
          if (dEl) dEl.textContent = item.descricao;
        }
        if (item.imagem) {
          const imgEl = document.getElementById(`serv-img-${i}`);
          if (imgEl) imgEl.style.backgroundImage = `url('${item.imagem}')`;
        }
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

    // 5. OBRAS (Se houver array dinâmico vindo do CMS)
    if (obras.obras && obras.obras.length > 0) {
      obras.obras.forEach((item, index) => {
        const i = index + 1;
        if (item.titulo) {
          const tEl = document.getElementById(`obra-tit-${i}`);
          if (tEl) tEl.textContent = item.titulo;
        }
        if (item.tag) {
          const tagEl = document.getElementById(`obra-tag-${i}`);
          if (tagEl) tagEl.textContent = item.tag;
        }
        if (item.descricao) {
          const dEl = document.getElementById(`obra-desc-${i}`);
          if (dEl) dEl.textContent = item.descricao;
        }
        if (item.imagem) {
          const imgEl = document.getElementById(`obra-img-${i}`);
          if (imgEl) imgEl.style.backgroundImage = `url('${item.imagem}')`;
        }
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