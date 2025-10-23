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

    /*----- ----- ----- ----- -----
	# Declaraciones
	----- ----- ----- ----- -----*/

    window.addEventListener('load', () => {
        Tooltips();
        GliderCreator();
    });
})();
