const imgArkhyz = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg', import.meta.url);
const imgChelyabinsk = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg', import.meta.url);
const imgIvanovo = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg', import.meta.url);
const imgKamchatka = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg', import.meta.url);
const imgKholmogorsky = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg', import.meta.url);
const imgBaikal = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg', import.meta.url);

export const initialCards = [
  {
    name: 'Архыз',
    link: imgArkhyz,
  },
  {
    name: 'Челябинская область',
    link: imgChelyabinsk,
  },
  {
    name: 'Иваново',
    link: imgIvanovo,
  },
  {
    name: 'Камчатка',
    link: imgKamchatka,
  },
  {
    name: 'Холмогорский район',
    link: imgKholmogorsky,
  },
  {
    name: 'Байкал',
    link: imgBaikal,
  },
];

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

export const deleteCard = (cardItem) => {
  cardItem.remove();
};

export const handlerLikeCard = (cardItem) => {
  const likeButton = cardItem.querySelector('.card__like-button');
  likeButton.classList.toggle('card__like-button_is-active');
};

export const createCard = (cardName, cardLink, deleteCard, handlerLikeCard, handlerCardView) => {
  const newCard = cardTemplate.querySelector('.places__item').cloneNode(true);

  newCard.querySelector('.card__title').textContent = cardName;
  newCard.querySelector('.card__image').src = cardLink;
  newCard.querySelector('.card__image').alt = `Фотография места: ${cardName}`;

  const deleteButton = newCard.querySelector('.card__delete-button');
  const likeButton = newCard.querySelector('.card__like-button');
  const cardImage = newCard.querySelector('.card__image');

  deleteButton.addEventListener('click', () => deleteCard(newCard));
  likeButton.addEventListener('click', () => handlerLikeCard(newCard));
  cardImage.addEventListener('click', () => handlerCardView(newCard));

  return newCard;
};