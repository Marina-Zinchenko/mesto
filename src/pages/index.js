import './index.css';
import {
  validationForm,
  popupElementProfile,
  popupElementMesto,
  popupProfileSelector,
  popupFormProfile,
  popupMestoSelector,
  popupFormCreate,
  popupImageSelector,
  templateSelector,
  containerSelector,
  nameInput,
  jobInput,
  nameInputMesto,
  urlInputMesto
} from "../utils/constants.js";
import initialCards from "../utils/cards.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const buttonOpenPopupProfile = document.querySelector(
  ".profile__button-pen"
);
const buttonOpenPopupMesto = document.querySelector(".profile__add");

const profileValidator = new FormValidator(validationForm, popupElementProfile);
const validatorAddCard = new FormValidator(validationForm, popupElementMesto);
const userInfo = new UserInfo({
  profileNameSelector: ".profile__name",
  profileJobSelector: ".profile__about",
});
const popupProfile = new PopupWithForm(
  popupProfileSelector,
  handleFormProfileSubmit);

const popupMesto = new PopupWithForm(
  popupMestoSelector,
  submitFormMesto);
const popupImage = new PopupWithImage(popupImageSelector);
const creadCard = (item) => {
  const card = new Card(item, templateSelector, (data) => {
    popupImage.openPopup(data.name, data.link);
  });
  return card.generateCard();
};
/*Добавление карточек из массива*/
const cardsFromAnArray = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = creadCard(item);
      cardsFromAnArray.addItem(cardElement);
    },
  },
  containerSelector
);
/*Открытие окна редактирования профиля и копирование в него данных*/
function handleClickProfile() {
  popupProfile.openPopup();
  const dateInputProfile = userInfo.getUserInfo();
  nameInput.value = dateInputProfile.name;
  jobInput.value = dateInputProfile.job;
}

/*функция добавления новых данных в профиль из попап*/
function handleFormProfileSubmit() {
  const profileData = {
    name: nameInput.value,
    job: jobInput.value,
  };
  userInfo.setUserInfo(profileData);
  popupProfile.closePopup();
}
/*Открытие окна добавления карточки*/
function handleClickMesto() {
  popupMesto.openPopup();
}
/*Добавление новой карточки */
function submitFormMesto() {
  const cardData = {
    name: nameInputMesto.value,
    link: urlInputMesto.value,
  };
  const newCard = creadCard(cardData);
  cardsFromAnArray.addItem(newCard);
  popupMesto.closePopup();
}

/*Вызов функций */
profileValidator.enableValidation();
validatorAddCard.enableValidation();
popupProfile.setEventListeners();
popupMesto.setEventListeners();
popupImage.setEventListeners();
cardsFromAnArray.renderItems();
buttonOpenPopupProfile.addEventListener("click", handleClickProfile);
buttonOpenPopupMesto.addEventListener("click", handleClickMesto);
