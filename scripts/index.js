// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const listCard = document.querySelector('.places__list');

// @todo: Функция создания карточки
const createCard = (cardName, cardLink, deleteCard) => {
  const newCard = cardTemplate.querySelector('.places__item').cloneNode(true);

  newCard.querySelector('.card__title').textContent = cardName;
  newCard.querySelector('.card__image').src = cardLink;
  newCard.querySelector('.card__image').alt = `Фотография места: ${cardName}`;

  const deleteButton = newCard.querySelector('.card__delete-button');

  deleteButton.addEventListener('click', () => deleteCard(newCard));

  return newCard;
};

// @todo: Функция удаления карточки
const deleteCard = (cardItem) => {
  cardItem.remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  const itemCard = createCard(item.name, item.link, deleteCard);
  listCard.append(itemCard);
});
