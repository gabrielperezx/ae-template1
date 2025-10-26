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
            draggable: true,
            rewind: true, // Añade rewind para que vuelva al inicio
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
            draggable: true,
            rewind: true, // Añade rewind para que vuelva al inicio
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

            const glider = new Glider(carousel, {
                ...gliderConfig1SlidesBase,
                arrows: {
                    prev: prevButton,
                    next: nextButton,
                },
                dots: dots,
            });

            // Auto-desplazamiento cada 5 segundos
            let autoplay = setInterval(() => {
                glider.scrollItem('next');
            }, 5000);

            // Pausar autoplay al interactuar
            container.addEventListener('mouseenter', () => {
                clearInterval(autoplay);
            });

            // Reanudar autoplay al dejar de interactuar
            container.addEventListener('mouseleave', () => {
                autoplay = setInterval(() => {
                    glider.scrollItem('next');
                }, 5000);
            });
        });
    };

    const FilterGallery = () => {
        const filtroGaleria = document.querySelector('.filter-buttons');
        const filtroEvento = document.querySelector('.filter-btn');
        if (
            document.body.contains(filtroGaleria) ||
            document.body.contains(filtroEvento)
        ) {
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

            // Filtro de eventos (opcional)
            document.addEventListener('DOMContentLoaded', function () {
                const filterButtons = document.querySelectorAll('.filter-btn');
                const eventCards = document.querySelectorAll('.event-card');

                filterButtons.forEach((button) => {
                    button.addEventListener('click', function () {
                        // Remover clase active de todos los botones
                        filterButtons.forEach((btn) => btn.classList.remove('active'));

                        // Agregar clase active al botón clickeado
                        this.classList.add('active');

                        const filterValue = this.getAttribute('data-filter');

                        // Mostrar/ocultar elementos según el filtro
                        eventCards.forEach((card) => {
                            if (
                                filterValue === 'all' ||
                                card.getAttribute('data-category') === filterValue
                            ) {
                                card.style.display = 'flex';
                            } else {
                                card.style.display = 'none';
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
