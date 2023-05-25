export const popupElementProfile = document.querySelector(".popup-profile");
export const popupElementMesto = document.querySelector(".popup-mesto");
export const popupElementImg = document.querySelector(".popup-img");
/*функция открытия попап*/
export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}
/*функция закрытия попап*/
export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}
/*функция закрытия модульного окна при нажатии Esc*/
function closeByEscape(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
}
