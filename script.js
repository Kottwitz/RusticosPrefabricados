document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Menu Hambúrguer Mobile
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Fecha o menu mobile automaticamente ao clicar em qualquer link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // 2. Filtragem da Galeria de Obras e Trabalhos
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-primary', 'text-white', 'border-primary');
                btn.classList.add('bg-transparent', 'text-neutral-300', 'border-neutral-600');
            });
            
            button.classList.add('active', 'bg-primary', 'text-white', 'border-primary');
            button.classList.remove('bg-transparent', 'text-neutral-300', 'border-neutral-600');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // 3. Comportamento do Formulário (Redirecionamento para WhatsApp)
    const form = document.getElementById('orcamento-form');
    
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); 
            
            const inputs = form.querySelectorAll('input, select, textarea');
            const nome = inputs[0].value;
            const tipo = inputs[3].value;
            const mensagem = inputs[4].value;

            const textoWhatsapp = `Olá! Meu nome é ${nome}. Tenho interesse em orçar um projeto de: ${tipo}. Detalhes: ${mensagem}`;
            
            // Número atualizado corretamente com DDI (55) + DDD (47) + Número (91628419)
            const numeroWhatsapp = "554791628419"; 
            
            const url = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(textoWhatsapp)}`;
            
            window.open(url, '_blank');
            form.reset();
        });
    }
});