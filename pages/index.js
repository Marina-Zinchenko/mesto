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
  buttonOpenPopupProfile,
  buttonOpenPopupMesto,
  nameInput,
  jobInput,
  nameInputMesto,
  urlInputMesto
} from "../scripts/utils/constants.js";
import initialCards from "../scripts/utils/cards.js";
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";

const profileValidator = new FormValidator(validationForm, popupElementProfile);
const validatorAddCard = new FormValidator(validationForm, popupElementMesto);
const userInfo = new UserInfo({
  profileNameSelector: ".profile__name",
  profileJobSelector: ".profile__about",
});
const popupProfile = new PopupWithForm(
  popupProfileSelector,
  popupFormProfile.addEventListener("submit", handleFormProfileSubmit)
);

const popupMesto = new PopupWithForm(
  popupMestoSelector,
  popupFormCreate.addEventListener("submit", submitFormMesto)
);
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
export function handleClickProfile() {
  popupProfile.openPopup();
  const input = userInfo.getUserInfo();
  nameInput.value = input.name;
  jobInput.value = input.job;
}

/*функция добавления новых данных в профиль из попап*/
export function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  const profileData = {
    name: nameInput.value,
    job: jobInput.value,
  };
  userInfo.setUserInfo(profileData);
  popupProfile.closePopup();
}

/*Открытие окна добавления карточки*/
export function handleClickMesto() {
  popupMesto.openPopup();
  popupMesto.reset;
}
/*Добавление новой карточки */
export function submitFormMesto(evt) {
  evt.preventDefault();
  const cardData = {
    name: nameInputMesto.value,
    link: urlInputMesto.value,
  };
  const newCard = creadCard(cardData);
  cardsFromAnArray.addItem(newCard);
  popupMesto.closePopup();
  evt.target.reset();
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
