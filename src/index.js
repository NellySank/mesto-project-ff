import './index.css';
import { createCard, deleteCard, handlerLikeCard } from './scripts/cards.js';
import { openModal, closeModal } from './scripts/modal.js';
import { initialCards } from './scripts/initialCards.js';

// DOM узлы
const listCard = document.querySelector('.places__list');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const modals = document.querySelectorAll('.popup');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
//форма редактирования профиля
const formEdit = document.forms['edit-profile'];
const nameInput = formEdit.elements.name;
const jobInput = formEdit.elements.description;
//форма добавления места
const formNewPlace = document.forms['new-place'];
const placeNameInput = formNewPlace.elements['place-name'];
const linkInput = formNewPlace.elements.link;

//заполнение формы данными со страницы
const fillFormEditProfile = () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
};

//заполнение попап-карточки данными из формы
const fillPopupTypeImage = (cardItem) => {
  popupImage.src = cardItem.querySelector('.card__image').src;
  popupImage.alt = cardItem.querySelector('.card__image').alt;
  popupCaption.textContent = cardItem.querySelector('.card__title').textContent;
};

//общий обработчик для всех попапов
const handlerModal = (modalItem, cardItem) => {
  if (modalItem.classList.contains('popup_type_edit')) {
    fillFormEditProfile();
  } else if (modalItem.classList.contains('popup_type_image')) {
    fillPopupTypeImage(cardItem);
  }

  openModal(modalItem);
};

// функция сохранения значений из формы в профиль
const handleFormEditProfileSubmit = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closeModal(popupEdit);
};

//универсальная функция добавления карточки
const renderCard = (cardName, cardLink, method = 'prepend') => {
  const cardElement = createCard(
    cardName,
    cardLink,
    deleteCard,
    handlerLikeCard,
    handlerCardView
  );
  listCard[method](cardElement);
};

// функция сохранения карточки
const handleFormNewPlaceSubmit = (evt) => {
  evt.preventDefault();

  renderCard(placeNameInput.value, linkInput.value, 'prepend');

  closeModal(popupNewCard);

  //очищаем форму после добавления карточки
  placeNameInput.value = '';
  linkInput.value = '';
};

//обработчик открытия окна для просмотра карточки
const handlerCardView = (cardItem) => {
  const popupCardView = document.querySelector('.popup_type_image');
  handlerModal(popupCardView, cardItem);
};

// Вывести карточки на страницу
initialCards.forEach((item) => renderCard(item.name, item.link, 'append'));

// листенер на кнопку редактирования профиля
buttonEditProfile.addEventListener('click', () => handlerModal(popupEdit));

// листенер на кнопку добавления
buttonAddCard.addEventListener('click', () => handlerModal(popupNewCard));

// листенер на форму редактирования
formEdit.addEventListener('submit', handleFormEditProfileSubmit);

//листенер на добавление места
formNewPlace.addEventListener('submit', handleFormNewPlaceSubmit);

//добавим всем модальным окнам класс для плавного открывания
modals.forEach((modal) => {
  modal.classList.add('popup_is-animated');
});
