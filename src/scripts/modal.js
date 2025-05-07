//обработчик закрытия окна по кнопке Escape
export const handlerKeydown = (evt) => {
  const openedPopup = document.querySelector('.popup_is-opened');

  if (openedPopup && evt.key === 'Escape') {
    closeModal(openedPopup);
    document.removeEventListener('keydown', handlerKeydown);
  }
};

//функция закрытия окна по оверлею
export const handlerClickOwerlay = (evt) => {
  const openedPopup = document.querySelector('.popup_is-opened');

  if (
    openedPopup &&
    (evt.target.classList.contains('popup__close') ||
      evt.target.classList.contains('popup_is-opened'))
  ) {
    closeModal(openedPopup);
    document.removeEventListener('keydown', handlerClickOwerlay);
  }
};

//метод открытия модального окна
export const openModal = (modalItem) => {
  modalItem.classList.add('popup_is-opened');
};

export const closeModal = (modalItem) => {
  modalItem.classList.remove('popup_is-opened');
};
