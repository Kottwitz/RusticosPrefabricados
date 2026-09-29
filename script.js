document.addEventListener('DOMContentLoaded', () => {
    // --- MENU MOBILE TOGGLE ---
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Fecha o menu ao clicar em qualquer link interno
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // --- FILTRO DA GALERIA DE OBRAS ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterBtns.length > 0 && portfolioItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove classes ativas de todos os botões
                filterBtns.forEach(b => {
                    b.classList.remove('active', 'bg-primary', 'text-white', 'border-primary');
                    b.classList.add('bg-transparent', 'text-neutral-300', 'border-neutral-600');
                });
                
                // Adiciona classes ativas apenas no botão clicado
                btn.classList.add('active', 'bg-primary', 'text-white', 'border-primary');
                btn.classList.remove('bg-transparent', 'text-neutral-300', 'border-neutral-600');

                const filterValue = btn.getAttribute('data-filter');

                // Mostra ou esconde os itens com base na categoria
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
});