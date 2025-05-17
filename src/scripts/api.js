const token = 'f990cb7e-1fb8-428d-9814-583728f45054';
const groupId = 'wff-cohort-38';

const config = {
  baseUrl: `https://nomoreparties.co/v1/${groupId}`,
  headers: {
    authorization: token,
    'Content-Type': 'application/json',
  },
};

const handleResponse = (result, errText) => {
  if (result.ok) {
    return result.json();
  } else {
    return Promise.reject(`${errText}: ${result.statusText}`);
  }
};

export const fetchCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => handleResponse(res, 'Ошибка загрузки карточек'));
};

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: {
      authorization: config.headers.authorization,
    },
  }).then((res) => handleResponse(res, 'Ошибка загрузки профиля'));
};

export const setUserInfo = (newName, newAbout) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: newName,
      about: newAbout,
    }),
  }).then((res) => handleResponse(res, 'Ошибка сохранения профиля'));
};

export const addNewCard = (cardName, cardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink,
    }),
  }).then((res) => handleResponse(res, 'Ошибка сохранения карточки'));
};

export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization,
    },
  }).then((res) => handleResponse(res, 'Ошибка удаления карточки'));
};

export const likeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: config.headers.authorization,
    },
  }).then((res) => handleResponse(res, 'Ошибка like карточки'));
};

export const dislikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization,
    },
  }).then((res) => handleResponse(res, 'Ошибка dislike карточки'));
};

export const updateProfileImage = (imageUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: imageUrl,
    }),
  }).then((res) => handleResponse(res, 'Ошибка обновления аватара профиля'));
};
