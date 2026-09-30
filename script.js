document.addEventListener('DOMContentLoaded', () => {
    // 1. MENU MOBILE (TOGGLE)
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Fechar o menu ao clicar em qualquer link interno
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // 2. CARREGAR CONTEÚDO DINÂMICO DO JSON (PAINEL ADMIN)
    fetch('conteudo.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar o conteúdo JSON.');
            }
            return response.json();
        })
        .then(data => {
            const setText = (id, text) => {
                const el = document.getElementById(id);
                if (el && text) el.innerText = text;
            };

            const setBgImage = (id, url) => {
                const el = document.getElementById(id);
                if (el && url) el.style.backgroundImage = `url('${url}')`;
            };

            const setImgSrc = (id, url) => {
                const el = document.getElementById(id);
                if (el && url) el.src = url;
            };

            // --- CABEÇALHO E EMPRESA ---
            setText('empresa-nome', data.empresa_nome);
            setText('empresa-sub', data.empresa_sub);
            setImgSrc('empresa-logo', data.empresa_logo);
            setText('footer-cnpj', data.footer_cnpj);
            setText('footer-endereco', data.footer_endereco);

            // --- WHATSAPP E REDES ---
            if (data.whatsapp_numero) {
                const numLimpo = data.whatsapp_numero.replace(/\D/g, '');
                const whatsLink = `https://wa.me/${numLimpo}`;
                const whatsLinkMsg = `https://wa.me/${numLimpo}?text=Olá!%20Gostaria%20de%20tirar%20dúvidas%20e%20fazer%20um%20orçamento.`;

                const btnHeader = document.getElementById('btn-whats-header');
                const btnMobile = document.getElementById('btn-whats-mobile');
                const btnMain = document.getElementById('btn-whats-main');
                const linkFooter = document.getElementById('link-whats-footer');

                if (btnHeader) btnHeader.href = whatsLink;
                if (btnMobile) btnMobile.href = whatsLink;
                if (btnMain) btnMain.href = whatsLinkMsg;
                if (linkFooter) {
                    linkFooter.href = whatsLink;
                    if (numLimpo.length >= 12) {
                        const ddd = numLimpo.slice(2, 4);
                        const parte1 = numLimpo.slice(4, 9);
                        const parte2 = numLimpo.slice(9);
                        linkFooter.innerText = `(${ddd}) ${parte1}-${parte2}`;
                    } else {
                        linkFooter.innerText = data.whatsapp_numero;
                    }
                }
            }

            // --- HERO (BANNER PRINCIPAL) ---
            setText('hero-titulo', data.hero_titulo);
            setText('hero-subtitulo', data.hero_subtitulo);
            setBgImage('hero', data.hero_imagem);

            // --- SERVIÇOS / TIPOS (Dinâmico via Array) ---
            if (data.servicos && Array.isArray(data.servicos)) {
                data.servicos માટે /* loop */
                data.servicos.forEach((serv, index) => {
                    const i = index + 1;
                    setText(`serv-tit-${i}`, serv.titulo);
                    setText(`serv-desc-${i}`, serv.descricao);
                    setBgImage(`serv-img-${i}`, serv.imagem);
                });
            }

            // --- QUALIDADE ---
            setText('qualidade-titulo', data.qualidade_titulo);
            for (let i = 1; i <= 3; i++) {
                setText(`qual-tit-${i}`, data[`qual_tit_${i}`]);
                const qualDescEl = document.getElementById(`qual-desc-${i}`);
                if (qualDescEl && data[`qual_desc_${i}`]) {
                    qualDescEl.innerHTML = data[`qual_desc_${i}`].replace(/\n/g, '<br>');
                }
            }

            // --- OBRAS (Dinâmico via Array) ---
            if (data.obras && Array.isArray(data.obras)) {
                data.obras.forEach((obra, index) => {
                    const i = index + 1;
                    setText(`obra-tag-${i}`, obra.tag);
                    setText(`obra-tit-${i}`, obra.titulo);
                    setText(`obra-desc-${i}`, obra.descricao);
                    setBgImage(`obra-img-${i}`, obra.imagem);
                });
            }

            // --- CONTATO ---
            setText('contato-titulo', data.contato_titulo);
            setText('contato-texto', data.contato_texto);

        })
        .catch(error => {
            console.warn('Aviso: Não foi possível carregar o conteúdo dinâmico (conteudo.json).', error);
        });
});