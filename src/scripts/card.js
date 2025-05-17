import { closeModal, openModal } from './modal.js';
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
  const likeMethod = likeButton.classList.contains(
    'card__like-button_is-active'
  )
    ? dislikeCard
    : likeCard;

  likeMethod(cardId)
    .then((resultCard) => {
      updateLikeQuantity(likeQuantity, likeButton, resultCard.likes.length);
    })
    .catch((err) => console.log(err));
};

const handlerDeleteCard = (cardId, cardItem) => {
  openModal(popupDelete);

  buttonDelete.onclick = null;

  buttonDelete.onclick = function () {
    deleteCard(cardId)
      .then((res) => {
        cardItem.remove();
        closeModal(popupDelete);
      })
      .catch((err) => console.log(err));
  };
};

export const createCard = (
  cardItem,
  myId,
  handlerLikeCard,
  handlerCardView
) => {
  const newCard = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = newCard.querySelector('.card__image');
  const likeQuantity = newCard.querySelector('.card__like_quantity');
  const deleteButton = newCard.querySelector('.card__delete-button');
  const likeButton = newCard.querySelector('.card__like-button');
  const buttonDeleteExists = cardItem.owner._id === myId;
  const isLikeActive = cardItem.likes.some((like) => like._id === myId);

  newCard.querySelector('.card__title').textContent = cardItem.name;
  cardImage.src = cardItem.link;
  cardImage.alt = `Фотография места: ${cardItem.name}`;
  likeQuantity.textContent = cardItem.likes.length;

  if (buttonDeleteExists) {
    deleteButton.addEventListener('click', () =>
      handlerDeleteCard(cardItem._id, newCard)
    );
  } else {
    deleteButton.disable = true;
    deleteButton.classList.add('button_disabled');
  }

  if (isLikeActive) {
    likeButton.classList.add('card__like-button_is-active');
  }

  likeButton.addEventListener('click', () =>
    handlerLikeCard(cardItem._id, likeButton, likeQuantity)
  );

  cardImage.addEventListener('click', () =>
    handlerCardView(cardItem.name, cardItem.link)
  );

  return newCard;
};
