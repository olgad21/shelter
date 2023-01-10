"use strict"

//Burger Menu
const iconBurger = document.querySelector('.header__burger');
const menuBurger = document.querySelector('.header__nav');
const logoRegular = document.querySelector('.header__logo');
const logoBurger = document.querySelector('.header__burger-logo');
const headerWrapper = document.querySelector('.header__wrapper');
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

overlay.addEventListener('click', closeMenu);

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

//Parse JSON file

let pets = [];

const loadData = async () => {
    const res = await fetch('../../pets.json')
    const json = await res.json();
    return json;
};

// fetch('../../pets.json')
//     .then((response) => response.json())
//     .then(res => { pets = res }) 

// import pets from './pets.json';

// const pets = require('./pets.json');

// const pets = JSON.parse(JSON.stringify(petsJson));


// Display random pet cards on the main page

// const petCards = document.querySelectorAll('.friends__card'); //Array with all pet cards
const petCards = document.getElementsByClassName('friends__card');

let displayedPetNames = [];

//Display random image and name in every pet card (no duplicates on one page)
function generateImages(newPets) {
    const petsData = [...newPets];

    for (let i = 0; i < petCards.length; i++) {
        if (window.getComputedStyle(petCards[i], null).display !== 'none') {
            let randomIndex = Math.floor(Math.random() * petsData.length);

            petCards[i].dataset.petname = `${petsData[randomIndex].name}`; //add data attribute to each card
            let petImage = petCards[i].getElementsByTagName('img')[0]; //Find image in the card
            petImage.src = `${petsData[randomIndex].img}`; 
            let petName = petCards[i].getElementsByTagName('p')[0];  //Find name in the card
            petName.innerHTML = `${petsData[randomIndex].name}`;
            petsData.splice(randomIndex, 1); //So that images do not to duplicate on same slide
            displayedPetNames.push(petName.innerHTML);
        }
    };
}

// Make slider on the main page

function getUndisplayedCards() {
    let undisplayedPets = [];

    for (let j = 0; j < pets.length; j++){
        if (!displayedPetNames.includes(pets[j].name)){
            undisplayedPets.push(pets[j]);
        }
    }
    displayedPetNames = [];
    return undisplayedPets;
}

const btnLeft = document.querySelector('.friends__slider--circle-left');
const btnRight = document.querySelector('.friends__slider--circle-right');

const carousel = document.querySelector('.friends__carousel');

btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);

function moveLeft() {
    const nextSlides = getUndisplayedCards();
    generateImages(nextSlides);
    // carousel.classList.add('slide-in');
}

function moveRight() {
    const nextSlides = getUndisplayedCards();
    generateImages(nextSlides);
}


loadData()
    .then((loadedData) => {
        pets = loadedData;
        generateImages(pets);
    });

//Create popup

const popUp = document.querySelector('.friends__popup');

Array.from(petCards).forEach(petCard => petCard.addEventListener('click', openPopup));

function openPopup(event) {
    let target = event.target; //куда кликнули
    let value;
    if (target.tagName !== 'DIV') {
        const petCard = target.parentNode;
        value = petCard.getAttribute("data-petname");
    } else {
        value = target.getAttribute("data-petname");
    }
    
    const petToShow = pets.find(pet => pet.name === value); //what will be displayed in the card

    let popupPetImage = popUp.getElementsByTagName('img')[0];
    popupPetImage.src = petToShow.img;

    let popupPetName = popUp.getElementsByClassName('friends__popup--title')[0];
    popupPetName.innerHTML = petToShow.name;

    let popupPetBreed = popUp.getElementsByClassName('friends__popup--subtitle')[0];
    popupPetBreed.innerHTML = `${petToShow.type} - ${petToShow.breed}`;

    let popupPetDesc = popUp.getElementsByClassName('friends__popup--description')[0];
    popupPetDesc.innerHTML = petToShow.description;

    let popupPetAge = popUp.querySelector("[data-property='age']");
    popupPetAge.innerHTML = petToShow.age;

    let popupPetInoculations = popUp.querySelector("[data-property='inoculations']");
    popupPetInoculations.innerHTML = petToShow.inoculations;

    let popupPetDiseases = popUp.querySelector("[data-property='diseases']");
    popupPetDiseases.innerHTML = petToShow.diseases;

    let popupPetParasites = popUp.querySelector("[data-property='parasites']");
    popupPetParasites.innerHTML = petToShow.parasites;

    popUp.classList.add('_active');
    document.body.classList.add('_lock');
};

document.querySelector('.friends__popup__area').addEventListener('click', closePopup);
document.querySelector('.friends__popup--close').addEventListener('click', closePopup);

function closePopup() {
    popUp.classList.remove('_active');
    document.body.classList.remove('_lock');
}


