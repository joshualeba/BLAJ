document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    // Mouse position
    let mouse = { x: null, y: null };
    const mouseRadius = 150; // Radius of interaction for particles

    // Detectar tema actual
    let isDarkMode = document.body.classList.contains('dark-mode');

    // Paletas de colores
    const lightColors = ['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.3)', 'rgba(0, 132, 255, 0.5)'];
    const darkColors = ['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.5)', 'rgba(0, 132, 255, 0.6)'];

    window.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

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
        // Actualizar colores de partículas existentes
        const currentPalette = isDarkMode ? darkColors : lightColors;
        particles.forEach(p => {
            p.color = currentPalette[Math.floor(Math.random() * currentPalette.length)];
        });
    }

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            // Velocidad ligeramente aumentada
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
            ctx.closePath();
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            // Movement
            this.x += this.vx;
            this.y += this.vy;

            // Boundary check - bounce
            if (this.x < 0 || this.x > width) this.vx = -this.vx;
            if (this.y < 0 || this.y > height) this.vy = -this.vy;

            // Mouse interaction (Repulsion)
            if (mouse.x !== null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouseRadius) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouseRadius - distance) / mouseRadius;

                    const directionX = forceDirectionX * force * this.density;
                    const directionY = forceDirectionY * force * this.density;

                    this.x -= directionX;
                    this.y -= directionY;
                }
            }
        }
    }

    function init() {
        width = canvas.width = canvas.parentElement.offsetWidth;
        height = canvas.height = canvas.parentElement.offsetHeight;
        particles = [];

        // Aumentar número de partículas (Density divisor más bajo = más partículas)
        // Antes era 9000, ahora 6000 para aprox 50% más.
        let numberOfParticles = (width * height) / 6000;

        for (let i = 0; i < numberOfParticles; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        // Mouse follower removed as requested
    }

    window.addEventListener('resize', () => {
        init();
    });

    init();
    animate();
});
