(function () {
    /*----- ----- ----- ----- -----
	# Funciones
	----- ----- ----- ----- -----*/

    const Tooltips = () => {
        // Inicializar tooltips
        var tooltipTriggerList = [].slice.call(
            document.querySelectorAll('[data-bs-toggle="tooltip"]'),
        );
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    };

    const GliderCreator = () => {
        const gliderConfig3Slides = {
            slidesToShow: 1,
            slidesToScroll: 1,
            scrollLock: true,

            responsive: [
                {
                    breakpoint: 769,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                    },
                },
            ],
        };

        const gliderConfig1SlidesBase = {
            slidesToShow: 1,
            slidesToScroll: 1,
            scrollLock: true,
        };

        document.querySelectorAll('.carousel__items').forEach((carousel) => {
            const container = carousel.closest('.carousel');
            const prevButton = container.querySelector('.carousel__anterior');
            const nextButton = container.querySelector('.carousel__siguiente');
            const dots = container.querySelector('.carousel__indicadores');

            new Glider(carousel, {
                ...gliderConfig3Slides,
                arrows: {
                    prev: prevButton,
                    next: nextButton,
                },
                dots: dots,
            });
        });

        document.querySelectorAll('.carousel__lista-1').forEach((carousel) => {
            const container = carousel.closest('.carousel');
            const prevButton = container.querySelector('.carousel__anterior');
            const nextButton = container.querySelector('.carousel__siguiente');
            const dots = container.querySelector('.carousel__indicadores');

            new Glider(carousel, {
                ...gliderConfig1SlidesBase,
                arrows: {
                    prev: prevButton,
                    next: nextButton,
                },
                dots: dots,
            });
        });
    };

    const FilterGallery = () => {
        const checkCalendario = document.querySelector('.filter-buttons');
        if (document.body.contains(checkCalendario)) {
            // Filtro de galería (opcional)
            document.addEventListener('DOMContentLoaded', function () {
                const filterButtons = document.querySelectorAll('.filter-buttons .btn');
                const galleryItems = document.querySelectorAll('#gallery-grid .col-md-6');

                filterButtons.forEach((button) => {
                    button.addEventListener('click', function () {
                        // Remover clase active de todos los botones
                        filterButtons.forEach((btn) => btn.classList.remove('active'));

                        // Agregar clase active al botón clickeado
                        this.classList.add('active');

                        const filterValue = this.getAttribute('data-filter');

                        // Mostrar/ocultar elementos según el filtro
                        galleryItems.forEach((item) => {
                            if (
                                filterValue === 'all' ||
                                item.getAttribute('data-category') === filterValue
                            ) {
                                item.style.display = 'block';
                            } else {
                                item.style.display = 'none';
                            }
                        });
                    });
                });
            });
        }
    };

    /*----- ----- ----- ----- -----
	# Declaraciones
	----- ----- ----- ----- -----*/

    window.addEventListener('load', () => {
        Tooltips();
        GliderCreator();
    });
    FilterGallery();
})();
