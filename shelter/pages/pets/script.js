"use strict"
const iconBurger = document.querySelector('.header__burger');
const menuBurger = document.querySelector('.header__nav');
const logoRegular = document.querySelector('.header__logo');
const logoBurger = document.querySelector('.header__burger-logo');
const headerWrapper = document.querySelector('.header');
const overlay = document.querySelector('.overlay');

iconBurger.addEventListener('click', function(e){
    menuBurger.classList.toggle('_active');
    iconBurger.classList.toggle('_active');
    logoRegular.classList.toggle('_active');
    logoBurger.classList.toggle('_active');
    headerWrapper.classList.toggle('_active');
    document.body.classList.toggle('_lock');
    overlay.classList.toggle('_active');
});

const menuLinks = document.querySelectorAll('.header__link');
menuLinks.forEach(menuLink => menuLink.addEventListener('click', closeMenu));
function closeMenu () {
    menuBurger.classList.remove('_active');
    iconBurger.classList.remove('_active');
    logoRegular.classList.remove('_active');
    logoBurger.classList.remove('_active');
    headerWrapper.classList.remove('_active');
    document.body.classList.remove('_lock');
    overlay.classList.remove('_active');
}