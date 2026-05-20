// Inicialización de Lenis para scroll suave premium
const lenis = new Lenis({
    lerp: 0.1, 
    smoothWheel: true,
    wheelMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 1.5,
    infinite: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Efecto Parallax Profesional y Fluido (Sincronizado con Lenis)
let heroParallax = null;
document.addEventListener('DOMContentLoaded', () => {
    heroParallax = document.querySelector('.hero-content');
});

lenis.on('scroll', (e) => {
    const scroll = e.animatedScroll;
    if (heroParallax && scroll <= window.innerHeight) {
        // Usamos transformaciones 3D para la GPU y solo si es visible el hero
        heroParallax.style.transform = `translate3d(0, ${scroll * 0.35}px, 0)`;
    }
});

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

// --- OPCION 1: Typed.js (Máquina de escribir) ---
/*
document.addEventListener("DOMContentLoaded", function () {
    // Requiere importar typed.js en index.html
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
*/

// --- OPCION 2: Efecto Cortina (Slide Up/Down) ---
/*
document.addEventListener("DOMContentLoaded", function () {
    const strings = [
        "convertir visitantes en clientes",
        "atraer a tu cliente ideal",
        "posicionamiento que genera ventas",
        "estrategias de crecimiento digital"
    ];
    const textElement = document.getElementById('typed-text');
    if (!textElement) return;

    let currentIndex = 0;
    textElement.textContent = strings[currentIndex];

    setInterval(() => {
        textElement.classList.add('slide-out');
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % strings.length;
            textElement.textContent = strings[currentIndex];
            textElement.classList.remove('slide-out');
            textElement.classList.add('slide-in');
            setTimeout(() => {
                textElement.classList.remove('slide-in');
            }, 500);
        }, 500);
    }, 3000);
});
*/

// --- OPCION 3: Efecto Fade con Blur (Profesional/Premium) ---
/*
document.addEventListener("DOMContentLoaded", function () {
    const strings = [
        "convertir visitantes en clientes",
        "atraer a tu cliente ideal",
        "posicionamiento que genera ventas",
        "estrategias de crecimiento digital"
    ];
    const textElement = document.getElementById('typed-text');
    if (!textElement) return;

    let currentIndex = 0;
    textElement.textContent = strings[currentIndex];
    
    // Configuración de la rotación
    setInterval(() => {
        // 1. Iniciar animación de salida (difuminar hacia arriba)
        textElement.classList.remove('premium-reveal-in');
        textElement.classList.add('premium-reveal-out');
        
        setTimeout(() => {
            // 2. Cambiar texto cuando ya no es visible
            currentIndex = (currentIndex + 1) % strings.length;
            textElement.textContent = strings[currentIndex];
            
            // 3. Iniciar animación de entrada (aparecer desde abajo con enfoque)
            textElement.classList.remove('premium-reveal-out');
            textElement.classList.add('premium-reveal-in');
        }, 600); // 600ms es la duración de premiumOut
    }, 3500); // Cambiar de frase cada 3.5 segundos
});
*/

// --- OPCION 4: Typed Súper Rápido + Borrador Izquierda a Derecha ---
/*
document.addEventListener("DOMContentLoaded", function () {
    const strings = [
        "convertir visitantes en clientes",
        "atraer a tu cliente ideal",
        "posicionamiento que genera ventas",
        "estrategias de crecimiento digital"
    ];
    const textElement = document.getElementById('typed-text');
    if (!textElement) return;

    textElement.classList.add('custom-typed-cursor');

    let currentIndex = 0;
    let isTyping = true;
    let charIndex = 0;

    const typeSpeed = 30; // Súper rápido
    const deleteSpeed = 20; // Borrado rápido
    const pauseBeforeDelete = 2000;
    const pauseBeforeType = 300;

    function typeEffect() {
        const currentString = strings[currentIndex];

        if (isTyping) {
            textElement.innerHTML = currentString.substring(0, charIndex);
            charIndex++;

            if (charIndex > currentString.length) {
                isTyping = false;
                charIndex = 0;
                setTimeout(typeEffect, pauseBeforeDelete);
            } else {
                setTimeout(typeEffect, typeSpeed);
            }
        } else {
            const deletedPart = `<span style="opacity: 0;">${currentString.substring(0, charIndex)}</span>`;
            const visiblePart = currentString.substring(charIndex);
            textElement.innerHTML = deletedPart + visiblePart;
            
            charIndex++;

            if (charIndex > currentString.length) {
                isTyping = true;
                currentIndex = (currentIndex + 1) % strings.length;
                charIndex = 0;
                textElement.innerHTML = '';
                setTimeout(typeEffect, pauseBeforeType);
            } else {
                setTimeout(typeEffect, deleteSpeed);
            }
        }
    }

    setTimeout(typeEffect, 500);
});
*/

// --- OPCION 5: Typed Elegante y Profesional (Nueva linea y color) ---
document.addEventListener("DOMContentLoaded", function () {
    const strings = [
        "convertir visitantes en clientes",
        "atraer a tu cliente ideal",
        "posicionamiento que genera ventas",
        "estrategias de crecimiento digital"
    ];
    const textElement = document.getElementById('typed-text');
    if (!textElement) return;

    textElement.className = 'typed-text elegant-typed';
    
    // Crear el cursor animado por separado
    const cursor = document.createElement('span');
    cursor.className = 'elegant-cursor';
    textElement.parentNode.insertBefore(cursor, textElement.nextSibling);

    let currentIndex = 0;
    let isTyping = true;
    let charIndex = 0;

    const typeSpeed = 50; // Ritmo elegante
    const deleteSpeed = 30; // Borrado suave
    const pauseBeforeDelete = 2500;
    const pauseBeforeType = 500;

    function typeEffect() {
        const baseString = strings[currentIndex];
        const currentString = (typeof currentLang !== 'undefined' && currentLang === 'en' && typeof dictionary !== 'undefined' && dictionary[baseString]) ? dictionary[baseString] : baseString;

        if (isTyping) {
            textElement.textContent = currentString.substring(0, charIndex);
            charIndex++;

            if (charIndex > currentString.length) {
                isTyping = false;
                setTimeout(typeEffect, pauseBeforeDelete);
            } else {
                const randomVariation = Math.random() * 20 - 10;
                setTimeout(typeEffect, typeSpeed + randomVariation);
            }
        } else {
            textElement.textContent = currentString.substring(0, charIndex);
            charIndex--;

            if (charIndex < 0) {
                isTyping = true;
                currentIndex = (currentIndex + 1) % strings.length;
                charIndex = 0;
                setTimeout(typeEffect, pauseBeforeType);
            } else {
                setTimeout(typeEffect, deleteSpeed);
            }
        }
    }

    setTimeout(typeEffect, 800);
});

// Swiper para el carrusel de servicios (efecto coverflow ajustado)
document.addEventListener("DOMContentLoaded", function () {
    new Swiper(".servicesSwiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        centeredSlides: false, // Cambiado para mostrar 3 de forma estándar
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
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
            // Ajustar para mostrar 3 servicios en pantallas grandes
            992: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20
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
        rootMargin: "0px 0px 100px 0px", // Trigger 100px before to avoid pop-in feel
        threshold: 0.1 
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

// Lógica del cursor profesional con sombra de glassmorphism
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor-follower');

    if (cursor) {
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        // Hint al navegador para compositar el cursor en la GPU
        cursor.style.willChange = 'transform';

        // Escuchar el mouse de forma pasiva (no bloquea el hilo de renderizado)
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }, { passive: true });

        // --- Pool de partículas de estela (reutiliza nodos DOM en vez de crearlos) ---
        const POOL_SIZE = 12; // Máximo de partículas activas al mismo tiempo
        const trailPool = [];

        for (let i = 0; i < POOL_SIZE; i++) {
            const el = document.createElement('div');
            el.className = 'cursor-trail';
            el.style.opacity = '0';    // Ocultas por defecto
            el.style.transform = 'translate(-50%, -50%) scale(0)';
            document.body.appendChild(el);
            trailPool.push({ el, active: false, timer: 0 });
        }

        let poolIndex = 0;  // Puntero circular al siguiente elemento del pool
        let trailCounter = 0;

        function getFromPool() {
            const node = trailPool[poolIndex];
            poolIndex = (poolIndex + 1) % POOL_SIZE;
            return node;
        }

        function spawnTrail(x, y) {
            const node = getFromPool();
            node.el.style.left = `${x}px`;
            node.el.style.top = `${y}px`;
            node.el.style.opacity = '1';
            node.el.style.transform = 'translate(-50%, -50%) scale(1)';

            // Usar transición CSS para la animación de desaparición (no setTimeout)
            // La clase cursor-trail ya debe tener transition en CSS
            requestAnimationFrame(() => {
                node.el.style.opacity = '0';
                node.el.style.transform = 'translate(-50%, -50%) scale(0)';
            });
        }

        // Loop único de animación del cursor
        function animateCursor() {
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;

            cursorX += dx * 0.25;
            cursorY += dy * 0.25;

            // Usar transform en vez de left/top para evitar reflows
            cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;

            // Spawnar estela solo cuando hay movimiento real
            trailCounter++;
            if (trailCounter % 3 === 0 && (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5)) {
                spawnTrail(cursorX, cursorY);
            }

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Efectos de hover para el cursor
        const hoverTags = 'a, button, .ui-switch, .swiper-button-next, .swiper-button-prev, .project-info';
        const interactiveElements = document.querySelectorAll(hoverTags);

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hovering'), { passive: true });
            el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'), { passive: true });
        });
    }
});

// Manejar el cambio de idioma para las frases animadas
window.addEventListener('languageChanged', (e) => {
    // Si necesitas reiniciar la animacion, puedes hacerlo aqui.
    // Como las variables strings estan dentro del scope de DOMContentLoaded, 
    // lo ideal sería exponerlas globalmente, o simplemente ignorarlo ya que
    // traducir el texto en tiempo real es complejo para strings dinamicos.
});
