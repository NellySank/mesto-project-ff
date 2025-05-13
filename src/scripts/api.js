const token = 'f990cb7e-1fb8-428d-9814-583728f45054';
const groupId = 'wff-cohort-38';

const config = {
  baseUrl: `https://nomoreparties.co/v1/${groupId}`,
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
}

export const fetchCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка загрузки карточек: ${res.statusText}`);
    }
  });
};

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: {
      authorization: config.headers.authorization,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка загрузки профиля: ${res.statusText}`);
    }
  });
};

export const setUserInfo = (newName, newAbout) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: newName,
      about: newAbout,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка сохранения профиля: ${res.statusText}`);
    }
  });
};

export const addNewCard = (cardName, cardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка сохранения карточки: ${res.statusText}`);
    }
  });
};

export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка удаления карточки: ${res.statusText}`);
    }
  });
};

export const likeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: config.headers.authorization,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка like карточки: ${res.statusText}`);
    }
  });
};

export const dislikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка dislike карточки: ${res.statusText}`);
    }
  });
};

export const updateProfileImage = (imageUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: imageUrl,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(
        `Ошибка обновления аватара профиля: ${res.statusText}`
      );
    }
  });
};
