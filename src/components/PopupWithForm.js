import Popup from "../components/Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSubmit) {
    super(popupSelector);
    this._functionSabmit = callbackSubmit;
    this._formPopup = this._popupElement.querySelector(".popup__form");
  }
  /*Собираем данные всех полей формы */
  _getInputValues() {
    this._inputsPopup = Array.from(
      this._formPopup.querySelector(".popup__input")
    );
    this._formDate = {};
    this._inputsPopup.forEach((input) => {
      this._formDate[input.name] = input.value;

      console.log("hi");
    });
    return this._formDate;
  }
  /*Сбрасываем форму при закрытии */
  closePopup() {
    this._formPopup.reset();
    super.closePopup();
  }
  /*Добавляем обработчик события форме */
  setEventListeners() {
    this._formPopup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._functionSabmit(this.setEventListeners());
    });
    super.setEventListeners();
  }
}
