/*элементы блока профиль*/
const profilElement = document.querySelector('.profile');
let profilName = profilElement.querySelector('.profile__name');
let profilJob = profilElement.querySelector('.profile__about');
/*Элементы карточек*/
const cardsElement = document.querySelector('.element');
const cardList = cardsElement.querySelector('.element__items');
const itemImg = cardsElement.querySelector('.element__link-img');
const itemNameMesto = cardsElement.querySelector('.element__text');
/*общие элементы попап*/
const popupElement = document.querySelectorAll('.popup');
const popupCloseButton = document.querySelectorAll('.popup__close');
/*попап-элементы редактирования профиля*/
const popupElementProfile = document.querySelector('.popup-profile');
let buttonOpenPopupProfile = profilElement.querySelector('.profile__button-pen');
let nameInput = popupElementProfile.querySelector('.popup__input_type_name');
let jobInput = popupElementProfile.querySelector('.popup__input_type_job');
let popupSaveButton = popupElementProfile.querySelector('.popup__save');
const buttonClosePopupProfile = popupElementProfile.querySelector('.popup__close');
const contentPopupProfile = popupElementProfile.querySelector('.popup__container'); 
/*попап-элементы редактирования карточек*/
const popupElementMesto = document.querySelector('.popup-mesto');
let buttonOpenPopupMesto= profilElement.querySelector('.profile__add');
let nameInputMesto = popupElementMesto.querySelector('.popup__input_type_mesto-name');
let urlInputMesto = popupElementMesto.querySelector('.popup__input_type_url-img');
const popupFormCreate = popupElementMesto.querySelector('.popup__form');
let popupButtonCreateCards = popupElementMesto.querySelector('.popup__create');
const buttonClosePopupMesto = popupElementMesto.querySelector('.popup__close');
/*попап-элементы редактирования увеличенного фото*/
const popupElementImg = document.querySelector('.popup-img');
const buttonOpenPopupImg = cardList.querySelector('.element__link-img');
const nameImg = popupElementImg.querySelector('.popup__title');
const buttonClosePopupImg = popupElementImg.querySelector('.popup__close');
const itemTemplate = document.querySelector('.template').content;

/*массив из задания*/
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 
/*функция добавления новых данных в профиль из попап*/
function handleFormSubmit(evt) {
  evt.preventDefault();
  profilName.textContent = nameInput.value;
  profilJob.textContent = jobInput.value;
  closePopup(popupElementProfile);
};
/*функция копирования данных из профиля*/
function copyProfilEdit() {
  nameInput.value = profilName.textContent;
  jobInput.value = profilJob.textContent;
};


/*функция открытия попап*/
function openPopap(popup) {
  popup.classList.add('popup_opened');
};
/*функция закрытия попап*/
function closePopup (popup) {
  popup.classList.remove('popup_opened');
};

/*функция добавления карточек из массива*/
initialCards.forEach(renderItem);
  function renderItem (element) {
  createCard(element);
  cardList.append(createCard(element));
  console.log(renderItem);
};
/*функция создания карточек*/
function createCard(card) {
  const cardObj = itemTemplate.querySelector('.element__item').cloneNode(true);
  const imgElement = cardObj.querySelector('.element__foto');
  const itemNameMesto = cardObj.querySelector('.element__text');
  const likeButton = cardObj.querySelector('.element__like');
  const buttonDellCard = cardObj.querySelector('.element__dell');

    itemNameMesto.textContent = card.name;
    imgElement.src = card.link;

    function likeActive(evt) {
      evt.target.classList.toggle('element__like_active');
      };
    function handleDelete(evt) {
      const card = evt.target.closest('.element__item');
      card.remove();
      };

  imgElement.addEventListener('click', () => {
    const popupElFoto = popupElementImg.querySelector('.popup__element-foto');
    const popupElName = popupElementImg.querySelector('.popup__name-img');
    popupElFoto.src = card.link;
    popupElName.textContent = card.name;
    openPopap(popupElementImg);
  });
  likeButton.addEventListener('click', likeActive);
  buttonDellCard.addEventListener('click', handleDelete);
  return cardObj;
  };

 popupFormCreate.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const arrCard = {name: nameInputMesto.value, link: urlInputMesto.value};
  cardList.prepend(createCard(arrCard));
  closePopup(popupElementMesto);
  evt.target.reset();
});


function handleClickProfile () {
  copyProfilEdit();
  openPopap(popupElementProfile);
};

function closeClickProfile () {
  closePopup(popupElementProfile);
};

function handleClickMesto () {
  openPopap(popupElementMesto);
};
function closeClickMesto () {
  closePopup(popupElementMesto);
  nameInputMesto.value = '';
  urlInputMesto.value = '';
};

function handleClickImg () {
  openPopap(popupElementImg);
};
function closeClickImg () {
  closePopup(popupElementImg);
};

/*Вызов функций */
popupButtonCreateCards.addEventListener('click', createCard);
contentPopupProfile.addEventListener('submit', handleFormSubmit);
buttonOpenPopupProfile.addEventListener('click', handleClickProfile);
buttonOpenPopupMesto.addEventListener('click', handleClickMesto);
buttonClosePopupProfile.addEventListener('click', closeClickProfile);
buttonClosePopupMesto.addEventListener('click', closeClickMesto);
buttonClosePopupImg.addEventListener('click', closeClickImg);
