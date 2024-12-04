import {openModal} from './modal.js'

const cardsTemplate = document.querySelector('#card-template').content;

const imagepopup_src_alt = document.querySelector('.popup__image');
const imagepopup_name = document.querySelector('.popup__caption');
const imagePopup = document.querySelector('.popup_type_image');

function handlelikebutton(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

function createCard(card_info){
    const cards = cardsTemplate.querySelector('.places__item').cloneNode(true);
    const card_image = cards.querySelector('.card__image');
    const card_name = cards.querySelector('.card__title');
    const likebutton = cards.querySelector('.card__like-button');
    const deletebutton = cards.querySelector('.card__delete-button');

    card_image.src = card_info.link;
    card_image.alt = card_info.name;
    card_name.textContent = card_info.name;

    likebutton.addEventListener('click', handlelikebutton);
    deletebutton.addEventListener('click', () => {
        const parentcarddel = deletebutton.closest('.places__item');
        parentcarddel.remove();
    })
    
    card_image.addEventListener('click', function () {
        imagepopup_src_alt.src = card_info.link;
        imagepopup_name.textContent = card_info.name;
        imagepopup_src_alt.alt = card_info.name;

        openModal(imagePopup);
    });

    return cards;
}
export {createCard};