const cta = document.querySelector('.hero__cta');
const heroContent = document.querySelector('.hero__content');
const heroTitle = document.querySelector('.hero__title');
const heroLogo = document.querySelector('.hero__logo');

const phrases = ["Protegendo os Oceanos", "Estimulando a Mudança Global"];
let phraseIndex = 0;
let letterIndex = 0;
let isDeleting = false;
let stopAnimation = false;

function resetAnimation() {
  heroTitle.textContent = '';
}

function startNewPhrase() {
  isDeleting = false;
  phraseIndex = phraseIndex + 1;
  if (!stopAnimation) setTimeout(typePhrase, 500);
}

function endPhrase() {
  isDeleting = true;
  if (phraseIndex === phrases.length - 1) {
    setTimeout(animateFadeOut, 2000);
  }
  if (!stopAnimation) setTimeout(typePhrase, 1000);
}

function animateFadeOut() {
  heroTitle.classList.remove("typing");
  heroTitle.classList.add("fade-out-up");
  setTimeout(() => {
    animateFadeIn();
    stopAnimation = true;
    resetAnimation();
    heroContent.style.paddingBottom = '20dvh';
  }, 1000);
}

function animateFadeIn() {
  cta.classList.remove('hidden');
  cta.classList.add('fade-in-cta');
  heroLogo.style.display = 'block';
  heroLogo.classList.add('fade-in-logo');
}

function deleteLetter(currentPhrase) {
  heroTitle.textContent = currentPhrase.slice(0, letterIndex - 1);
  letterIndex--;
  if (!stopAnimation) setTimeout(() => typePhrase(currentPhrase), 60);
}

function addLetter(currentPhrase) {
  heroTitle.textContent = currentPhrase.slice(0, letterIndex + 1);
  letterIndex++;
  if (!stopAnimation) setTimeout(() => typePhrase(currentPhrase), 100);
}

function typePhrase() {
  const currentPhrase = phrases[phraseIndex];
  const endOfPhrase = letterIndex === currentPhrase.length;

  if (stopAnimation) {
    resetAnimation();
    return;
  }

  if (isDeleting && letterIndex === 0) {
    startNewPhrase();
    return;
  }
  
  if (!isDeleting && endOfPhrase) {
    endPhrase();
    return;
  }
  
  if (isDeleting && phraseIndex !== phrases.length - 1) {
    deleteLetter(currentPhrase);
    return;
  }
  
  addLetter(currentPhrase);
}

window.onload = function () {
  heroTitle.classList.add("typing");
  typePhrase();
};