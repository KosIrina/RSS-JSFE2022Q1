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