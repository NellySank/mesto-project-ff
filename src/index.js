import './index.css';
import { createCard, deleteCard, handlerLikeCard } from './scripts/card.js';
import { openModal, closeModal } from './scripts/modal.js';
import {
  fetchCards,
  getUserInfo,
  setUserInfo,
  addNewCard,
  updateProfileImage,
} from './scripts/api.js';
import { enableValidation, clearValidation } from './scripts/validation.js';

// DOM узлы
const listCard = document.querySelector('.places__list');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupCardView = document.querySelector('.popup_type_image');
const popupEditImageProfile = document.querySelector('.popup_type_edit-image');
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
//форма обновления аватара
const formEditeImageProfile = document.forms['edit-image-profile'];
const linkImageInput = formEditeImageProfile.elements['edit-image-link'];
const profileImageElement = document.querySelector('.profile__image');

//насттройки валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

let myUserId = '';
let myAvatar = '';

const renderLoading = (isLoading, formElement) => {
  const buttonSubmit = formElement.querySelector('.popup__button');
  buttonSubmit.textContent = isLoading ? 'Сохранение...' : 'Сохранить';
};

// функция сохранения значений из формы в профиль
const handleFormEditProfileSubmit = (evt) => {
  evt.preventDefault();

  renderLoading(true, formEdit);

  //отправим запрос с новыми данными на сервер
  setUserInfo(nameInput.value, jobInput.value)
    .then((resultUserInfo) => {
      profileTitle.textContent = resultUserInfo.name;
      profileDescription.textContent = resultUserInfo.about;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(false, formEdit));

  closeModal(popupEdit);
};

//универсальная функция добавления карточки
const renderCard = (cardItem, myId, method = 'prepend') => {
  const cardElement = createCard(
    cardItem,
    myId,
    handlerLikeCard,
    handlerCardView
  );
  listCard[method](cardElement);
};

// функция сохранения карточки
const handleFormNewPlaceSubmit = (evt) => {
  evt.preventDefault();

  renderLoading(true, formNewPlace);

  addNewCard(placeNameInput.value, linkInput.value)
    .then((resultCard) => {
      if (resultCard._id) {
        closeModal(popupNewCard);
        //добавить карточку на страницу
        renderCard(resultCard, myUserId, 'prepend');

        //очищаем форму после добавления карточки
        placeNameInput.value = '';
        linkInput.value = '';
      }
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false, formNewPlace));
};

//функция сохранения аватара
const handleFormEditImageProfile = (evt) => {
  evt.preventDefault();

  renderLoading(true, formEditeImageProfile);

  updateProfileImage(linkImageInput.value)
    .then((res) => {
      updateAvatar(res.avatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(false, formEditeImageProfile));

  closeModal(popupEditImageProfile);
};

//обработчик открытия окна для просмотра карточки
const handlerCardView = (cardName, cardLink) => {
  popupImage.src = cardLink;
  popupImage.alt = cardName;
  popupCaption.textContent = cardName;
  openModal(popupCardView);
};

//функция обновление аватара
const updateAvatar = (imagePath) => {
  profileImageElement.style.backgroundImage = `url('${imagePath}')`;
};

//загрузка карточек и информации профиля
Promise.all([getUserInfo(), fetchCards()])
  .then(([resultUserInfo, resultCards]) => {
    // Обработка информации о пользователе
    profileTitle.textContent = resultUserInfo.name;
    profileDescription.textContent = resultUserInfo.about;
    myUserId = resultUserInfo._id;
    myAvatar = resultUserInfo.avatar;

    //обновление аватара
    updateAvatar(myAvatar);

    // Обработка карточек
    resultCards.forEach((item) => {
      renderCard(item, myUserId, 'append');
    });
  })
  .catch((err) => {
    console.log(err);
  });

// листенер на кнопку редактирования профиля
buttonEditProfile.addEventListener('click', function () {
  clearValidation(formEdit, validationConfig);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupEdit);
});

// листенер на кнопку добавления
buttonAddCard.addEventListener('click', () => {
  clearValidation(formNewPlace, validationConfig);
  openModal(popupNewCard);
});

// листенер на фото аватара
profileImageElement.addEventListener('click', () => {
  clearValidation(formEditeImageProfile, validationConfig);
  openModal(popupEditImageProfile);
});

// листенер на форму редактирования
formEdit.addEventListener('submit', handleFormEditProfileSubmit);

//листенер на добавление места
formNewPlace.addEventListener('submit', handleFormNewPlaceSubmit);

//листенер на обновление аватара
formEditeImageProfile.addEventListener('submit', handleFormEditImageProfile);

//добавим всем модальным окнам класс для плавного открывания
modals.forEach((modal) => {
  modal.classList.add('popup_is-animated');
});

//добавим листенеры валидации на все формы
enableValidation(validationConfig);
