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

// Simulan ang animation
document.addEventListener("DOMContentLoaded", type);



