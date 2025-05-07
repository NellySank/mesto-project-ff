import './index.css';
import {
  initialCards,
  createCard,
  deleteCard,
  handlerLikeCard,
} from './scripts/cards.js';
import {
  openModal,
  closeModal,
  handlerClickOwerlay,
  handlerKeydown,
} from './scripts/modal.js';

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
const formEdit = document.querySelector('form[name="edit-profile"]');
const nameInput = formEdit.elements.name;
const jobInput = formEdit.elements.description;
//форма добавления места
const formNewPlace = document.querySelector('form[name="new-place"]');
const placeNameInput = formNewPlace.querySelector('input[name="place-name"]');
const linkInput = formNewPlace.querySelector('input[name="link"]');

const handlerModal = (modalItem, cardItem) => {
  if (modalItem.classList.contains('popup_type_edit')) {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
  } else if (modalItem.classList.contains('popup_type_new-card')) {
    placeNameInput.value = '';
    linkInput.value = '';
  } else if (modalItem.classList.contains('popup_type_image')) {
    popupImage.src = cardItem.querySelector('.card__image').src;
    popupImage.alt = cardItem.querySelector('.card__image').alt;
    popupCaption.textContent =
      cardItem.querySelector('.card__title').textContent;
  }

  openModal(modalItem);
  document.addEventListener('keydown', handlerKeydown);
};

// функция сохранения значений из формы в профиль
const handleFormEditProfileSubmit = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  const openedPopup = document.querySelector('.popup_is-opened');
  closeModal(openedPopup);
};

// функция сохранения карточки
const handleFormNewPlaceSubmit = (evt) => {
  evt.preventDefault();

  const itemCard = createCard(
    placeNameInput.value,
    linkInput.value,
    deleteCard,
    handlerLikeCard,
    handlerCardView
  );
  const listCard = document.querySelector('.places__list');
  listCard.prepend(itemCard);

  const openedPopup = document.querySelector('.popup_is-opened');
  closeModal(openedPopup);
};

//обработчик открытия окна для просмотра карточки
const handlerCardView = (cardItem) => {
  const popupCardView = document.querySelector('.popup_type_image');
  handlerModal(popupCardView, cardItem);
};

// Вывести карточки на страницу
initialCards.forEach((item) => {
  const itemCard = createCard(
    item.name,
    item.link,
    deleteCard,
    handlerLikeCard,
    handlerCardView
  );
  listCard.append(itemCard);
});

// листенер на кнопку редактирования профиля
buttonEditProfile.addEventListener('click', () => handlerModal(popupEdit));

// листенер на кнопку добавления
buttonAddCard.addEventListener('click', () => handlerModal(popupNewCard));

// листенер на форму редактирования
formEdit.addEventListener('submit', handleFormEditProfileSubmit);

//листенер на добавление места
formNewPlace.addEventListener('submit', handleFormNewPlaceSubmit);

//добавление листенеров на все модальные окна для закрытия по кнопке или за пределами
modals.forEach((modal) => {
  modal.addEventListener('click', handlerClickOwerlay);
});

// добавление листенеров на нажатие кнопки ESC
modals.forEach((modal) => {
  modal.addEventListener('keydown', handlerKeydown);
});

//добавим всем модальным окнам класс для плавного открывания
modals.forEach((modal) => {
  modal.classList.add('popup_is-animated');
});