
import os

file_path = r"c:\Users\joxel\OneDrive\Escritorio\MPro\BLAJ\css\index.css"

new_css_content = """/* ======================================== */
/* 12. ELEMENTOS FLOTANTES (CTA Y CHATBOX) */
/* ======================================== */

/* Animación de Pulso (Wave) - Más sutil */
@keyframes wave-animation {
    0% {
        transform: scale(1);
        opacity: 0.4;
    }

    100% {
        transform: scale(1.3);
        opacity: 0;
    }
}

/* Botón Flotante (Floating CTA) */
.floating-cta-btn {
    position: fixed;
    bottom: 25px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 998;
    /* Debajo del navbar (1000) y modales */
    background: var(--current-btn-primary-bg);
    color: var(--current-btn-primary-text);
    padding: 12px 30px;
    border-radius: 50px;
    font-size: 1.1rem;
    font-weight: 600;
    text-transform: uppercase;
    text-decoration: none;
    box-shadow: 0 5px 20px var(--current-shadow-color);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    opacity: 0;
    visibility: hidden;
    transform: translateX(-50%) translateY(100px);
    transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s ease;
}

.floating-cta-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: inherit;
    border-radius: 50px;
    z-index: -1;
    animation: wave-animation 2s infinite;
}

.floating-cta-btn.visible {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
}

.floating-cta-btn:hover {
    color: var(--current-btn-primary-text);
    transform: translateX(-50%) translateY(-3px);
    /* Pequeño salto en hover */
    box-shadow: 0 8px 25px var(--current-shadow-color);
}

/* Chatbox */
.chatbox-icon {
    position: fixed;
    bottom: 25px;
    right: 25px;
    width: 60px;
    height: 60px;
    background-color: #0084FF;
    /* color azul de BLAJ */
    color: var(--current-btn-primary-text);
    /* texto blanco o negro según el modo */
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    cursor: pointer;
    z-index: 1050;
    /* por encima del botón flotante de cta */
    box-shadow: 0 5px 15px var(--current-shadow-color);
    transition: transform 0.3s ease;
}

.chatbox-icon:hover {
    transform: scale(1.1);
}

.chatbox-container {
    position: fixed;
    bottom: 100px;
    right: 25px;
    width: 90%;
    max-width: 370px;
    background: var(--current-mobile-menu-bg);
    /* fondo del menú móvil (oscuro/claro) */
    border: 1px solid var(--current-border-color);
    border-radius: 20px;
    box-shadow: 0 10px 40px var(--current-shadow-color);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    z-index: 1040;
    opacity: 0;
    visibility: hidden;
    transform: translateY(20px);
    transition: all 0.4s ease;
}

.chatbox-container.active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.chatbox-header {
    background: rgba(0, 0, 0, 0.2);
    padding: 1rem;
    color: var(--current-text-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
}

.chatbox-close {
    font-size: 1.5rem;
    cursor: pointer;
    color: #aaa;
    transition: color 0.3s;
}

.chatbox-close:hover {
    color: var(--current-text-color);
}

.chatbox-messages {
    padding: 1rem;
    height: 300px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.chat-message {
    padding: 0.75rem 1rem;
    border-radius: 15px;
    max-width: 80%;
    line-height: 1.4;
}

.chat-message.bot {
    background: var(--current-card-bg);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border: 1px solid var(--current-border-color);
    color: var(--current-text-color);
    align-self: flex-start;
    border-bottom-left-radius: 3px;
}

.chat-message.user {
    background-color: #0084FF;
    /* color azul de BLAJ */
    color: #fff;
    align-self: flex-end;
    border-bottom-right-radius: 3px;
}

.chat-message ol {
    padding-left: 20px;
    margin: 10px 0 0 0;
}

.chat-message ol li {
    margin-bottom: 5px;
}

.chatbox-input {
    display: flex;
    padding: 1rem;
    border-top: 1px solid var(--current-border-color);
}

#chat-input {
    flex-grow: 1;
    border: none;
    background: rgba(0, 0, 0, 0.1);
    /* fondo sutil */
    padding: 0.75rem;
    border-radius: 10px;
    color: var(--current-text-color);
    margin-right: 10px;
    border: 1px solid var(--current-border-color);
}

#chat-input:focus {
    outline: none;
    box-shadow: 0 0 0 2px #0084FF;
    /* color azul de BLAJ */
}

#send-chat-btn {
    border: none;
    background: #0084FF;
    /* color azul de BLAJ */
    color: #fff;
    width: 45px;
    height: 45px;
    border-radius: 10px;
    cursor: pointer;
    font-size: 1.2rem;
}

/* Scrollbar del Chat */
.chatbox-messages::-webkit-scrollbar {
    width: 8px;
}

.chatbox-messages::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 10px;
}

.chatbox-messages::-webkit-scrollbar-thumb {
    background-color: #0084FF;
    border-radius: 10px;
    border: 2px solid var(--current-mobile-menu-bg);
}

.chatbox-messages::-webkit-scrollbar-thumb:hover {
    background-color: #0056a8;
}

/* ocultar cta flotante y chatbox cuando un modal está abierto */
body.modal-open .floating-cta-btn,
body.modal-open .chatbox-icon {
    display: none;
}

/* ======================================== */
/* 13. LAZY LOAD (EFECTO DE APARICIÓN) */
/* ======================================== */
.lazy-load {
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.lazy-load.visible {
    opacity: 1;
    transform: translateY(0);
}

/* ======================================== */
/* 14. RESPONSIVIDAD GENERAL (Ajustes Globales) */
/* ======================================== */
@media (max-width: 1200px) {
    .col-xl-4 {
        flex: 0 0 auto;
        width: 33.33333333%;
    }

    .floating-cta-btn {
        font-size: 0.8em;
        width: auto;
    }
}

@media (max-width: 992px) {
    .section-padding {
        padding: 60px 0;
    }

    .section-title {
        font-size: 2.2rem;
        width: 100%;
        /* asegura que la línea se centre correctamente */
    }

    .section-title::after {
        width: 100px;
        /* ajusta el tamaño de la línea para pantallas más pequeñas */
    }

    .lead {
        font-size: 1.15rem;
    }

    .hero-content h1 {
        font-size: 2.5rem;
        min-height: 9rem;
    }

    .typed-text {
        font-size: 3rem;
    }

    .col-lg-4 {
        flex: 0 0 auto;
        width: 50%;
    }

    .col-md-4 {
        /* para pantallas medianas, 2 columnas */
        flex: 0 0 auto;
        width: 50%;
    }
}

@media (max-width: 768px) {
    .custom-cursor-container {
        display: none !important;
    }

    .section-title {
        font-size: 2rem;
        width: 100%;
        /* asegura que la línea se centre correctamente */
    }

    .section-title::after {
        width: 80px;
        /* ajusta el tamaño de la línea para pantallas más pequeñas */
    }

    .lead {
        font-size: 1.1rem;
    }

    .hero-content h1 {
        font-size: 2.5rem;
    }

    .typed-text {
        font-size: 2.5rem;
        white-space: normal;
        /* permite que el texto se divida en varias líneas */
    }

    .col-md-4 {
        /* para pantallas pequeñas, 1 columna */
        flex: 0 0 auto;
        width: 100%;
    }

    .cube-container {
        width: 220px;
        height: 220px;
    }

    .cube-face.front {
        transform: rotateY(0deg) translateZ(110px);
    }

    .cube-face.right {
        transform: rotateY(90deg) translateZ(110px);
    }

    .cube-face.back {
        transform: rotateY(180deg) translateZ(110px);
    }

    .cube-face.left {
        transform: rotateY(-90deg) translateZ(110px);
    }

    .quote-banner .quote-text {
        font-size: 1.8rem;
    }

    .quote-banner .quote-author {
        font-size: 1rem;
    }
}

@media (max-width: 576px) {
    .navbar-custom .container-nav {
        padding: 10px 15px;
    }

    .brand-logo {
        font-size: 1.5rem;
    }

    .hero-content h1 {
        font-size: 2rem;
    }

    .typed-text {
        font-size: 1.8rem;
    }

    .btn-primary-custom {
        padding: 10px 20px;
        font-size: 1rem;
    }

    .swiper-slide {
        padding: 15px;
    }

    .portfolio-item img {
        height: 200px;
    }

    .project-info h3 {
        font-size: 1.3rem;
    }

    .project-info p {
        font-size: 0.9rem;
    }
}

iframe {
    width: 100%;
    height: 100%;
    border: none;
    display: block;
}

/* Ajustes específicos para el CTA en móvil */
@media (max-width: 576px) {
    .floating-cta-btn {
        left: auto;
        right: 95px;
        /* Al lado del chatbot (25px + 60px + 10px) */
        transform: translateY(100px);
        /* Reset horizontal */
        white-space: nowrap;
        /* Texto en una sola línea */
        width: auto;
        font-size: 1rem;
        /* Un poco más grande */
        padding: 14px 25px;
        /* Un poco más grande */
    }

    .floating-cta-btn.visible {
        transform: translateY(0);
        /* Solo mover en Y */
    }

    .floating-cta-btn:hover {
        transform: translateY(-3px);
    }
}
"""

try:
    with open(file_path, "r", encoding="utf-8") as f:
        lines = f.readlines()
    
    # Truncate to keep first 1861 lines (lines[0] to lines[1860])
    lines = lines[:1861]
    
    # Ensure the last line ends with a newline if it doesn't
    if lines and not lines[-1].endswith('\n'):
        lines[-1] += '\n'
        
    final_content = "".join(lines) + "\n" + new_css_content
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(final_content)
    print("Successfully updated CSS file.")

except Exception as e:
    print(f"Error: {e}")
