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
            // Função auxiliar para definir texto com segurança
            const setText = (id, text) => {
                const el = document.getElementById(id);
                if (el && text) el.innerText = text;
            };

            // Função auxiliar para definir imagens de fundo (Background-image)
            const setBgImage = (id, url) => {
                const el = document.getElementById(id);
                if (el && url) el.style.backgroundImage = `url('${url}')`;
            };

            // Função auxiliar para definir atributos src de tags <img>
            const setImgSrc = (id, url) => {
                const el = document.getElementById(id);
                if (el && url) el.src = url;
            };

            // --- CABEÇALHO E EMPRESA ---
            setText('empresa-nome', data.empresa_nome);
            setText('empresa-sub', data.empresa_sub);
            setText('footer-cnpj', data.footer_cnpj);
            setText('footer-endereco', data.footer_endereco);

            // --- WHATSAPP E REDES ---
            if (data.whatsapp_numero) {
                const numLimpo = data.whatsapp_numero.replace(/\D/g, ''); // Garante apenas números
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
                    // Formata bonitinho para exibição (ex: (47) 9162-8419 se tiver 12/13 dígitos)
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

            // --- SERVIÇOS / TIPOS (1 a 6) ---
            for (let i = 1; i <= 6; i++) {
                setText(`serv-tit-${i}`, data[`serv_tit_${i}`]);
                setText(`serv-desc-${i}`, data[`serv_desc_${i}`]);
                setBgImage(`serv-img-${i}`, data[`serv_img_${i}`]);
            }

            // --- QUALIDADE ---
            setText('qualidade-titulo', data.qualidade_titulo);
            for (let i = 1; i <= 3; i++) {
                setText(`qual-tit-${i}`, data[`qual_tit_${i}`]);
                // Suporta quebras de linha nas descrições de qualidade
                const qualDescEl = document.getElementById(`qual-desc-${i}`);
                if (qualDescEl && data[`qual_desc_${i}`]) {
                    qualDescEl.innerHTML = data[`qual_desc_${i}`].replace(/\n/g, '<br>');
                }
            }

            // --- OBRAS (1 a 4) ---
            for (let i = 1; i <= 4; i++) {
                setText(`obra-tag-${i}`, data[`obra_tag_${i}`]);
                setText(`obra-tit-${i}`, data[`obra_tit_${i}`]);
                setText(`obra-desc-${i}`, data[`obra_desc_${i}`]);
                setBgImage(`obra-img-${i}`, data[`obra_img_${i}`]);
            }

            // --- CONTATO ---
            setText('contato-titulo', data.contato_titulo);
            setText('contato-texto', data.contato_texto);

        })
        .catch(error => {
            console.warn('Aviso: Não foi possível carregar o conteúdo dinâmico (conteudo.json). O site continuará exibindo os dados padrão hardcoded.', error);
        });
});