class FormValidator {
  constructor(validationForm, elementForm) {
    this.validationForm = validationForm;
    this._formSelector = validationForm.formSelector;
    this._inputSelector = validationForm.inputSelector;
    this._submitButtonSelector = validationForm.submitButtonSelector;
    this._activeButtonClass = validationForm.activeButtonClass;
    this._inactiveButtonClass = validationForm.inactiveButtonClass;
    this._inputErrorClass = validationForm.inputErrorClass;
    this._elementForm = elementForm;
    this._formInputs = Array.from(
      elementForm.querySelectorAll(this._inputSelector)
    );
    this._formButton = elementForm.querySelector(this._submitButtonSelector);
  }
  /*Функция запускает валидацию*/
  enableValidation() {
    this._setEventListeners();
  }
  /*Вешаем слушателя на форму ввода*/
  _setEventListeners() {
    this._elementForm.addEventListener("reset", () => {
      this._disableButton(this._formButton);
    });
    this._disableButton(this._formButton);
    this._formInputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState(this._formInputs, this._formButton);
      });
    });
  }
  /*Функция переключения состояния кнопки*/
  _toggleButtonState() {
    if (this._hasInvalidInput(this._formInputs)) {
      this._disableButton(this._formButton);
    } else {
      this._enableButton(this._formButton);
    }
  }
  /*Вывод ошибки в случае не валидности формы ввода*/
  _checkInputValidity(input) {
    const errorContanier = document.querySelector(`#${input.id}-error`);
    const errorInput = document.querySelector(`#${input.id}`);
    if (input.checkValidity()) {
      errorContanier.textContent = "";
      errorInput.classList.remove(this._inputErrorClass);
    } else {
      errorContanier.textContent = input.validationMessage;
      errorInput.classList.add(this._inputErrorClass);
    }
  }
  /*Проверяем введенные данные на валидность*/
  _hasInvalidInput() {
    return this._formInputs.some((item) => {
      return !item.validity.valid;
    });
  }
  /*Активация кнопки*/
  _enableButton(button) {
    button.classList.remove(this._inactiveButtonClass);
    button.classList.add(this._activeButtonClass);
    button.removeAttribute("disabled");
  }
  /*Деактивация кнопки*/
  _disableButton(button) {
    button.classList.add(this._inactiveButtonClass);
    button.classList.remove(this._activeButtonClass);
    button.setAttribute("disabled", "");
  }
}
export default FormValidator;
