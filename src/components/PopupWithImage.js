import Popup from "../components/Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupElement.querySelector(".popup__element-foto");
    this._name = this._popupElement.querySelector(".popup__name-img");
  }
  /*Перезаписываем родительский метод и вставляем картинку с подписью */
  openPopup(name, link) {
    super.openPopup();
    this._image.src = link;
    this._image.alt = name;
    this._name.textContent = name;
  }
}
