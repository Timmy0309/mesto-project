import '../pages/index.css';

import { getCards, getUserInfo, changeProfile, createnewCard, changeAva } from './api.js';
import { openModal, closeModal } from './modal.js';
import { createCard } from './card.js';
import { enableValidation } from './validate.js';

const listCards = document.querySelector('.places__list');

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const popupButton = document.querySelectorAll('.popup__button');
console.log(popupButton);

profilePopup.classList.add('.popup_is-animated');
cardPopup.classList.add('.popup_is-animated');
imagePopup.classList.add('.popup_is-animated');

const editProfile = document.querySelector('.profile__edit-button');
const closePopup = document.querySelectorAll('.popup__close');

const newcardpopup = document.querySelector('.profile__add-button');
const formCardElement = document.forms['new-place'];
const namecard = document.querySelector('.popup__input_type_card-name');
const url_location = document.getElementById('url-input');


const profileFormElement = document.forms['edit-profile'];

const nameInput = profileFormElement.elements.name;
const jobInput = profileFormElement.elements.description;

const profile = document.querySelector('.profile__title');
const jobprofile = document.querySelector('.profile__description');
const avaprofile = document.querySelector('.profile__image');
const avaPen = document.querySelector('.profile__image_pen');

const popupAva = document.querySelector('.popup_type_avatar');
const formAva = document.forms['edit-avatar'];

let myId;

getUserInfo()
    .then((res) => {
        profile.textContent = res.name;
        jobprofile.textContent = res.about;
        avaprofile.style.backgroundImage = `url(${res.avatar})`;
        myId = res._id;
    })
    .catch((err) => {console.log(err)})

export {myId}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const name = nameInput.value;
    const job = jobInput.value;

    popupButton[0].textContent = 'Сохранение...';
    changeProfile(name, job)
        .then((res) => {
            profile.textContent = res.name;
            jobprofile.textContent = res.about;
            closeModal(profilePopup);
        })
        .catch(err => {console.log(err);})
        .finally(() => {
            popupButton[0].textContent = "Сохранить";
        });
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

getCards()
    .then((res) => {
        res.forEach((item) => {
            listCards.append(createCard(item));
        });
    })
    .catch((err) => console.log(err))

newcardpopup.addEventListener('click', function () {
    openModal(cardPopup);
});


function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const locate = namecard.value;
    const url = url_location.value;

    popupButton[1].textContent = 'Создание...';
    createnewCard(locate, url)
        .then((newcard) => {
            const card = createCard(newcard);
        
            listCards.prepend(card);
            closeModal(cardPopup);
            formCardElement.reset();
        })
        .catch(err => console.log(err))
        .finally(() => {
            popupButton[1].textContent = 'Создать';
        })
        


}
formCardElement.addEventListener('submit', handleCardFormSubmit);

avaprofile.addEventListener('click', function () {
    openModal(popupAva);
});

avaPen.addEventListener('click', function () {
    openModal(popupAva);
});

function handleAvaFormSubmit(evt) {
    evt.preventDefault();

    const link = document.getElementById('url-input_ava').value;
    popupButton[2].textContent = 'Сохраниение...';
    changeAva(link)
        .then((res) => {
            avaprofile.style.backgroundImage = `url(${res.avatar})`;
            closeModal(popupAva);
        })
        .catch(err => console.log(err))
        .finally(() => {
            popupButton[2].textContent = 'Сохранить';
        })

}
formAva.addEventListener('submit', handleAvaFormSubmit);

const validationSettings = {
    formClass: '.popup__form',
    inputClass: '.popup__input',
    inputErrorClass: 'popup__input_error',
    buttonClass: '.popup__button',
    buttonInactiveClass: 'popup__button_inactive',
    errorClass: 'popup__error-text_active'
}

enableValidation(validationSettings);
