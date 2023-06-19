export const validationForm = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  activeButtonClass: "popup__button_valid",
  inactiveButtonClass: "popup__button_invalid",
  inputErrorClass: "popup__input_type_error",
};
/*Селекторы*/
export const popupProfileSelector = ".popup-profile";
export const popupMestoSelector = ".popup-mesto";
export const popupImageSelector = ".popup-img";
export const templateSelector = ".template";
export const containerSelector = ".element__items";
/*Переменные*/
export const popupElementProfile = document.querySelector(".popup-profile");
export const nameInput = popupElementProfile.querySelector(
  ".popup__input_type_name"
);
export const jobInput = popupElementProfile.querySelector(
  ".popup__input_type_job"
);
export const popupFormProfile =
  popupElementProfile.querySelector(".popup__form");
export const popupElementMesto = document.querySelector(".popup-mesto");
export const nameInputMesto = popupElementMesto.querySelector(
  ".popup__input_type_mesto-name"
);
export const urlInputMesto = popupElementMesto.querySelector(
  ".popup__input_type_url-img"
);
export const popupFormCreate = popupElementMesto.querySelector(".popup__form");

