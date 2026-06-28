document.getElementById('telefoneDy').addEventListener('click', function() {
    const numero = this.textContent.trim();

    const textarea = document.createElement('textarea');
    textarea.value = numero;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    const original = this.innerHTML;
    this.innerHTML = '<i class="fa-solid fa-phone"></i> Copiado!';
    setTimeout(() => {
        this.innerHTML = original;
    }, 2000);
});

document.getElementById('emailDy').addEventListener('click', function() {
    const email = 'mateusimunhoz@hotmail.com';

    const textarea = document.createElement('textarea');
    textarea.value = email;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    const original = this.textContent;
    this.textContent = 'Copiado!';
    setTimeout(() => {
        this.textContent = original;
    }, 2000);
});

const canvas = document.getElementById('bgParticles');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null, radius: 120 };

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2.5 + 2;
            this.baseX = this.x;
            this.baseY = this.y;
            this.density = Math.random() * 15 + 5;
            this.color = Math.random() > 0.5
                ? 'rgba(0, 173, 181, 0.55)'
                : 'rgba(160, 248, 39, 0.4)';
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius && distance > 0) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouse.radius - distance) / mouse.radius;
                    const directionX = forceDirectionX * force * this.density;
                    const directionY = forceDirectionY * force * this.density;

                    this.x -= directionX;
                    this.y -= directionY;
                }
            }

            const dx = this.baseX - this.x;
            const dy = this.baseY - this.y;
            this.x += dx * 0.04;
            this.y += dy * 0.04;
        }
    }

    function initParticles() {
        particles = [];
        const numberOfParticles = Math.floor((canvas.width * canvas.height) / 6000);
        for (let i = 0; i < numberOfParticles; i++) {
            particles.push(new Particle());
        }
    }

    function connectParticles() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    ctx.strokeStyle = `rgba(0, 173, 181, ${(1 - distance / 120) * 0.18})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        connectParticles();
        requestAnimationFrame(animate);
    }

    window.addEventListener('mousemove', function(event) {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    });

    window.addEventListener('mouseleave', function() {
        mouse.x = null;
        mouse.y = null;
    });

    window.addEventListener('resize', function() {
        resizeCanvas();
        initParticles();
    });



    resizeCanvas();
    initParticles();
    animate();
}
