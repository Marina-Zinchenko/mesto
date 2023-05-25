import {
  openPopup,
  closePopup,
  popupElementProfile,
  popupElementMesto,
  popupElementImg,
} from "./utils.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import initialCards from "./cards.js";
const validationForm = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  activeButtonClass: "popup__button_valid",
  inactiveButtonClass: "popup__button_invalid",
  inputErrorClass: "popup__input_type_error",
};
const profileValidator = new FormValidator(validationForm, popupElementProfile);
const validatorAddCard = new FormValidator(validationForm, popupElementMesto);
/*элементы блока профиль*/
const profileElement = document.querySelector(".profile");
const profileName = profileElement.querySelector(".profile__name");
const profileJob = profileElement.querySelector(".profile__about");
/*Элементы карточек*/
const cardsElement = document.querySelector(".element");
const cardsContainer = cardsElement.querySelector(".element__items");
/*общие элементы попап*/
const popupList = document.querySelectorAll(".popup");
/*попап-элементы редактирования профиля*/
const buttonOpenPopupProfile = profileElement.querySelector(
  ".profile__button-pen"
);
const nameInput = popupElementProfile.querySelector(".popup__input_type_name");
const jobInput = popupElementProfile.querySelector(".popup__input_type_job");
const popupFormProfile = popupElementProfile.querySelector(".popup__form");
/*попап-элементы редактирования карточек*/
const buttonOpenPopupMesto = profileElement.querySelector(".profile__add");
const nameInputMesto = popupElementMesto.querySelector(
  ".popup__input_type_mesto-name"
);
const urlInputMesto = popupElementMesto.querySelector(
  ".popup__input_type_url-img"
);
const popupFormCreate = popupElementMesto.querySelector(".popup__form");
/*функция добавления новых данных в профиль из попап*/
function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupElementProfile);
}
/*функция копирования данных из профиля*/
function fillProfileInputs() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
popupList.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});
/*Перебор массива и добавление карточек*/
initialCards.forEach(renderItem);
/*Функция создания карточки*/
function renderItem(item) {
  const card = new Card(item, ".template");
  cardsContainer.prepend(card.generateCard(item));
}
/*Открытие окна редактирования профиля*/
function handleClickProfile() {
  fillProfileInputs();
  openPopup(popupElementProfile);
}
/*Открытие окна добавления карточки*/
function handleClickMesto() {
  openPopup(popupElementMesto);
  popupElementMesto.reset;
}
function submitFormMesto(evt) {
  evt.preventDefault();
  const cardData = {
    name: nameInputMesto.value,
    link: urlInputMesto.value,
  };
  renderItem(cardData);
  closePopup(popupElementMesto);
  evt.target.reset();
}
/*Вызов функций */
profileValidator.enableValidation();
validatorAddCard.enableValidation();
popupFormCreate.addEventListener("submit", submitFormMesto);
popupFormProfile.addEventListener("submit", handleFormProfileSubmit);
buttonOpenPopupProfile.addEventListener("click", handleClickProfile);
buttonOpenPopupMesto.addEventListener("click", handleClickMesto);
