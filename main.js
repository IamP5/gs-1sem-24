const cta = document.querySelector('.hero__cta');
const heroContent = document.querySelector('.hero__content');
const heroTitle = document.querySelector('.hero__title');
const heroLogo = document.querySelector('.hero__logo');

const phrases = ["Protegendo os Oceanos", "Estimulando a Mudança Global"];

const form = document.getElementById('contactForm');
const inputs = form.querySelectorAll('input, textarea');
const errorMessages = {
  name: 'Por favor, insira seu nome.',
  email: {
    valueMissing: 'Por favor, insira seu email.',
    typeMismatch: 'Por favor, insira um endereço de email válido.',
  },
  message: 'Por favor, insira sua mensagem.'
};

let phraseIndex = 0;
let letterIndex = 0;
let isDeleting = false;
let stopAnimation = false;

inputs.forEach(input => {
  input.addEventListener('input', () => {
    checkValidity(input);
  });
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  let isValid = true;

  inputs.forEach(input => {
    if (!checkValidity(input)) {
      isValid = false;
    }
  });

  if (isValid) {
    alert('Formulário enviado com sucesso!');
    form.reset();
  }
});

function resetAnimation() {
  heroTitle.textContent = '';
}

function startNewPhrase() {
  isDeleting = false;
  phraseIndex = (phraseIndex + 1) % phrases.length;
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
    heroContent.style.paddingBottom = '20vh';
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

function scrollToElement(id) {
  const element = document.getElementById(id);
  element.scrollIntoView({behavior: "smooth"});
}

function checkValidity(input) {
  const error = input.nextElementSibling;
  const validity = input.validity;

  if (validity.valid) {
    error.textContent = '';
    error.style.display = 'none';
    return true;
  } else {
    showError(input, error);
    return false;
  }
}

function showError(input, error) {
  const type = input.type;
  const name = input.name;

  if (type === 'email') {
    if (input.validity.valueMissing) {
      error.textContent = errorMessages[name].valueMissing;
    } else if (input.validity.typeMismatch) {
      error.textContent = errorMessages[name].typeMismatch;
    }
  } else {
    error.textContent = errorMessages[name];
  }
  
  error.style.display = 'block';
}

window.onload = function () {
  heroTitle.classList.add("typing");
  typePhrase();
};

window.onscroll = function() {
  let header = document.querySelector('.header');
  header.classList.toggle('sticky', window.scrollY > 0);
};
