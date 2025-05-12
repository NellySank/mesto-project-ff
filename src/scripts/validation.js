const showInputError = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass,
  errorMessage
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  const messageTooShort =
    'Минимальное количество символов: 2. Длина текста сейчас: 1 символ.';
  const formName = formElement.getAttribute('name');

  if (!inputElement.validity.valid) {
    let errorMessage = '';

    // Общие проверки для обеих форм
    if (inputElement.validity.valueMissing) {
      errorMessage = 'Вы пропустили это поле';
    } else if (inputElement.validity.patternMismatch) {
      errorMessage = inputElement.dataset.errorMessage;
      // свои проверки для формы Нового места
    } else if (formName === 'new-place' || formName === 'edit-image-profile') {
      if (
        inputElement.validity.typeMismatch &&
        (inputElement.name === 'link' ||
          inputElement.name === 'edit-image-link')
      ) {
        errorMessage = 'Введите адрес сайта';
      } else if (
        inputElement.name === 'place-name' &&
        inputElement.validity.tooShort
      ) {
        errorMessage = messageTooShort;
      } else {
        errorMessage = inputElement.validity.errorMessage;
      }
      // свои проверки для формы Редактирования профиля
    } else if (formName === 'edit-profile' && inputElement.validity.tooShort) {
      errorMessage = messageTooShort;
    } else {
      errorMessage = inputElement.validity.errorMessage;
    }

    // Показываем ошибку
    showInputError(
      formElement,
      inputElement,
      inputErrorClass,
      errorClass,
      errorMessage
    );
  } else {
    // Если всё валидно, скрываем ошибки
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

// устанавливаем листенеры валидации на все попапы
export const enableValidation = (validationConfig) => {
  const {
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass,
  } = validationConfig;

  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(
          formElement,
          inputElement,
          inputErrorClass,
          errorClass
        );
        toggleButtonState(inputList, buttonElement, inactiveButtonClass);
      });
    });
  });
};

// очистка ошибок валидации
export const clearValidation = (formElement, validationConfig) => {
  const { inputSelector, inputErrorClass, errorClass } = validationConfig;

  const inputList = Array.from(formElement.querySelectorAll(inputSelector));

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  });
};
