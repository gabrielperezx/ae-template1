(function () {
    /*----- ----- ----- ----- -----
	# Funciones
	----- ----- ----- ----- -----*/

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

            const glider = new Glider(carousel, {
                ...gliderConfig3Slides,
                arrows: {
                    prev: prevButton,
                    next: nextButton,
                },
                dots: dots,
            });

            let autoplay = setInterval(() => {
                glider.scrollItem('next');
            }, 2000);

            container.addEventListener('mouseenter', () => {
                clearInterval(autoplay);
            });

            container.addEventListener('mouseleave', () => {
                autoplay = setInterval(() => {
                    glider.scrollItem('next');
                }, 4000);
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
            }, 4000);

            // Pausar autoplay al interactuar
            container.addEventListener('mouseenter', () => {
                clearInterval(autoplay);
            });

            // Reanudar autoplay al dejar de interactuar
            container.addEventListener('mouseleave', () => {
                autoplay = setInterval(() => {
                    glider.scrollItem('next');
                }, 4000);
            });
        });
    };

    const Calendario = () => {
        const checkCalendario = document.querySelector('.calendar');
        if (document.body.contains(checkCalendario)) {
            const monthYearElement = document.getElementById('monthYear'),
                datesElement = document.getElementById('dates'),
                eventsContainer = document.getElementById('eventsContainer'),
                prevBtn = document.getElementById('prevBtn'),
                nextBtn = document.getElementById('nextBtn');

            let currentDate = new Date();
            const events = [
                {
                    date: new Date().toISOString().split('T')[0], // Evento para hoy
                    title: 'Evento de hoy',
                    description: 'Este es un evento para el día de hoy',
                },
                {
                    date: '2025-11-15',
                    title: 'BOLETA PRIMARIA',
                    description: 'Información de Boletín de primaria',
                },
                {
                    date: '2025-12-20',
                    title: 'ANIVERSARIO DEL COLEGIO',
                    description: 'Información',
                },
            ];

            const updateCalendar = () => {
                const currentYear = currentDate.getFullYear(),
                    currentMonth = currentDate.getMonth();

                const firstDay = new Date(currentYear, currentMonth, 1),
                    lastDay = new Date(currentYear, currentMonth + 1, 0),
                    totalDays = lastDay.getDate(),
                    firstDayIndex = firstDay.getDay(),
                    lastDayIndex = lastDay.getDay();

                const monthYearString = currentDate.toLocaleString('default', {
                    month: 'long',
                    year: 'numeric',
                });
                monthYearElement.textContent = monthYearString;

                let datesHTML = '';

                for (let i = firstDayIndex; i > 0; i--) {
                    const prevDate = new Date(currentYear, currentMonth, -i + 1);
                    datesHTML += `<div class="calendar__date inactive">${prevDate.getDate()}</div>`;
                }

                for (let i = 1; i <= totalDays; i++) {
                    const date = new Date(currentYear, currentMonth, i);
                    const formattedDate = date.toISOString().split('T')[0];
                    const hasEvent = events.some((event) => event.date === formattedDate);
                    const activeClass =
                        date.toDateString() === new Date().toDateString() ? 'active' : '';
                    const eventClass = hasEvent ? 'event' : '';
                    datesHTML += `<div class="calendar__date ${activeClass} ${eventClass}" data-date="${formattedDate}">${i}</div>`;
                }

                for (let i = 1; i <= 6 - lastDayIndex; i++) {
                    const nextDate = new Date(currentYear, currentMonth + 1, i);
                    datesHTML += `<div class="calendar__date inactive">${nextDate.getDate()}</div>`;
                }

                datesElement.innerHTML = datesHTML;

                attachDateClickListeners();
            };

            const attachDateClickListeners = () => {
                const dateElements = document.querySelectorAll('.calendar__date');
                dateElements.forEach((dateElement) => {
                    dateElement.addEventListener('click', () => {
                        const selectedDate = dateElement.getAttribute('data-date');
                        showEvents(selectedDate);
                    });
                });
            };

            const formatDate = (dateString) => {
                const date = new Date(dateString);
                const day = String(date.getDate() + 1);
                const month = String(date.getMonth() + 1); // Los meses comienzan desde 0
                const year = String(date.getFullYear()); // Año completo (YYYY)
                return `${day}/${month}/${year}`;
            };

            const showEvents = (date) => {
                const filteredEvents = events.filter((event) => event.date === date);
                eventsContainer.innerHTML = '';

                if (filteredEvents.length === 0) {
                    eventsContainer.innerHTML =
                        '<p class="m-0 fw-bold">No hay eventos para este día.</p>';
                } else {
                    filteredEvents.forEach((event) => {
                        eventsContainer.innerHTML += `
                        <div class="calendar__event">
                            <p class="calendar__event-date">${formatDate(event.date)}</p>
                            <p class="calendar__event-title">${event.title}</p>
                            <p class="calendar__event-description">${
                                event.description
                            }</p>
                        </div>`;
                    });
                }
            };

            prevBtn.addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() - 1);
                updateCalendar();
            });

            nextBtn.addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() + 1);
                updateCalendar();
            });

            updateCalendar();
        }
    };

    const LightBox = () => {
        const checkGaleria = document.getElementById('lightboxImage');
        if (document.body.contains(checkGaleria)) {
            // Seleccionamos tanto las imágenes como los overlays
            const images = document.querySelectorAll('.gallery-item-image');
            const overlays = document.querySelectorAll('.gallery-item__overlay');
            const lightboxImage = document.getElementById('lightboxImage');
            let currentIndex = 0;

            // Función para actualizar la imagen del lightbox
            const updateLightboxImage = (index) => {
                lightboxImage.src = images[index].src;
                currentIndex = index;
            };

            // Agregar event listeners a los overlays
            overlays.forEach((overlay, index) => {
                overlay.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    updateLightboxImage(index);
                });
            });

            // Navegación hacia la derecha
            document.getElementById('nextBtn').addEventListener('click', () => {
                if (currentIndex < images.length - 1) {
                    updateLightboxImage(currentIndex + 1);
                } else {
                    updateLightboxImage(0); // Vuelve al inicio si está en la última imagen
                }
            });

            // Navegación hacia la izquierda
            document.getElementById('prevBtn').addEventListener('click', () => {
                if (currentIndex > 0) {
                    updateLightboxImage(currentIndex - 1);
                } else {
                    updateLightboxImage(images.length - 1); // Vuelve a la última imagen si está en la primera
                }
            });

            // También puedes agregar navegación con teclado
            document.addEventListener('keydown', (e) => {
                if (document.getElementById('lightboxModal').classList.contains('show')) {
                    if (e.key === 'ArrowRight') {
                        document.getElementById('nextBtn').click();
                    } else if (e.key === 'ArrowLeft') {
                        document.getElementById('prevBtn').click();
                    } else if (e.key === 'Escape') {
                        const modal = bootstrap.Modal.getInstance(
                            document.getElementById('lightboxModal'),
                        );
                        modal.hide();
                    }
                }
            });
        }
    };

    const PopUpInfo = () => {
        const checkPopUp = document.getElementById('PaginaInicio');
        if (document.body.contains(checkPopUp)) {
            Swal.fire({
                imageUrl: 'https://asistescolar.com/cae/images/plantel/30/pw/extra1.jpg',
                imageAlt: 'Logo colegio',
                showConfirmButton: false,
                showCloseButton: true,
            });
        }
    };

    /*----- ----- ----- ----- -----
	# Declaraciones
	----- ----- ----- ----- -----*/

    window.addEventListener('load', () => {
        GliderCreator();
        Calendario();
        LightBox();
        PopUpInfo();
    });
})();
