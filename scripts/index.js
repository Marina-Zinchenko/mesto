/*элементы блока профиль*/
const profileElement = document.querySelector('.profile');
const profileName = profileElement.querySelector('.profile__name');
const profileJob = profileElement.querySelector('.profile__about');
/*Элементы карточек*/
const cardsElement = document.querySelector('.element');
const cardsContainer = cardsElement.querySelector('.element__items');
/*общие элементы попап*/
const popupList = document.querySelectorAll('.popup');
/*попап-элементы редактирования профиля*/
const popupElementProfile = document.querySelector('.popup-profile');
const buttonOpenPopupProfile = profileElement.querySelector('.profile__button-pen');
const nameInput = popupElementProfile.querySelector('.popup__input_type_name');
const jobInput = popupElementProfile.querySelector('.popup__input_type_job');
const popupSaveButton = popupElementProfile.querySelector('.popup__button_save');
const buttonClosePopupProfile = popupElementProfile.querySelector('.popup__close');
const popupFormProfile = popupElementProfile.querySelector('.popup__form');
/*попап-элементы редактирования карточек*/
const popupElementMesto = document.querySelector('.popup-mesto');
const buttonOpenPopupMesto = profileElement.querySelector('.profile__add');
const nameInputMesto = popupElementMesto.querySelector('.popup__input_type_mesto-name');
const urlInputMesto = popupElementMesto.querySelector('.popup__input_type_url-img');
const popupFormCreate = popupElementMesto.querySelector('.popup__form');
const popupButtonCreateCards = popupElementMesto.querySelector('.popup__button_create');
const buttonClosePopupMesto = popupElementMesto.querySelector('.popup__close');
/*попап-элементы редактирования увеличенного фото*/
const popupElementImg = document.querySelector('.popup-img');
const buttonOpenPopupImg = cardsContainer.querySelector('.element__link-img');
const nameImg = popupElementImg.querySelector('.popup__title');
const buttonClosePopupImg = popupElementImg.querySelector('.popup__close');
const popupElFoto = popupElementImg.querySelector('.popup__element-foto');
const popupElName = popupElementImg.querySelector('.popup__name-img');
const itemTemplate = document.querySelector('.template').content;
/*функция добавления новых данных в профиль из попап*/
function handleFormProfileSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupElementProfile);
};
/*функция копирования данных из профиля*/
function fillProfileInputs() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
};
/*функция открытия попап*/
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
};
/*функция закрытия попап*/
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape); 
  };

popupList.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
          closePopup(popup)
        }
    })
})

/*функция добавления карточек из массива*/
initialCards.forEach(renderItem);

function renderItem(element) {
    cardsContainer.append(createCard(element));
};
/*функция создания карточек*/
function createCard(card) {
    const cardObj = itemTemplate.querySelector('.element__item').cloneNode(true);
    const imgElement = cardObj.querySelector('.element__foto');
    const itemNameMesto = cardObj.querySelector('.element__text');
    const likeButton = cardObj.querySelector('.element__like');
    const buttonDeleteCard = cardObj.querySelector('.element__dell');
    itemNameMesto.textContent = card.name;
    imgElement.src = card.link;
    imgElement.alt = card.name;

    function handleLikeButton(evt) {
        evt.target.classList.toggle('element__like_active');
    };

    function handleDelete(evt) {
        const card = evt.target.closest('.element__item');
        card.remove();
    };
    imgElement.addEventListener('click', () => {
        popupElFoto.src = card.link;
        popupElFoto.alt = card.name;
        popupElName.textContent = card.name;
        openPopup(popupElementImg);
    });
    likeButton.addEventListener('click', handleLikeButton);
    buttonDeleteCard.addEventListener('click', handleDelete);
    return cardObj;
};

popupFormCreate.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const cardData = {
        name: nameInputMesto.value,
        link: urlInputMesto.value
    };
    cardsContainer.prepend(createCard(cardData));
    closePopup(popupElementMesto);
    evt.target.reset();
});

function handleClickProfile() {
    fillProfileInputs();
    openPopup(popupElementProfile);
};

function handleClickMesto() {
    openPopup(popupElementMesto);
    popupElementMesto.reset;
};

function handleClickImg() {
    openPopup(popupElementImg);
};
/*функция закрытия модульного окна при нажатии Esc*/
function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
    }
};
/*Вызов функций */
popupFormProfile.addEventListener('submit', handleFormProfileSubmit);
buttonOpenPopupProfile.addEventListener('click', handleClickProfile);
buttonOpenPopupMesto.addEventListener('click', handleClickMesto);
