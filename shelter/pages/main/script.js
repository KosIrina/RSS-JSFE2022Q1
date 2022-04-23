// images caching
function preloadImages(name) {
  for (let i = 1; i <= 8; i++) {
    const img = new Image();
    img.src = `../../assets/images/${name}.png`; 
  }
} 
const names = ['charly', 'freddie', 'jennifer', 'katrine', 'scarlett', 'sophia', 'timmy', 'woody'];
names.forEach((elem) => preloadImages(elem));

// hamburger + menu (<768px)
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.navigation-list');
const nav = document.querySelector('.navigation');
const logo = document.querySelector('.logo-link');
const hamburgerLines = document.querySelectorAll('.hamburger-line');
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
const aboutLink = document.querySelector('.nav-about-item');
const body = document.querySelector('body');
const helpLink = document.querySelector('.nav-help-item');
const contactsLink = document.querySelector('.nav-contacts-item');

function toggleMenu() {
  hamburger.classList.toggle('open');
  menu.classList.toggle('open');
  logo.classList.toggle('hidden');
  hamburgerLines.forEach((line) => { line.classList.toggle('open') });
  mobileMenuOverlay.classList.toggle('open');
  body.classList.toggle('noscroll');
}

hamburger.addEventListener('click', toggleMenu);

function closeMenu() {
  hamburger.classList.remove('open');
  menu.classList.remove('open');
  logo.classList.remove('hidden');
  hamburgerLines.forEach((line) => { line.classList.remove('open') });
  mobileMenuOverlay.classList.remove('open');
  body.classList.remove('noscroll');
}

mobileMenuOverlay.addEventListener('click', closeMenu);
helpLink.addEventListener('click', closeMenu);
contactsLink.addEventListener('click', closeMenu);

function closeMenuAndScrollUp() {
  closeMenu();
  window.scrollTo(0, 0);
}

aboutLink.addEventListener('click', closeMenuAndScrollUp);

import pets from '../../pages/main/pets.js';
/* console.log(pets); */

// Popup
const popupWrapper = document.querySelector('.modal-window-wrapper');
const popupOverlay = document.querySelector('.modal-window-overlay');
const popupCloseButton = document.querySelector('.cross-button');
const petCards = document.querySelectorAll('.pet-card');
const popupWindow = document.querySelector('.modal-window');
const popupWindowContent = document.querySelector('.modal-window-content');

function openPopup(event) {
  popupWrapper.style.display = 'block';

  let currentPetName = event.currentTarget.querySelector('.pet-card-title').innerHTML;
  let currentPetInfo = pets.find((element, index, array) => {
    if (array[index]["name"] === currentPetName) {
      return array[index];
    }
  });

  const petImagePopup = document.querySelector('.modal-window-image');
  const petNamePopup = document.querySelector('.pet-name');
  const petTypeBreed = document.querySelector('.pet-type-and-breed');
  const petDescription = document.querySelector('.pet-description');
  const petAge = document.querySelector('.characteristic-value.age');
  const petInoculations = document.querySelector('.characteristic-value.inoculations');
  const petDiseases = document.querySelector('.characteristic-value.diseases');
  const petParasites = document.querySelector('.characteristic-value.parasites');

  petImagePopup.src = `${currentPetInfo["img"]}`;
  petNamePopup.textContent = `${currentPetInfo["name"]}`;
  petTypeBreed.textContent = `${currentPetInfo["type"]} - ${currentPetInfo["breed"]}`;
  petDescription.textContent = `${currentPetInfo["description"]}`;
  petAge.textContent = `${currentPetInfo["age"]}`;
  petInoculations.textContent = `${currentPetInfo["inoculations"]}`;
  petDiseases.textContent = `${currentPetInfo["diseases"]}`;
  petParasites.textContent = `${currentPetInfo["parasites"]}`;
  body.style.overflowY = 'hidden';
}

petCards.forEach((elem) => { elem.addEventListener('click', openPopup) }); 
petCards.forEach((elem) => { elem.addEventListener('click', scrollPopup) });


function closePopup() {
  popupWrapper.style.display = 'none';
  body.style.overflowY = '';
}

popupOverlay.addEventListener('click', closePopup);
popupCloseButton.addEventListener('click', closePopup);

function scrollPopup() {
  if ((document.documentElement.clientHeight - 55 * 2) !== popupWindow.offsetHeight && document.documentElement.clientHeight < (popupWindowContent.offsetHeight + 55*2) && document.documentElement.clientHeight > 220) {
    popupWindow.style.minHeight = '0';
    popupWindow.style.height = (document.documentElement.clientHeight - 55 * 2) + 'px';
    popupWindow.style.overflowY = 'auto';
   } else if ( (document.documentElement.clientHeight - 55*2) !== popupWindow.offsetHeight && document.documentElement.clientHeight <= 220) {
    popupWindow.style.minHeight = '0';
    popupWindow.style.height = '120px';
    popupWindow.style.overflowY = 'auto';
   } else if (document.documentElement.clientHeight >= (popupWindowContent.offsetHeight + 55*2) ) {
    popupWindow.style.minHeight = '350px';
    popupWindow.style.height = '';
    popupWindow.style.overflowY = '';
  }
}
window.addEventListener('resize', scrollPopup);

// Slider
const petTitles = document.querySelectorAll('.pet-card-title.active');
const backButton = document.querySelector('.arrow-back-button');
const forwardButton = document.querySelector('.arrow-forward-button');
const petCardsLeft = document.querySelectorAll('.pet-card.left');
const petCardsRight = document.querySelectorAll('.pet-card.right');
const carousel = document.querySelector('.pets-cards-block');
const petCardsCenter = document.querySelectorAll('.pet-card.active');
let randomArray = [];
let desktop = window.matchMedia('(min-width: 1280px)');
let tablet = window.matchMedia('(min-width: 768px) and (max-width: 1279px)');
let mobile = window.matchMedia('(min-width: 320px)  and (max-width: 767px)');

function generateRandomCards() {
  let currentPetsOnPage = [];
  let newPets = [];
  
  petTitles.forEach((elem) => { currentPetsOnPage.push(elem.innerHTML); });  

  pets.forEach((elem, index) => {
    if (pets[index]["name"] !== currentPetsOnPage[0] && pets[index]["name"] !== currentPetsOnPage[1] && pets[index]["name"] !== currentPetsOnPage[2] ) {
      newPets.push(elem);
    }
  })

  for (let i = 0; randomArray.length < 3; i++) {
    let randomEl = newPets[Math.floor(Math.random() * newPets.length)];
    if (randomArray.includes(randomEl) === false) {
      randomArray.push(randomEl);
    }
  }

  let a = 0;
  let b = 0;
  petCardsLeft.forEach((elem) => {
    elem.querySelector('.pet-card-image').src = `${randomArray[a]["img"]}`;    
    elem.querySelector('.pet-card-title').textContent = `${randomArray[a]["name"]}`;
    
    a++;
  })

  petCardsRight.forEach((elem) => {
    elem.querySelector('.pet-card-image').src = `${randomArray[b]["img"]}`;    
    elem.querySelector('.pet-card-title').textContent = `${randomArray[b]["name"]}`;
        
    b++;
  })
  /* console.log(currentPetsOnPage);
  console.log(newPets);
  console.log(randomArray); */
}

function slideLeft() {
  generateRandomCards();

  if (desktop.matches) {
    carousel.classList.add('transition-left-desktop');
  }
  if (tablet.matches) {
    carousel.classList.add('transition-left-tablet');
  }
  if (mobile.matches) {
    carousel.classList.add('transition-left-mobile');
  }

  backButton.removeEventListener('click', slideLeft);
  forwardButton.removeEventListener('click', slideRight);
}

function slideRight() {
  generateRandomCards();

  if (desktop.matches) {
    carousel.classList.add('transition-right-desktop');
  }
  if (tablet.matches) {
    carousel.classList.add('transition-right-tablet');
  }
  if (mobile.matches) {
    carousel.classList.add('transition-right-mobile');
  }
  
  backButton.removeEventListener('click', slideLeft);
  forwardButton.removeEventListener('click', slideRight);
} 

backButton.addEventListener('click', slideLeft);
forwardButton.addEventListener('click', slideRight);

function doAfterAnimation() {
  if (desktop.matches) {
    carousel.classList.remove('transition-left-desktop');
    carousel.classList.remove('transition-right-desktop');
  }
  if (tablet.matches) {
    carousel.classList.remove('transition-left-tablet');
    carousel.classList.remove('transition-right-tablet');
  }
  if (mobile.matches) {
    carousel.classList.remove('transition-left-mobile');
    carousel.classList.remove('transition-right-mobile');
  }
  
  backButton.addEventListener('click', slideLeft);
  forwardButton.addEventListener('click', slideRight);

  let c = 0;
  petCardsCenter.forEach((elem) => {
    elem.querySelector('.pet-card-image').src = `${randomArray[c]["img"]}`;    
    elem.querySelector('.pet-card-title').textContent = `${randomArray[c]["name"]}`;
        
    c++;
  })

  randomArray = [];
}

carousel.addEventListener('animationend', doAfterAnimation);