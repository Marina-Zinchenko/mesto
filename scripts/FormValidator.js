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
  }
  /*Функция запускает валидацию*/
  enableValidation() {
    const forms = Array.from(document.querySelectorAll(this._formSelector));
    forms.forEach((form) => {
      form.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners(form);
    });
  }
  /*Вешаем слушателя на форму ввода*/
  _setEventListeners(form) {
    const formInputs = Array.from(form.querySelectorAll(this._inputSelector));
    const formButton = form.querySelector(this._submitButtonSelector);
    form.addEventListener("reset", () => {
      this._disableButton(formButton);
    });
    this._disableButton(formButton);
    formInputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState(formInputs, formButton);
      });
    });
  }
  /*Функция переключения состояния кнопки*/
  _toggleButtonState(formInputs, formButton) {
    if (this._hasInvalidInput(formInputs)) {
      this._disableButton(formButton);
    } else {
      this._enableButton(formButton);
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
  _hasInvalidInput(formInputs) {
    return formInputs.some((item) => {
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