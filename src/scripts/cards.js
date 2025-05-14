import { closeModal, openModal } from './modal';
import { deleteCard, likeCard, dislikeCard } from './api.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const popupDelete = document.querySelector('.popup_type_delete-confirm');
const buttonDelete = popupDelete.querySelector('.popup__button');

const updateLikeQuantity = (likeQuantity, likeButton, quantity) => {
  likeQuantity.textContent = quantity;
  likeButton.classList.toggle('card__like-button_is-active');
};

export const handlerLikeCard = (cardId, likeButton, likeQuantity) => {
  if (likeButton.classList.contains('card__like-button_is-active')) {
    dislikeCard(cardId)
      .then((resultCard) => {
        updateLikeQuantity(likeQuantity, likeButton, resultCard.likes.length);
      })
      .catch((err) => console.log(err));
  } else {
    likeCard(cardId)
      .then((resultCard) => {
        updateLikeQuantity(likeQuantity, likeButton, resultCard.likes.length);
      })
      .catch((err) => console.log(err));
  }
};

const handlerDeleteCard = (cardId, cardItem) => {
  openModal(popupDelete);
  buttonDelete.addEventListener('click', function () {
    deleteCard(cardId)
      .then((res) => {
        cardItem.remove();
        closeModal(popupDelete);
      })
      .catch((err) => console.log(err));
  });
};

export const createCard = (
  cardId,
  cardName,
  cardLink,
  cardLikeQuantity,
  isLikeActive,
  buttonDeleteExists,
  handlerLikeCard,
  handlerCardView
) => {
  const newCard = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = newCard.querySelector('.card__image');
  const likeQuantity = newCard.querySelector('.card__like_quantity');
  const deleteButton = newCard.querySelector('.card__delete-button');
  const likeButton = newCard.querySelector('.card__like-button');

  newCard.querySelector('.card__title').textContent = cardName;
  cardImage.src = cardLink;
  cardImage.alt = `Фотография места: ${cardName}`;
  likeQuantity.textContent = cardLikeQuantity;

  if (buttonDeleteExists) {
    deleteButton.addEventListener('click', () =>
      handlerDeleteCard(cardId, newCard)
    );
  } else {
    deleteButton.disable = true;
    deleteButton.classList.add('button_disabled');
  }

  if (isLikeActive) {
    likeButton.classList.add('card__like-button_is-active');
  }

  likeButton.addEventListener('click', () =>
    handlerLikeCard(cardId, likeButton, likeQuantity)
  );
  
  cardImage.addEventListener('click', () =>
    handlerCardView(cardName, cardLink)
  );

  return newCard;
};
