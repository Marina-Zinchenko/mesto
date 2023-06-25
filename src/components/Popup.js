export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector(".popup__close");
  }
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.closePopup(document.querySelector(".popup_opened"));
    }
  };
  /*Открытие попап */
  openPopup() {
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }
  /*Закрытие попап */
  closePopup() {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  /*Обработчик события при закрытии попапа*/
  setEventListeners () {
    this._closeButton.addEventListener("click", () => {
      this.closePopup();
    });
    this._popupElement.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        this.closePopup(this._popupElement);
      }
      if (evt.target.classList.contains("popup__close")) {
        this.closePopup(this._popupElement);
      }
    });
  };
}
