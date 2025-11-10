// loader de página
document.addEventListener('DOMContentLoaded', () => {
    const pageLoader = document.querySelector('.page-loader');
    if (pageLoader) {
        // oculta el loader después de que todo el contenido haya cargado
        window.addEventListener('load', () => {
            pageLoader.classList.add('hidden');
        });
    }
});


// navbar responsive
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
        // si el menú se abre, evitar scroll en el body
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
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

// typed.js effect en el hero
document.addEventListener("DOMContentLoaded", function() {
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

// swiper para el carrusel de servicios (efecto coverflow)
document.addEventListener("DOMContentLoaded", function() {
    new Swiper(".servicesSwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto", // importante para coverflow
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
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
            // en desktop, mostramos 3 slides para que el efecto se aprecie
            992: {
                slidesPerView: 3,
            }
        },
    });
});

// swiper para el carrusel de proyectos
document.addEventListener("DOMContentLoaded", function() {
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

// swiper para el carrusel de testimonios
document.addEventListener("DOMContentLoaded", function() {
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

// modo día/noche
document.addEventListener("DOMContentLoaded", function() {
    const themeToggleInput = document.getElementById('theme-toggle');
    const body = document.body;

    // función para establecer el tema
    function setTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
            themeToggleInput.checked = true; // sincroniza el input
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
            themeToggleInput.checked = false; // sincroniza el input
        }
    }

    // verificar la preferencia del usuario en localStorage o del sistema
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
    } else {
        setTheme('light'); // modo claro por defecto si no hay preferencia
    }

    // alternar tema al cambiar el input
    themeToggleInput.addEventListener('change', () => {
        if (themeToggleInput.checked) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    });
});

// efecto lazy load para elementos y títulos de sección
document.addEventListener("DOMContentLoaded", () => {
    const lazyElements = document.querySelectorAll(".lazy-load");

    const observerOptions = {
        threshold: 0.15
    };

    const lazyObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            } else {
                entry.target.classList.remove("visible");
            }
        });
    }, observerOptions);

    lazyElements.forEach(el => lazyObserver.observe(el));
});

// validación del formulario de contacto y modal de éxito
document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.querySelector('.contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageTextarea = document.getElementById('message');
    const privacyInput = document.getElementById('privacy');
    const privacyError = document.getElementById('privacy-error');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));

    // función para mostrar error
    function showError(input, message, errorElement) {
        input.classList.add('is-invalid');
        errorElement.textContent = message;
    }

    // función para limpiar error
    function clearError(input, errorElement) {
        input.classList.remove('is-invalid');
        errorElement.textContent = '';
    }

    // función para validar el nombre
    function validateName() {
        const nameValue = nameInput.value.trim();
        const namePattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/; // letras, acentos, ñ y espacios

        clearError(nameInput, nameError);

        if (nameValue === '') {
            showError(nameInput, 'El nombre es obligatorio.', nameError);
            return false;
        }
        if (!namePattern.test(nameValue)) {
            showError(nameInput, 'El nombre solo puede contener letras, acentos y "ñ".', nameError);
            return false;
        }
        if (nameValue.length > 60) {
            showError(nameInput, 'El nombre no puede exceder los 60 caracteres.', nameError);
            return false;
        }
        return true;
    }

    // función para validar el correo electrónico
    function validateEmail() {
        const emailValue = emailInput.value.trim();
        // regex para validar formato de email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

        clearError(emailInput, emailError);

        if (emailValue === '') {
            showError(emailInput, 'El correo electrónico es obligatorio.', emailError);
            return false;
        }
        if (!emailPattern.test(emailValue)) {
            showError(emailInput, 'Por favor, introduce un correo electrónico válido.', emailError);
            return false;
        }
        if (emailValue.length > 50) {
            showError(emailInput, 'El correo electrónico no puede exceder los 50 caracteres.', emailError);
            return false;
        }
        return true;
    }

    // función para validar el mensaje
    function validateMessage() {
        const messageValue = messageTextarea.value.trim();

        clearError(messageTextarea, messageError);

        if (messageValue === '') {
            showError(messageTextarea, 'El mensaje es obligatorio.', messageError);
            return false;
        }
        if (messageValue.length > 300) {
            showError(messageTextarea, 'El mensaje no puede exceder los 300 caracteres.', messageError);
            return false;
        }
        return true;
    }

    // función para validar la política de privacidad
    function validatePrivacy() {
        clearError(privacyInput, privacyError);

        if (!privacyInput.checked) {
            showError(privacyInput, 'Debes aceptar la política de privacidad.', privacyError);
            return false;
        }
        return true;
    }

    // añadir event listeners para validación en tiempo real (al perder el foco)
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    messageTextarea.addEventListener('blur', validateMessage);

    // añadir event listeners para limpiar errores al escribir
    nameInput.addEventListener('input', () => clearError(nameInput, nameError));
    emailInput.addEventListener('input', () => clearError(emailInput, emailError));
    messageTextarea.addEventListener('input', () => clearError(messageTextarea, messageError));
    privacyInput.addEventListener('blur', validatePrivacy);
    privacyInput.addEventListener('input', () => clearError(privacyInput, privacyError));


    // event listener para el envío del formulario
    contactForm.addEventListener('submit', async function(event) {
        // prevenir el envío por defecto para manejar la validación
        event.preventDefault(); 

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();
        const isPrivacyValid = validatePrivacy();

        // si todas las validaciones pasan, se puede enviar el formulario
        if (isNameValid && isEmailValid && isMessageValid && isPrivacyValid) {
            // envía el formulario usando fetch para manejar la respuesta
            try {
                const response = await fetch(this.action, {
                    method: this.method,
                    body: new FormData(this),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    successModal.show(); // muestra el modal de éxito
                    contactForm.reset(); // limpia el formulario
                } else {
                    alert('Hubo un problema al enviar tu mensaje. por favor, inténtalo de nuevo más tarde.');
                }
            } catch (error) {
                console.error('error al enviar el formulario:', error);
                alert('Hubo un problema de conexión. por favor, inténtalo de nuevo más tarde.');
            }
        }
    });
});

// desenfocar el fondo de la página al abrir un modal
document.addEventListener("DOMContentLoaded", function() {
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

// --- Lógica para el Chatbox (Asistente BLAJ) ---
document.addEventListener("DOMContentLoaded", () => {
    const chatboxIcon = document.querySelector('.chatbox-icon');
    const chatboxContainer = document.querySelector('.chatbox-container');
    const chatboxClose = document.querySelector('.chatbox-close');
    const chatInput = document.getElementById('chat-input');
    const sendChatBtn = document.getElementById('send-chat-btn');
    const chatMessages = document.querySelector('.chatbox-messages');

    // preguntas y respuestas personalizadas para BLAJ
    const chatQuestions = {
        "1": {
            question: "¿Qué servicios ofrecen?",
            answer: "Nos especializamos en 5 áreas clave: \n 1. fundación de marca, \n 2. plataforma de conversión (diseño web), \n 3. atracción y seo, \n 4. estrategia digital y \n 5. optimización continua."
        },
        "2": {
            question: "¿Qué es la 'fundación de marca'?",
            answer: "Definimos tu identidad visual y verbal para crear una marca memorable que conecte y genere confianza, similar a nuestro proyecto con 'Krosa'."
        },
        "3": {
            question: "Muéstrame un ejemplo de portafolio.",
            answer: "Claro, un gran ejemplo es el proyecto 'macramé creativo', donde creamos una landing page y un embudo de ventas enfocado en alta conversión. puedes ver más detalles en la sección de portafolio."
        },
        "4": {
            question: "¿Cómo puedo contactarlos?",
            answer: "Puedes enviarnos un whatsapp directo haciendo clic en el botón 'solicitar cotización' o llenar el formulario de contacto al final de la página."
        }
    };

    let blajOptionsList = '<ol>';
    for (const key in chatQuestions) {
        blajOptionsList += `<li>${chatQuestions[key].question}</li>`;
    }
    blajOptionsList += '</ol>';

    const showWelcomeMessage = () => {
        const welcomeHTML = `
            <div class="chat-message bot">
                ¡Hola! 👋 Soy el asistente de BLAJ. ¿Cómo puedo ayudarte?<br><br>
                Escribe el número de la pregunta que te interese:
                ${blajOptionsList}
            </div>
        `;
        chatMessages.innerHTML = welcomeHTML;
    };

    const addMessage = (message, sender) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const handleChat = () => {
        if (!chatInput) return;
        const userInput = chatInput.value.trim();
        if (userInput === "") return;

        addMessage(userInput, 'user');
        chatInput.value = "";

        setTimeout(() => {
            const response = chatQuestions[userInput];
            let answer;

            if (response) {
                answer = response.answer;
            } else {
                answer = "Lo siento, no entendí esa opción. por favor, elige un número de la lista (1-4).";
            }

            addMessage(answer, 'bot');

            setTimeout(() => {
                const menuMessage = `
                    <div class="chat-message bot">
                        ¿Puedo ayudarte con algo más?
                        ${blajOptionsList}
                    </div>
                `;
                chatMessages.innerHTML += menuMessage;
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 7000);

        }, 500);
    };

    if (chatboxIcon) {
        chatboxIcon.addEventListener('click', () => {
            chatboxContainer.classList.toggle('active');
            if (chatboxContainer.classList.contains('active')) {
                showWelcomeMessage();
            }
        });
    }

    if (chatboxClose) {
        chatboxClose.addEventListener('click', () => {
            chatboxContainer.classList.remove('active');
        });
    }

    document.addEventListener('click', function(event) {
        if (chatboxContainer && chatboxIcon &&
            chatboxContainer.classList.contains('active') &&
            !chatboxContainer.contains(event.target) &&
            !chatboxIcon.contains(event.target)) {
            
            chatboxContainer.classList.remove('active');
        }
    });

    if (sendChatBtn) {
        sendChatBtn.addEventListener('click', handleChat);
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleChat();
            }
        });
    }
});

// --- Lógica para el Cursor Personalizado (Aro y Punto) ---
document.addEventListener("DOMContentLoaded", () => {
    const heroSection = document.getElementById('hero');
    const cursorContainer = document.querySelector('.custom-cursor-container');
    const cursorDot = document.querySelector('.custom-cursor-dot');
    const cursorFollower = document.querySelector('.custom-cursor-follower');

    if (!heroSection || !cursorContainer || !cursorDot || !cursorFollower) {
        console.log("elementos del cursor no encontrados");
        return;
    }

    window.addEventListener('mousemove', (e) => {
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
        
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    });

    heroSection.addEventListener('mouseenter', () => {
        cursorContainer.style.opacity = '1';
        cursorContainer.style.visibility = 'visible';
    });

    heroSection.addEventListener('mouseleave', () => {
        cursorContainer.style.opacity = '0';
        cursorContainer.style.visibility = 'hidden';
    });
});

// scroll-spy para la navegación
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