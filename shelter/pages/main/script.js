// hamburger + menu (<768px)
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.navigation-list');
const nav = document.querySelector('.navigation');
const logo = document.querySelector('.logo-link');
const hamburgerLines = document.querySelectorAll('.hamburger-line');
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
const aboutLink = document.querySelector('.nav-about-item');

function toggleMenu() {
  hamburger.classList.toggle('open');
  menu.classList.toggle('open');
  logo.classList.toggle('hidden');
  hamburgerLines.forEach((line) => { line.classList.toggle('open') });
  mobileMenuOverlay.classList.toggle('open');
}

hamburger.addEventListener('click', toggleMenu);

function closeMenu() {
  hamburger.classList.remove('open');
  menu.classList.remove('open');
  logo.classList.remove('hidden');
  hamburgerLines.forEach((line) => { line.classList.remove('open') });
  mobileMenuOverlay.classList.remove('open');
}

mobileMenuOverlay.addEventListener('click', closeMenu);

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
}

petCards.forEach((elem) => { elem.addEventListener('click', openPopup) }); 


function closePopup() {
  popupWrapper.style.display = 'none';
}

popupOverlay.addEventListener('click', closePopup);
popupCloseButton.addEventListener('click', closePopup);

// Slider
const petTitles = document.querySelectorAll('.pet-card-title');
const backButton = document.querySelector('.arrow-back-button');
const forwardButton = document.querySelector('.arrow-forward-button');

function changeSlide() {
  let currentPetsOnPage = [];
  let newPets = [];
  let randomArray = [];
  
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

  let i = 0;
  petCards.forEach((elem) => {
    elem.querySelector('.pet-card-image').classList.add('animated');
    elem.querySelector('.pet-card-image').src = `${randomArray[i]["img"]}`;    
    elem.querySelector('.pet-card-title').textContent = `${randomArray[i]["name"]}`;
    
    i++;
  })

  setTimeout(() =>
    petCards.forEach((elem) => {
      elem.querySelector('.pet-card-image').classList.remove('animated');
    }), 1500
  );

  
  /* console.log(currentPetsOnPage);
  console.log(newPets);
  console.log(randomArray); */
}

backButton.addEventListener('click', changeSlide);
forwardButton.addEventListener('click', changeSlide);