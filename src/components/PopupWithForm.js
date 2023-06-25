import Popup from "../components/Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, { callbackSubmit }) {
    super(popupSelector);
    this._functionSabmit = callbackSubmit;
    this._formPopup = this._popupElement.querySelector(".popup__form");
  }
  /*Собираем данные всех полей формы */
  _getInputValues() {
    this._inputsPopup = Array.from(
      this._formPopup.querySelectorAll(".popup__input")
    );
    this._formDate = {};
    this._inputsPopup.forEach((input) => {
      this._formDate[input.name] = input.value;
    });
    return this._formDate;
  }
   /*Сбрасываем форму при закрытии */
  closePopup() {
    super.closePopup();
    this._formPopup.reset();
  }
  /*Добавляем обработчик события форме */
  setEventListeners() {
    super.setEventListeners();
    this._formPopup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._functionSabmit(this._getInputValues());
    });   
  }
}
