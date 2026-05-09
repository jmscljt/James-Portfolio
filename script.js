// ----------------------------------------------------------------------------------------------------------------------


// Changing text in greetings
const greetings = ["Kamusta,", "Hello,", "Hola,", "Bonjour,", "こんにちは,", "Annyeong,"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const textElement = document.getElementById("greetings-text");

function type() {
    const currentWord = greetings[wordIndex];
    
    if (isDeleting) {
        textElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    // Speed settings
    let typeSpeed = isDeleting ? 100 : 200; // Mas mabilis pag nagbubura

    // Kung tapos na i-type ang buong salita
    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000; // Mag-pause muna ng 2 seconds bago magbura
        isDeleting = true;
    } 
    // Kung tapos na magbura
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % greetings.length; // Lipat sa susunod na salita
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

// Start of animation
document.addEventListener("DOMContentLoaded", type);


// ----------------------------------------------------------------------------------------------------------------------


// Moving Background
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 80; // Adjust for density
const connectionDistance = 150; // Distance where lines appear

// Resize canvas to window size
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5; // Horizontal speed
        this.vy = (Math.random() - 0.5) * 0.5; // Vertical speed
        this.radius = 2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fill();
    }
}

function init() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Draw lines between nearby particles
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 0, 0, ${1 - distance / connectionDistance})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animate);
}

init();
animate();


// ----------------------------------------------------------------------------------------------------------------------


