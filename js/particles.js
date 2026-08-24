document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let width, height;
    let particles = [];
    let animationId = null;

    // Mouse position (throttled via flag)
    let mouse = { x: null, y: null };
    const mouseRadius = 120;
    const mouseRadiusSq = mouseRadius * mouseRadius; // Evitar sqrt en cada frame

    // Detectar tema actual
    let isDarkMode = document.body.classList.contains('dark-mode');

    // Paletas de colores
    const lightColors = ['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.3)', 'rgba(0, 132, 255, 0.5)'];
    const darkColors = ['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.5)', 'rgba(0, 132, 255, 0.6)'];

    // Throttle del mousemove para no procesar en cada pixel
    let mouseMoveScheduled = false;
    window.addEventListener('mousemove', (e) => {
        if (!mouseMoveScheduled) {
            mouseMoveScheduled = true;
            requestAnimationFrame(() => {
                const rect = canvas.getBoundingClientRect();
                mouse.x = e.clientX - rect.left;
                mouse.y = e.clientY - rect.top;
                mouseMoveScheduled = false;
            });
        }
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    }, { passive: true });

    // Observer para detectar cambios en el tema (clase dark-mode en body)
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                const newMode = document.body.classList.contains('dark-mode');
                if (isDarkMode !== newMode) {
                    isDarkMode = newMode;
                    updateParticleColors();
                }
            }
        });
    });

    observer.observe(document.body, { attributes: true });

    function updateParticleColors() {
        const currentPalette = isDarkMode ? darkColors : lightColors;
        particles.forEach(p => {
            p.color = currentPalette[Math.floor(Math.random() * currentPalette.length)];
        });
    }

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 1.8;
            this.vy = (Math.random() - 0.5) * 1.8;
            this.size = Math.random() * 3 + 2;

            const currentPalette = isDarkMode ? darkColors : lightColors;
            this.color = currentPalette[Math.floor(Math.random() * currentPalette.length)];

            this.baseX = this.x;
            this.baseY = this.y;
            this.density = (Math.random() * 30) + 1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Boundary check - bounce
            if (this.x < 0 || this.x > width) this.vx = -this.vx;
            if (this.y < 0 || this.y > height) this.vy = -this.vy;

            // Mouse interaction usando distancia al cuadrado (sin Math.sqrt)
            if (mouse.x !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distSq = dx * dx + dy * dy;

                if (distSq < mouseRadiusSq) {
                    const distance = Math.sqrt(distSq); // Solo calcula sqrt si está dentro del radio
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouseRadius - distance) / mouseRadius;

                    this.x -= forceDirectionX * force * this.density;
                    this.y -= forceDirectionY * force * this.density;
                }
            }
        }
    }

    function init() {
        width = canvas.width = canvas.parentElement.offsetWidth;
        height = canvas.height = canvas.parentElement.offsetHeight;
        particles = [];

        // Densidad reducida: antes 9500, ahora 18000 (menos partículas, mejor rendimiento)
        const numberOfParticles = Math.min(Math.floor((width * height) / 18000), 60);

        for (let i = 0; i < numberOfParticles; i++) {
            particles.push(new Particle());
        }
    }

    // Pausar animación cuando el hero no es visible (ahorro real de CPU)
    let isHeroVisible = true;
    const heroObserver = new IntersectionObserver((entries) => {
        const wasVisible = isHeroVisible;
        isHeroVisible = entries[0].isIntersecting;
        // Reanudar el loop si vuelve a ser visible y estaba pausado
        if (isHeroVisible && !wasVisible) {
            animationId = requestAnimationFrame(animate);
        }
    }, { threshold: 0.1 });
    heroObserver.observe(canvas.parentElement);

    function animate() {
        if (!isHeroVisible) {
            animationId = null;
            return; // Pausa real del loop (no llama requestAnimationFrame)
        }

        ctx.clearRect(0, 0, width, height);

        const len = particles.length;
        for (let i = 0; i < len; i++) {
            particles[i].update();
            particles[i].draw();
        }

        animationId = requestAnimationFrame(animate);
    }

    // Debounce en resize para no recrear partículas en cada pixel de redimensionado
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            init();
        }, 200);
    }, { passive: true });

    init();
    animationId = requestAnimationFrame(animate);
});
