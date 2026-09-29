document.addEventListener('DOMContentLoaded', () => {
    // --- MENU MOBILE TOGGLE ---
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // --- FILTRO DE OBRAS OTIMIZADO ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterBtns.length > 0 && portfolioItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Atualiza estilos visuais dos botões
                filterBtns.forEach(b => {
                    b.classList.remove('active', 'bg-primary', 'text-white', 'border-primary', 'shadow');
                    b.classList.add('bg-transparent', 'text-neutral-300', 'border-neutral-700');
                });
                
                btn.classList.add('active', 'bg-primary', 'text-white', 'border-primary', 'shadow');
                btn.classList.remove('bg-transparent', 'text-neutral-300', 'border-neutral-700');

                const filterValue = btn.getAttribute('data-filter');

                // Mostra ou oculta os itens usando classes do Tailwind
                portfolioItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    if (filterValue === 'all' || category === filterValue) {
                        item.classList.remove('hidden');
                        item.classList.add('block');
                    } else {
                        item.classList.remove('block');
                        item.classList.add('hidden');
                    }
                });
            });
        });
    }
});