// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

export const deleteCard = (cardItem) => {
  cardItem.remove();
};

export const handlerLikeCard = (likeButton) => {
  likeButton.classList.toggle('card__like-button_is-active');
};

export const createCard = (
  cardName,
  cardLink,
  deleteCard,
  handlerLikeCard,
  handlerCardView
) => {
  const newCard = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = newCard.querySelector('.card__image');

  newCard.querySelector('.card__title').textContent = cardName;
  cardImage.src = cardLink;
  cardImage.alt = `Фотография места: ${cardName}`;

  const deleteButton = newCard.querySelector('.card__delete-button');
  const likeButton = newCard.querySelector('.card__like-button');

  deleteButton.addEventListener('click', () => deleteCard(newCard));
  likeButton.addEventListener('click', () => handlerLikeCard(likeButton));
  cardImage.addEventListener('click', () =>
    handlerCardView(cardName, cardLink)
  );

  return newCard;
};
