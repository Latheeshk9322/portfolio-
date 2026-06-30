/* -------------------------------------------------------------
   Latheesh K. - Canvas Particles Background Engine
   ------------------------------------------------------------- */

class ParticleNetwork {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = {
            x: null,
            y: null,
            radius: 120 // Interaction boundary
        };

        this.theme = document.documentElement.getAttribute('data-theme') || 'dark';

        // Styling Configurations
        this.config = {
            density: 80, // Number of particles (adjusted dynamically on resize)
            particleColor: 'rgba(99, 102, 241, 0.4)', // Indigo base
            lineColor: 'rgba(99, 102, 241, 0.08)',
            maxDistance: 110, // Line connection distance
            minRadius: 1,
            maxRadius: 3,
            speedFactor: 0.6
        };

        this.init();
    }

    init() {
        this.resizeCanvas();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }

    bindEvents() {
        window.addEventListener('resize', () => this.resizeCanvas());

        // Track cursor relative to canvas
        window.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });

        window.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });

        // Watch theme toggler transitions to dynamically adjust colors
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'data-theme') {
                    this.updateThemeColors();
                }
            });
        });
        observer.observe(document.documentElement, { attributes: true });
        this.updateThemeColors();
    }

    updateThemeColors() {
        this.theme = document.documentElement.getAttribute('data-theme') || 'dark';
        if (this.theme === 'light') {
            this.config.particleColor = 'rgba(79, 70, 229, 0.3)'; // Darker indigo
            this.config.lineColor = 'rgba(79, 70, 229, 0.05)';
        } else {
            this.config.particleColor = 'rgba(99, 102, 241, 0.4)'; // Cyber indigo
            this.config.lineColor = 'rgba(99, 102, 241, 0.08)';
        }
    }

    resizeCanvas() {
        const parent = this.canvas.parentElement;
        this.canvas.width = parent.offsetWidth;
        this.canvas.height = parent.offsetHeight;

        // Adjust density based on screen width
        if (this.canvas.width < 768) {
            this.config.density = 40;
        } else {
            this.config.density = 90;
        }
        
        this.createParticles();
    }

    createParticles() {
        this.particles = [];
        const quantity = this.config.density;

        for (let i = 0; i < quantity; i++) {
            const radius = Math.random() * (this.config.maxRadius - this.config.minRadius) + this.config.minRadius;
            const x = Math.random() * (this.canvas.width - radius * 2) + radius;
            const y = Math.random() * (this.canvas.height - radius * 2) + radius;
            
            // Velocity components
            const vx = (Math.random() - 0.5) * this.config.speedFactor;
            const vy = (Math.random() - 0.5) * this.config.speedFactor;

            this.particles.push({
                x,
                y,
                vx,
                vy,
                radius,
                originRadius: radius
            });
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw links
        for (let i = 0; i < this.particles.length; i++) {
            const p1 = this.particles[i];

            for (let j = i + 1; j < this.particles.length; j++) {
                const p2 = this.particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < this.config.maxDistance) {
                    // Fade lines as particles move apart
                    const opacity = (1 - dist / this.config.maxDistance) * 0.15;
                    this.ctx.strokeStyle = this.theme === 'light' 
                        ? `rgba(79, 70, 229, ${opacity})`
                        : `rgba(99, 102, 241, ${opacity})`;
                    this.ctx.lineWidth = 0.8;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            }

            // Draw single dot
            this.ctx.fillStyle = this.config.particleColor;
            this.ctx.beginPath();
            this.ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    update() {
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];

            // Basic float motion
            p.x += p.vx;
            p.y += p.vy;

            // Boundary Collisions with dampening
            if (p.x - p.radius < 0 || p.x + p.radius > this.canvas.width) {
                p.vx = -p.vx;
            }
            if (p.y - p.radius < 0 || p.y + p.radius > this.canvas.height) {
                p.vy = -p.vy;
            }

            // Cursor push away repulsion force
            if (this.mouse.x !== null && this.mouse.y !== null) {
                const dx = p.x - this.mouse.x;
                const dy = p.y - this.mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.mouse.radius) {
                    const force = (this.mouse.radius - distance) / this.mouse.radius;
                    
                    // Angles for vector pushes
                    const angle = Math.atan2(dy, dx);
                    const pushX = Math.cos(angle) * force * 1.5;
                    const pushY = Math.sin(angle) * force * 1.5;

                    p.x += pushX;
                    p.y += pushY;
                    p.radius = p.originRadius * 1.5; // Scale particle size slightly
                } else {
                    if (p.radius > p.originRadius) {
                        p.radius -= 0.1;
                    }
                }
            } else {
                if (p.radius > p.originRadius) {
                    p.radius -= 0.1;
                }
            }
        }
    }

    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Instantiate particles once window is ready
document.addEventListener('DOMContentLoaded', () => {
    new ParticleNetwork('hero-canvas');
});
