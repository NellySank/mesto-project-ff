// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const listCard = document.querySelector('.places__list')

// @todo: Функция создания карточки
const AddCard = (cardName, cardLink, deleteCard) => {
  const newCard = cardTemplate.querySelector('.places__item').cloneNode(true);

  newCard.querySelector('.card__title').textContent = cardName;
  newCard.querySelector('.card__image').src = cardLink;

  const deleteButton = newCard.querySelector('.card__delete-button');

  deleteButton.addEventListener('click', function (evt) {
    deleteCard(evt.target);
  });

  return newCard;
}

// @todo: Функция удаления карточки
const deleteCard = (buttonItem) => {
  const ParentItem = buttonItem.closest('.places__item');
  ParentItem.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(
  function (item) {
    const itemCard = AddCard(item.name, item.link, deleteCard);
    listCard.append(itemCard);
  });