import '../pages/index.css';

import { initialCards } from './cards.js';
import { openModal, closeModal } from './modal.js';
import { createCard } from './card.js';
import { enableValidation } from './validate.js';

const listCards = document.querySelector('.places__list');

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const editProfile = document.querySelector('.profile__edit-button');
const closePopup = document.querySelectorAll('.popup__close');

const newcardpopup = document.querySelector('.profile__add-button');
const formCardElement = document.forms['new-place'];
const namecard = document.querySelector('.popup__input_type_card-name');
const url_location = document.querySelector('.popup__input_type_url');


const profileFormElement = document.forms['edit-profile'];

const nameInput = profileFormElement.elements.name;
const jobInput = profileFormElement.elements.description;

const profile = document.querySelector('.profile__title');
const jobprofile = document.querySelector('.profile__description');

function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 
    
    const name = nameInput.value;
    const job = jobInput.value;

    profile.textContent = name;
    jobprofile.textContent = job;

    closeModal(profilePopup);
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

editProfile.addEventListener('click', function () {
    nameInput.value = profile.textContent;
    jobInput.value = jobprofile.textContent;
    openModal(profilePopup);
});

closePopup.forEach(function (popup) {
    popup.addEventListener('click', function () {
        const pop = popup.closest('.popup');
        closeModal(pop);
    });
});


initialCards.forEach(function(item){
    listCards.append(createCard(item));
});

newcardpopup.addEventListener('click', function () {
    openModal(cardPopup);
});


function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const locate = namecard.value;
    const url = url_location.value;

    const newcard = createCard({
        name: locate,
        link: url
    });

    listCards.prepend(newcard);

    closeModal(cardPopup);
    formCardElement.reset();
}
formCardElement.addEventListener('submit', handleCardFormSubmit);

profilePopup.classList.add('.popup_is-animated');
cardPopup.classList.add('.popup_is-animated');
imagePopup.classList.add('.popup_is-animated');


const validationSettings = {
  formClass: '.popup__form',
  inputClass: '.popup__input',
  inputErrorClass: 'popup__input_error',
  buttonClass: '.popup__button',
  buttonInactiveClass: 'popup__button_inactive',
  errorClass: 'popup__error-text_active'
}

enableValidation(validationSettings);
