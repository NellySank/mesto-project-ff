//обработчик закрытия окна по кнопке Escape
export const handlerKeydown = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
};

//функция закрытия окна по оверлею
export const handlerClickOwerlay = (evt) => {
  if (
    evt.target.classList.contains('popup__close') ||
    evt.target.classList.contains('popup_is-opened')
  ) {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
};

//метод открытия модального окна
export const openModal = (modalItem) => {
  modalItem.classList.add('popup_is-opened');
  document.addEventListener('keydown', handlerKeydown);
  modalItem.addEventListener('click', handlerClickOwerlay);
};

export const closeModal = (modalItem) => {
  modalItem.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handlerKeydown);
  modalItem.removeEventListener('keydown', handlerClickOwerlay);
};
