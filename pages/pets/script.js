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


// Make pagination on the main page
let slideIndex = 0;

const petCards = document.getElementsByClassName('our-pets__card');

let pets = [];

let allPets = [];

    // Make array of all pets
function getAllPets(pets) {
    allPets = [...pets];
    allPets = allPets.concat(allPets, allPets, allPets, allPets, allPets);
}

    //Parse JSON file

const loadData = async () => {
    const res = await fetch('../../pets.json')
    const json = await res.json();
    return json;
};

loadData()
    .then((loadedData) => {
        pets = loadedData;
        getAllPets(pets);
        getPetsForPage();
        generateImages(allPetsDivided, slideIndex);
    });


    //Divide all pets by pages number 

let numberOfPages;
let allPetsDivided = [];

function getPetsForPage(){
  
  let pageWidth = window.innerWidth 
  || document.documentElement.clientWidth 
  || document.body.clientWidth;

  if (pageWidth >= 1280) {
      numberOfPages = 6;
  }
  if (pageWidth < 1280 && pageWidth >=768) {
      numberOfPages = 8;
  }
  if (pageWidth < 768) {
      numberOfPages = 16;
  }

  let allPetsCopy = [...allPets];
  for (let i = numberOfPages; i > 0; i--) {
    allPetsDivided.push(allPetsCopy.splice(0, Math.ceil(allPetsCopy.length / i)));
    allPetsDivided.forEach(set => shuffleArray(set));
  }

  console.log(allPetsDivided.length, 'массив с массивами');
}


  //Display cards randomly

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function generateImages(allPetsDivided, slideIndex) {
    // shuffleArray(allPetsDivided[slideIndex]);
    for (let i = 0; i < allPetsDivided[0].length; i++) {
        console.log(allPetsDivided[slideIndex], slideIndex, petCards.length)
        petCards[i].dataset.petname = allPetsDivided[slideIndex][i].name; //add data attribute to each card
        let petImage = petCards[i].getElementsByTagName('img')[0]; //Find image in the card
        petImage.src = allPetsDivided[slideIndex][i].img; 
        let petName = petCards[i].getElementsByTagName('p')[0];  //Find name in the card
        petName.innerHTML = allPetsDivided[slideIndex][i].name;
    }
}


// Create pagination

const btnLeft = document.querySelector('.left');
const btnRight = document.querySelector('.right');
const btnToFirst = document.querySelector('.toFirst');
const btnToLast = document.querySelector('.toLast');
const counter = document.querySelector('.our-pets__slider--counter');

if (slideIndex < 1) {
    btnLeft.classList.add('disabled');
    btnToFirst.classList.add('disabled');
}

btnLeft.addEventListener('click', () => switchSlides(-1));
btnRight.addEventListener('click', () => switchSlides(1));


function switchSlides(n) {
    slideIndex = slideIndex + n;
    generateImages(allPetsDivided, slideIndex);
    console.log(slideIndex);
    counter.innerHTML = slideIndex + 1;
    if (slideIndex >= (allPetsDivided.length - 1)) {
        console.log('too much');
        btnRight.classList.add('disabled');
        btnToLast.classList.add('disabled');
    } else {
        btnRight.classList.remove('disabled');
        btnToLast.classList.remove('disabled');
    } 
    if (slideIndex >= 1) {
        btnLeft.classList.remove('disabled');
        btnToFirst.classList.remove('disabled');
    } else {
        btnLeft.classList.add('disabled');
        btnToFirst.classList.add('disabled');
    }
  }

btnToFirst.addEventListener('click', openFirstSlide);
btnToLast.addEventListener('click', openLastSlide);

function openLastSlide() {
    slideIndex = allPetsDivided.length - 1;
    generateImages(allPetsDivided, slideIndex);
    counter.innerHTML = slideIndex + 1;
    if (slideIndex >= (allPetsDivided.length - 1)) {
        console.log('too much');
        btnRight.classList.add('disabled');
        btnToLast.classList.add('disabled');
    } else {
        btnRight.classList.remove('disabled');
        btnToLast.classList.remove('disabled');
    } 
    if (slideIndex >= 1) {
        btnLeft.classList.remove('disabled');
        btnToFirst.classList.remove('disabled');
    } else {
        btnLeft.classList.add('disabled');
        btnToFirst.classList.add('disabled');
    }
}

function openFirstSlide() {
    slideIndex = 0;
    generateImages(allPetsDivided, slideIndex);
    counter.innerHTML = slideIndex + 1;
    if (slideIndex >= (allPetsDivided.length - 1)) {
        console.log('too much');
        btnRight.classList.add('disabled');
        btnToLast.classList.add('disabled');
    } else {
        btnRight.classList.remove('disabled');
        btnToLast.classList.remove('disabled');
    } 
    if (slideIndex >= 1) {
        btnLeft.classList.remove('disabled');
        btnToFirst.classList.remove('disabled');
    } else {
        btnLeft.classList.add('disabled');
        btnToFirst.classList.add('disabled');
    }
}

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


