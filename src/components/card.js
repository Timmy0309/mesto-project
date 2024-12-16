import {openModal} from './modal.js'
import { myId } from './index.js';
import { delCard, likeCard } from './api.js';

const cardsTemplate = document.querySelector('#card-template').content;

const imagepopup_src_alt = document.querySelector('.popup__image');
const imagepopup_name = document.querySelector('.popup__caption');
const imagePopup = document.querySelector('.popup_type_image');

function handlelikebutton(_id, likeCount, evt) {
    console.log(evt);
    if(evt.target.classList.contains('card__like-button_is-active')) {
        const method = 'DELETE';
        likeCard(method, _id)
            .then((card) => {
                likeCount.textContent = card.likes.length;
                evt.target.classList.remove('card__like-button_is-active');
            })
            .catch(err => console.log(err))
    }
    else {
        const method = 'PUT';
        likeCard(method, _id)
            .then((card) => {
                likeCount.textContent = card.likes.length;
                evt.target.classList.add('card__like-button_is-active');
            })
            .catch(err => console.log(err))
    }
}

function createCard(card_info){
    const cards = cardsTemplate.querySelector('.places__item').cloneNode(true);
    const card_image = cards.querySelector('.card__image');
    const card_name = cards.querySelector('.card__title');
    const likebutton = cards.querySelector('.card__like-button');
    const likeCount = cards.querySelector('.card__likes_count');
    const deletebutton = cards.querySelector('.card__delete-button');

    card_image.src = card_info.link;
    card_image.alt = card_info.name;
    card_name.textContent = card_info.name;
    likeCount.textContent = card_info.likes.length;

    if (card_info.likes.some((inf) => {return inf._id === myId})) {
        likebutton.classList.add('card__like-button_is-active');
    }

    if (card_info.owner._id !== myId) {
        deletebutton.classList.add('card__delete-button_noactive');
    }

    likebutton.addEventListener('click', evt => handlelikebutton(card_info._id, likeCount, evt));
    deletebutton.addEventListener('click', () => {
        delCard(card_info._id)
            .then(() => {
                const parentcarddel = deletebutton.closest('.places__item');
                parentcarddel.remove();
            })
            .catch((err) => console.log(err))
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