// Inicialización de Lenis para scroll suave premium
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smoothHover: true,
    smoothTouch: false, // Desactivado en táctil para mantener sensaciones nativas de móvil
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Limpieza inicial de URL (quitar index.html y hashes)
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith('index.html')) {
        const cleanPath = window.location.pathname.replace('index.html', '');
        window.history.replaceState(null, null, cleanPath);
    }
    // Si hay un hash al cargar, lo limpiamos después de un breve momento para permitir el scroll inicial si fuera necesario
    if (window.location.hash) {
        setTimeout(() => {
            window.history.replaceState(null, null, window.location.pathname);
        }, 1000);
    }

    // Manejar clics en enlaces para navegación limpia y suave con lenis
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                lenis.scrollTo(targetElement, {
                    offset: -100, // Ajuste para el navbar
                    duration: 1.5,
                });
                // Actualizar URL sin hash
                window.history.pushState(null, null, window.location.pathname);
            }
        });
    });
});

// Loader de página con contador de porcentaje
document.addEventListener('DOMContentLoaded', () => {
    const pageLoader = document.querySelector('.page-loader');
    const percentageText = document.querySelector('.loader-percentage');
    const statusText = document.querySelector('.loader-status');
    
    // Bloquear scroll y elementos externos
    document.body.classList.add('loader-active');
    
    if (pageLoader && percentageText) {
        let progress = 0;
        const startTime = Date.now();
        const minDuration = 2000; // Mínimo 2 segundos de loader
        let isPageLoaded = false;

        const updateProgress = () => {
            const elapsedTime = Date.now() - startTime;
            
            // Lógica de progreso "real" simulado
            if (!isPageLoaded) {
                // Si la página no ha terminado de cargar, avanzamos hasta el 99%
                if (progress < 99) {
                    progress += Math.random() * 1.5;
                    if (progress > 99) progress = 99;
                }
            } else {
                // Si la página ya cargó, verificamos si cumplimos el tiempo mínimo
                if (elapsedTime >= minDuration) {
                    // Si pasaron los 2 segundos, llegamos rápido al 100%
                    progress += 10;
                    if (progress >= 100) {
                        progress = 100;
                        percentageText.textContent = '100%';
                        statusText.textContent = "¡Todo listo!";
                        
                        // Pequeña pausa en 100% para satisfacción visual
                        setTimeout(() => {
                            pageLoader.classList.add('hidden');
                            document.body.classList.remove('loader-active');
                        }, 400);
                        
                        clearInterval(progressInterval);
                        return;
                    }
                } else {
                    // Si ya cargó pero no han pasado 2 segundos, seguimos subiendo normal
                    if (progress < 99) {
                        progress += Math.random() * 2;
                    }
                }
            }
            
            percentageText.textContent = `${Math.floor(progress)}%`;
            
            // Frases profesionales dinámicas según el progreso
            if (progress > 85) {
                statusText.textContent = "Finalizando detalles exclusivos...";
            } else if (progress > 50) {
                statusText.textContent = "Optimizando la interfaz...";
            } else if (progress > 25) {
                statusText.textContent = "Conectando con el servidor...";
            }
        };

        // Intervalo suave para la actualización
        const progressInterval = setInterval(updateProgress, 40);

        // Detectar carga real de la página
        window.addEventListener('load', () => {
            isPageLoaded = true;
        });
    }
});


// Navbar responsive
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
        // si el menú se abre, evitar scroll en el body (SOLO EN MÓVIL)
        if (window.innerWidth <= 992) {
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }
    });

    // cerrar el menú si se hace clic en un enlace o fuera del menú en móvil
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 992) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    document.addEventListener('click', (event) => {
        if (!navLinks.contains(event.target) && !menuToggle.contains(event.target) && window.innerWidth <= 992 && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Typed.js effect en el hero
document.addEventListener("DOMContentLoaded", function () {
    const options = {
        strings: ["convertir visitantes en clientes", "atraer a tu cliente ideal", "posicionamiento que genera ventas", "estrategias de crecimiento digital"],
        typeSpeed: 70,
        backSpeed: 50,
        loop: true,
        showCursor: true,
        cursorChar: '|',
    };
    const typed = new Typed('#typed-text', options);
});

// Swiper para el carrusel de servicios (efecto coverflow ajustado)
document.addEventListener("DOMContentLoaded", function () {
    new Swiper(".servicesSwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        loop: true,
        speed: 600, // Transición más suave
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        coverflowEffect: {
            rotate: 20, // Reducido para evitar distorsiones extremas
            stretch: 0,
            depth: 50, // Profundidad reducida
            modifier: 1,
            slideShadows: false, // Desactivado para evitar glitches visuales
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".services-swiper-next",
            prevEl: ".services-swiper-prev",
        },
        breakpoints: {
            // en desktop, forzamos un ancho fijo si es necesario o mantenemos slidesPerView
            992: {
                slidesPerView: 3,
                spaceBetween: 0 // Importante para coverflow
            }
        },
    });
});

// Swiper para el carrusel de proyectos
document.addEventListener("DOMContentLoaded", function () {
    new Swiper(".mySwiper", {
        slidesPerView: 1, // 1 proyecto en móviles
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".portfolio-swiper-next",
            prevEl: ".portfolio-swiper-prev",
        },
        // aquí está el cambio:
        breakpoints: {
            // cuando la ventana sea >= 768px
            768: {
                slidesPerView: 2, // muestra 2 slides
                spaceBetween: 30
            }
        },
    });
});

// Swiper para el carrusel de testimonios
document.addEventListener("DOMContentLoaded", function () {
    new Swiper(".testimonialsSwiper", {
        slidesPerView: 1, // por defecto 1 para móviles
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 7000, // un poco más lento para leer testimonios
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        // código a agregar
        navigation: {
            nextEl: ".testimonials-swiper-next",
            prevEl: ".testimonials-swiper-prev",
        },
        // fin de código a agregar
        breakpoints: {
            768: {
                slidesPerView: 2, // 2 testimonios por scroll en pantallas mayores a 768px
                spaceBetween: 30,
            },
            992: {
                slidesPerView: 3, // 3 testimonios por scroll en pantallas mayores a 992px
                spaceBetween: 30,
            },
        },
    });
});

// Modo día/noche
document.addEventListener("DOMContentLoaded", function () {
    const themeToggleInput = document.getElementById('theme-toggle');
    const body = document.body;

    // alternar tema al cambiar el input
    themeToggleInput.addEventListener('change', () => {
        if (themeToggleInput.checked) {
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        }
    });
});

// Efecto lazy load para elementos y títulos de sección
document.addEventListener("DOMContentLoaded", () => {
    const lazyElements = document.querySelectorAll(".lazy-load");

    if (lazyElements.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: "0px 0px -50px 0px", // Margen negativo para activar un poco antes
        threshold: 0.1 // 10% de visibilidad para activar
    };

    const lazyObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Dejar de observar para mantener visible
            }
        });
    }, observerOptions);

    lazyElements.forEach(el => lazyObserver.observe(el));
});

// Validación del formulario de contacto y modal de éxito
document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.querySelector('.contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageTextarea = document.getElementById('message');
    const privacyInput = document.getElementById('privacy');
    const privacyError = document.getElementById('privacy-error');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    const successModalElement = document.getElementById('successModal');
    const successModal = successModalElement ? new bootstrap.Modal(successModalElement) : null;
    const validationModal = new bootstrap.Modal(document.getElementById('validationModal'));
    const validationErrorsList = document.getElementById('validation-errors-list');

    // Función para mostrar error en el input
    function showError(input, message, errorElement) {
        input.classList.add('is-invalid');
        errorElement.textContent = message;
    }

    // Función para limpiar error en el input
    function clearError(input, errorElement) {
        input.classList.remove('is-invalid');
        errorElement.textContent = '';
    }

    // Función para validar el nombre
    function validateName() {
        const nameValue = nameInput.value.trim();
        const namePattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

        clearError(nameInput, nameError);

        if (nameValue === '') {
            showError(nameInput, 'El nombre es obligatorio.', nameError);
            return { valid: false, message: 'Tu nombre es obligatorio' };
        }
        if (!namePattern.test(nameValue)) {
            showError(nameInput, 'El nombre no puede contener números ni caracteres especiales.', nameError);
            return { valid: false, message: 'El nombre solo puede contener letras' };
        }
        if (nameValue.length > 60) {
            showError(nameInput, 'El nombre no puede exceder los 60 caracteres.', nameError);
            return { valid: false, message: 'El nombre es demasiado largo' };
        }
        return { valid: true };
    }

    // Función para validar el correo electrónico
    function validateEmail() {
        const emailValue = emailInput.value.trim();
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        clearError(emailInput, emailError);

        if (emailValue === '') {
            showError(emailInput, 'El correo electrónico es obligatorio.', emailError);
            return { valid: false, message: 'El correo electrónico es obligatorio' };
        }
        if (!emailPattern.test(emailValue)) {
            showError(emailInput, 'Por favor, introduce un correo electrónico válido.', emailError);
            return { valid: false, message: 'Introduce un correo electrónico válido' };
        }
        return { valid: true };
    }

    // Función para validar el mensaje
    function validateMessage() {
        const messageValue = messageTextarea.value.trim();

        clearError(messageTextarea, messageError);

        if (messageValue === '') {
            showError(messageTextarea, 'El mensaje es obligatorio.', messageError);
            return { valid: false, message: 'El mensaje es obligatorio' };
        }
        if (messageValue.length < 10) {
            showError(messageTextarea, 'El mensaje debe tener al menos 10 caracteres.', messageError);
            return { valid: false, message: 'El mensaje debe ser más descriptivo' };
        }
        if (messageValue.length > 300) {
            showError(messageTextarea, 'El mensaje no puede exceder los 300 caracteres.', messageError);
            return { valid: false, message: 'El mensaje es demasiado largo' };
        }
        return { valid: true };
    }

    // Función para validar la política de privacidad
    function validatePrivacy() {
        clearError(privacyInput, privacyError);

        if (!privacyInput.checked) {
            showError(privacyInput, 'Debes aceptar la política de privacidad.', privacyError);
            return { valid: false, message: 'Debes aceptar la política de privacidad' };
        }
        return { valid: true };
    }

    // añadir event listeners para validación en tiempo real (al perder el foco)
    nameInput.addEventListener('blur', () => validateName());
    emailInput.addEventListener('blur', () => validateEmail());
    messageTextarea.addEventListener('blur', () => validateMessage());
    privacyInput.addEventListener('blur', () => validatePrivacy());

    // añadir event listeners para limpiar errores al escribir
    nameInput.addEventListener('input', () => clearError(nameInput, nameError));
    emailInput.addEventListener('input', () => clearError(emailInput, emailError));
    messageTextarea.addEventListener('input', () => clearError(messageTextarea, messageError));
    privacyInput.addEventListener('input', () => clearError(privacyInput, privacyError));

    // Event listener para el envío del formulario
    contactForm.addEventListener('submit', function (event) {
        const errors = [];
        
        const nameRes = validateName();
        if (!nameRes.valid) errors.push(nameRes.message);
        
        const emailRes = validateEmail();
        if (!emailRes.valid) errors.push(emailRes.message);
        
        const messageRes = validateMessage();
        if (!messageRes.valid) errors.push(messageRes.message);
        
        const privacyRes = validatePrivacy();
        if (!privacyRes.valid) errors.push(privacyRes.message);

        // Si alguna validación falla, cancelamos el envío y mostramos el modal
        if (errors.length > 0) {
            event.preventDefault();
            event.stopPropagation();
            
            // Construir el mensaje de errores con estructura premium
            let errorHtml = '';
            errors.forEach(err => {
                errorHtml += `
                    <div class="error-item-premium">
                        <i class="fas fa-arrow-right"></i>
                        <span>${err}</span>
                    </div>`;
            });
            
            validationErrorsList.innerHTML = errorHtml;
            validationModal.show();
        }
        // Si todo es válido, el script de blaj-forms.js se encargará del resto
    });
});

// Desenfocar el fondo de la página al abrir un modal
document.addEventListener("DOMContentLoaded", function () {
    const pageWrapper = document.getElementById('page-wrapper');
    if (pageWrapper) {
        const modals = document.querySelectorAll('.modal');

        modals.forEach(modal => {
            modal.addEventListener('show.bs.modal', () => {
                pageWrapper.classList.add('blurred');
            });
            modal.addEventListener('hide.bs.modal', () => {
                pageWrapper.classList.remove('blurred');
            });
        });
    }
});

// Lógica para el botón flotante (Floating CTA)
document.addEventListener("DOMContentLoaded", () => {
    const floatingBtn = document.getElementById('floating-cta-btn');

    // 1. Cambiamos el objetivo a las tarjetas de servicios (el swiper)
    const serviceCards = document.querySelector('.servicesSwiper');

    // 2. Este es el nuevo objetivo para ocultar el botón
    const footer = document.querySelector('.footer-custom');

    if (!floatingBtn || !serviceCards || !footer) {
        return; // No se ejecuta si falta alguno de los elementos
    }

    // Variables para guardar el estado de visibilidad
    let hasScrolledPastCards = false;
    let isFooterVisible = false;

    // Función para decidir si mostrar o no el botón
    function updateButtonVisibility() {
        if (hasScrolledPastCards && !isFooterVisible) {
            floatingBtn.classList.add('visible');
        } else {
            floatingBtn.classList.remove('visible');
        }
    }

    // Opciones para el observer
    const observerOptions = {
        threshold: 0.1 // Se activa cuando el 10% del elemento es visible
    };

    // Usaremos un solo observer para vigilar ambos elementos
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {

            // Lógica para las tarjetas de servicio
            if (entry.target === serviceCards) {
                if (entry.isIntersecting) {
                    // Cuando las tarjetas son visibles, marcamos que "ya pasamos"
                    hasScrolledPastCards = true;
                } else if (entry.boundingClientRect.top > 0) {
                    // Si dejamos de verlas porque estamos ARRIBA de ellas (scrolleando hacia arriba)
                    hasScrolledPastCards = false;
                }
                // Si dejamos de verlas scrolleando HACIA ABAJO, hasScrolledPastCards se queda en true
            }

            // Lógica para el footer
            if (entry.target === footer) {
                // Simplemente guarda si el footer está visible o no
                isFooterVisible = entry.isIntersecting;
            }
        });

        // Con los nuevos estados, actualizamos la visibilidad del botón
        updateButtonVisibility();
    }, observerOptions);

    // Iniciamos la observación de ambos elementos
    observer.observe(serviceCards);
    observer.observe(footer);
});



// Scroll-spy para la navegación
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll('header[id], section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    const navBar = document.querySelector(".navbar-custom");

    if (!navBar || navLinks.length === 0 || sections.length === 0) {
        return;
    }

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);

                navLinks.forEach(link => link.classList.remove('active'));

                if (activeLink) {
                    activeLink.classList.add('active');
                }

                // Limpiar la URL bar (quitar hash) mientras se navega
                if (window.location.hash === `#${id}`) {
                    window.history.replaceState(null, null, window.location.pathname);
                }
            }
        });
    };

    // calcula el offset basado en la altura de tu navbar
    const navHeight = navBar.offsetHeight + 15; // 15px de margen
    const observerOptions = {
        rootMargin: `-${navHeight}px 0px -40% 0px`,
        threshold: 0
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});