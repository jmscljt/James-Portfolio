// ----------------------------------------------------------------------------------------------------------------------


// Changing text in greetings
const greetings = ["Kamusta,", "Hello,", "Hola,", "Bonjour,", "こんにちは,", "안녕하세요,"];
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
    let typeSpeed = isDeleting ? 100 : 200;

    // Kung tapos na i-type ang buong salita
    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 3000;
        isDeleting = true;
    } 
    // Kung tapos na magbura
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % greetings.length;
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
let particleCount;
let connectionDistance;

// 1. Mouse object to track position
const mouse = {
    x: null,
    y: null,
    radius: 150 // How far the mouse "reaches" to connect
};

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

// Clear mouse position when it leaves the window
window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
});

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
}
window.addEventListener('resize', resize);

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 1.5; // Slightly faster for better feel
        this.vy = (Math.random() - 0.5) * 1.5;
        this.radius = 2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fill();
    }
}

function init() {
    particleCount = window.innerWidth < 768 ? 50 : 120; // Increased count for better interactivity
    connectionDistance = 120;
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

        // 2. Interactive Connection: Check distance between mouse and particle
        if (mouse.x !== null && mouse.y !== null) {
            let dxMouse = particles[i].x - mouse.x;
            let dyMouse = particles[i].y - mouse.y;
            let distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

            if (distMouse < mouse.radius) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 0, 0, ${1 - distMouse / mouse.radius})`;
                ctx.lineWidth = 1; // Thicker lines for mouse connections
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        }

        // Standard particle-to-particle connections
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

resize(); 
animate();




// ----------------------------------------------------------------------------------------------------------------------


