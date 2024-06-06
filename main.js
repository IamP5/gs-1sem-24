const ctaButton = document.querySelector('.cta-button');
const heroTitle = document.querySelector('.hero__title');

const phrases = ["Protecting Our Oceans", "Empowering Communities"];
let phraseIndex = 0;
let letterIndex = 0;
let isDeleting = false;
let stopAnimation = false;

function typePhrase() {
  const currentPhrase = phrases[phraseIndex];
  const endOfPhrase = letterIndex === currentPhrase.length;

  if (stopAnimation) {
    heroTitle.textContent = '';
    return;
  }

  if (isDeleting && letterIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    if (!stopAnimation) setTimeout(typePhrase, 500);
  } else if (!isDeleting && endOfPhrase) {
    isDeleting = true;
    if (phraseIndex === phrases.length - 1) {
      heroTitle.classList.remove("typing");
      heroTitle.classList.add("fade-out-up");
      setTimeout(() => {
        ctaButton.classList.remove('hidden');
        ctaButton.classList.add('fade-in-down');
        stopAnimation = true;
        heroTitle.textContent = '';
      }, 1000); // match the duration of the fade-out transition
    }
    if (!stopAnimation) setTimeout(typePhrase, 2000);
  } else if (isDeleting) {
    heroTitle.textContent = currentPhrase.slice(0, letterIndex - 1);
    letterIndex--;
    if (!stopAnimation) setTimeout(typePhrase, 70);
  } else {
    heroTitle.textContent = currentPhrase.slice(0, letterIndex + 1);
    letterIndex++;
    if (!stopAnimation) setTimeout(typePhrase, 100);
  }
}

window.onload = function () {
  heroTitle.classList.add("typing");
  typePhrase();
};