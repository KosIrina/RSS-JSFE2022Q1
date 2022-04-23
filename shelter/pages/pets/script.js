// hamburger + menu (<768px)
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.navigation-list');
const nav = document.querySelector('.navigation');
const logo = document.querySelector('.logo-link');
const hamburgerLines = document.querySelectorAll('.hamburger-line');
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
const ourPetsLink = document.querySelector('.nav-pets-item');
const body = document.querySelector('body');
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
contactsLink.addEventListener('click', closeMenu);

function closeMenuAndScrollUp() {
  closeMenu();
  window.scrollTo(0, 0);
}

ourPetsLink.addEventListener('click', closeMenuAndScrollUp);

import pets from '../../pages/main/pets.js';
/* console.log(pets); */

// Popup
const popupWrapper = document.querySelector('.modal-window-wrapper');
const popupOverlay = document.querySelector('.modal-window-overlay');
const popupCloseButton = document.querySelector('.cross-button');
const petCards = document.querySelectorAll('.pet-card');
const popupWindow = document.querySelector('.modal-window');
const popupWindowContent = document.querySelector('.modal-window-content');
let desktop = window.matchMedia('(min-width: 1280px)');
let tablet = window.matchMedia('(min-width: 768px) and (max-width: 1279px)');
let mobile = window.matchMedia('(min-width: 320px)  and (max-width: 767px)');

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

//Pagination

let randomPetsArr;
let pageButton = document.querySelector('.current-page-button');
let startButton = document.querySelector('.arrow-start-button');
let backButton = document.querySelector('.arrow-back-button');
let forwardButton = document.querySelector('.arrow-forward-button');
let endButton = document.querySelector('.arrow-end-button');

function createRandomPets() {
  randomPetsArr = [...pets, ...pets, ...pets, ...pets, ...pets, ...pets];

  for (let i = randomPetsArr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [randomPetsArr[i], randomPetsArr[j]] = [randomPetsArr[j], randomPetsArr[i]];
  }
}

window.addEventListener('load', createRandomPets());

let sortedPetsArr = [];

function fillPages() {
  sortedPetsArr.splice(0, 16);

  if (desktop.matches) {
    for (let a = 0; sortedPetsArr.length < 6; a++) {
    sortedPetsArr.push([]);
    }

    randomPetsArr.forEach((el) => {
      for (let i = 0; i < 6; i++) {
        if (sortedPetsArr[i].includes(el) === false && sortedPetsArr[i].length < 8) {
          sortedPetsArr[i].push(el);
          break;
        } 
      }    
    })

    let z = 0;
    petCards.forEach((elem, z) => { 
      elem.querySelector('.pet-card-image').classList.add('animated');
      elem.querySelector('.pet-card-image').src = `${sortedPetsArr[0][z]["img"]}`;    
      elem.querySelector('.pet-card-title').textContent = `${sortedPetsArr[0][z]["name"]}`;
      z++;
    });

    setTimeout(() =>
    petCards.forEach((elem) => {
      elem.querySelector('.pet-card-image').classList.remove('animated');
    }), 1500
  );
  }

  if (tablet.matches) {
    for (let a = 0; sortedPetsArr.length < 8; a++) {
    sortedPetsArr.push([]);
    }
    
    function sortPetsForPagesTablet() {
      randomPetsArr.forEach((el) => {
        for (let i = 0; i < 8; i++) {
          if (sortedPetsArr[i].includes(el) === false && sortedPetsArr[i].length < 6) {
            sortedPetsArr[i].push(el);
            break;
          }
        }
      })
    }

    sortPetsForPagesTablet();

    while (sortedPetsArr[0].length < 6 || sortedPetsArr[1].length < 6 || sortedPetsArr[2].length < 6 || sortedPetsArr[3].length < 6 || sortedPetsArr[4].length < 6 || sortedPetsArr[5].length < 6 || sortedPetsArr[6].length < 6 || sortedPetsArr[7].length < 6) {
      createRandomPets();
      sortedPetsArr.splice(0, 8);
      for (let a = 0; sortedPetsArr.length < 8; a++) {
        sortedPetsArr.push([]);
      }      
      sortPetsForPagesTablet();
    }
    
    let z = 0;
    let petCardsArr = Array.prototype.slice.call(petCards).slice(0, 6);
    /* console.log(petCardsArr); */

    petCardsArr.forEach((elem, z) => { 
      elem.querySelector('.pet-card-image').classList.add('animated');
      elem.querySelector('.pet-card-image').src = `${sortedPetsArr[0][z]["img"]}`;    
      elem.querySelector('.pet-card-title').textContent = `${sortedPetsArr[0][z]["name"]}`;
      z++;
    });

    setTimeout(() =>
    petCards.forEach((elem) => {
      elem.querySelector('.pet-card-image').classList.remove('animated');
    }), 1500
  );
  }

  if (mobile.matches) {
    for (let a = 0; sortedPetsArr.length < 16; a++) {
    sortedPetsArr.push([]);
    }

    function sortPetsForPagesTablet() {
      randomPetsArr.forEach((el) => {
        for (let i = 0; i < 16; i++) {
          if (sortedPetsArr[i].includes(el) === false && sortedPetsArr[i].length < 3) {
            sortedPetsArr[i].push(el);
            break;
          }
        }
      })
    }

    sortPetsForPagesTablet();

    while (sortedPetsArr[0].length < 3 || sortedPetsArr[1].length < 3 || sortedPetsArr[2].length < 3 || sortedPetsArr[3].length < 3 || sortedPetsArr[4].length < 3 || sortedPetsArr[5].length < 3 || sortedPetsArr[6].length < 3 || sortedPetsArr[7].length < 3 || sortedPetsArr[8].length < 3 || sortedPetsArr[9].length < 3 || sortedPetsArr[10].length < 3 || sortedPetsArr[11].length < 3 || sortedPetsArr[12].length < 3 || sortedPetsArr[13].length < 3 || sortedPetsArr[14].length < 3 || sortedPetsArr[15].length < 3) {
      createRandomPets();
      sortedPetsArr.splice(0, 16);
      for (let a = 0; sortedPetsArr.length < 16; a++) {
        sortedPetsArr.push([]);
      }      
      sortPetsForPagesTablet();
    }

    let z = 0;
    let petCardsArr = Array.prototype.slice.call(petCards).slice(0, 3);
/*     console.log(petCardsArr);
 */
    petCardsArr.forEach((elem, z) => { 
      elem.querySelector('.pet-card-image').classList.add('animated');
      elem.querySelector('.pet-card-image').src = `${sortedPetsArr[0][z]["img"]}`;    
      elem.querySelector('.pet-card-title').textContent = `${sortedPetsArr[0][z]["name"]}`;
      z++;
    });

    setTimeout(() =>
    petCards.forEach((elem) => {
      elem.querySelector('.pet-card-image').classList.remove('animated');
    }), 1500
  );
  }
  console.log(sortedPetsArr); //проверка
}

window.addEventListener('load', fillPages);
window.addEventListener('resize', fillPages);

function checkIfDisabled() {
  if (pageButton.innerHTML === '1') {
    startButton.classList.add('disabled');
    backButton.classList.add('disabled');
  } else if (startButton.classList.contains('disabled') && backButton.classList.contains('disabled')) {
    startButton.classList.remove('disabled');
    backButton.classList.remove('disabled');
  }

  if (pageButton.innerHTML === `${sortedPetsArr.length}`) {
    forwardButton.classList.add('disabled');
    endButton.classList.add('disabled');
  } else if (forwardButton.classList.contains('disabled') && endButton.classList.contains('disabled')) {
    forwardButton.classList.remove('disabled');
    endButton.classList.remove('disabled');
  }
}

function returnToStart() {
  if (startButton.classList.contains('disabled') === false) {
  
    pageButton.innerHTML = '1';
    checkIfDisabled();

    let petCardsArr = Array.prototype.slice.call(petCards).slice(0, sortedPetsArr[0].length);

    let z = 0;
    petCardsArr.forEach((elem, z) => {
      elem.querySelector('.pet-card-image').classList.add('animated');
      elem.querySelector('.pet-card-image').src = `${sortedPetsArr[0][z]["img"]}`;
      elem.querySelector('.pet-card-title').textContent = `${sortedPetsArr[0][z]["name"]}`;
      z++;
    });
    setTimeout(() =>
      petCards.forEach((elem) => {
        elem.querySelector('.pet-card-image').classList.remove('animated');
      }), 1500
    );
  }
}

startButton.addEventListener('click', returnToStart);

function goToEnd() {
  if (endButton.classList.contains('disabled') === false) {
    
    pageButton.innerHTML = `${sortedPetsArr.length}`;
    checkIfDisabled();

    let petCardsArr = Array.prototype.slice.call(petCards).slice(0, sortedPetsArr[0].length);
    
    let z = 0;
    petCardsArr.forEach((elem, z) => {
      elem.querySelector('.pet-card-image').classList.add('animated');
      elem.querySelector('.pet-card-image').src = `${sortedPetsArr[sortedPetsArr.length - 1][z]["img"]}`;
      elem.querySelector('.pet-card-title').textContent = `${sortedPetsArr[sortedPetsArr.length - 1][z]["name"]}`;
      z++;
    });
    setTimeout(() =>
      petCards.forEach((elem) => {
        elem.querySelector('.pet-card-image').classList.remove('animated');
      }), 1500
    );
  }
}

endButton.addEventListener('click', goToEnd);

function goBack() {
  if(backButton.classList.contains('disabled') === false) {
  
  pageButton.innerHTML = `${pageButton.innerHTML - 1}`;
    checkIfDisabled();

    let petCardsArr = Array.prototype.slice.call(petCards).slice(0, sortedPetsArr[0].length);
    
    let z = 0;
    petCardsArr.forEach((elem, z) => { 
      elem.querySelector('.pet-card-image').classList.add('animated');
      elem.querySelector('.pet-card-image').src = `${sortedPetsArr[pageButton.innerHTML - 1][z]["img"]}`;    
      elem.querySelector('.pet-card-title').textContent = `${sortedPetsArr[pageButton.innerHTML - 1][z]["name"]}`;
      z++;
    });
    setTimeout(() =>
    petCards.forEach((elem) => {
      elem.querySelector('.pet-card-image').classList.remove('animated');
    }), 1500
    );
  }
}

backButton.addEventListener('click', goBack);

function goForward() {
  if(forwardButton.classList.contains('disabled') === false) {
  
  pageButton.innerHTML = `${Number(pageButton.innerHTML) + 1}`;
    checkIfDisabled();

    let petCardsArr = Array.prototype.slice.call(petCards).slice(0, sortedPetsArr[0].length);
    
    let z = 0;
    petCardsArr.forEach((elem, z) => { 
      elem.querySelector('.pet-card-image').classList.add('animated');
      elem.querySelector('.pet-card-image').src = `${sortedPetsArr[pageButton.innerHTML - 1][z]["img"]}`;    
      elem.querySelector('.pet-card-title').textContent = `${sortedPetsArr[pageButton.innerHTML - 1][z]["name"]}`;
      z++;
    });
    setTimeout(() =>
    petCards.forEach((elem) => {
      elem.querySelector('.pet-card-image').classList.remove('animated');
    }), 1500
    );
  }
}

forwardButton.addEventListener('click', goForward);

function updateInfoOnResize() {
  pageButton.innerHTML = '1';
  if (startButton.classList.contains('disabled') === false && backButton.classList.contains('disabled') === false) {
    startButton.classList.add('disabled');
    backButton.classList.add('disabled');
  }
  if (forwardButton.classList.contains('disabled') && endButton.classList.contains('disabled') ) {
    forwardButton.classList.remove('disabled');
    endButton.classList.remove('disabled');
  }
}

window.addEventListener('resize', updateInfoOnResize);