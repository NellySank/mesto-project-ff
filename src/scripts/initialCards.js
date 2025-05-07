export const imgArkhyz = new URL(
  'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  import.meta.url
);
const imgChelyabinsk = new URL(
  'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  import.meta.url
);
const imgIvanovo = new URL(
  'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  import.meta.url
);
const imgKamchatka = new URL(
  'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  import.meta.url
);
const imgKholmogorsky = new URL(
  'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  import.meta.url
);
const imgBaikal = new URL(
  'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  import.meta.url
);

export const initialCards = [
  {
    name: 'Архыз',
    link: imgArkhyz,
  },
  {
    name: 'Челябинская область',
    link: imgChelyabinsk,
  },
  {
    name: 'Иваново',
    link: imgIvanovo,
  },
  {
    name: 'Камчатка',
    link: imgKamchatka,
  },
  {
    name: 'Холмогорский район',
    link: imgKholmogorsky,
  },
  {
    name: 'Байкал',
    link: imgBaikal,
  },
];
