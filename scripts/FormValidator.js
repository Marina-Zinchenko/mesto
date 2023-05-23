class FormValidator {
  constructor(validationForm, elementForm){
    this._validationForm = validationForm;
    this._formSelector = validationForm.formSelector;
    this._inputSelector = validationForm.inputSelector;
    this._submitButtonSelector = validationForm.submitButtonSelector;
    this._activeButtonClass = validationForm.activeButtonClass;
    this._inactiveButtonClass = validationForm.inactiveButtonClass;
    this._inputErrorClass = validationForm.inputErrorClass;
    this._elementForm = elementForm;
  }
  /*ф-ция запускает валидацию*/
  enableValidation() {
    const forms = Array.from(document.querySelectorAll(this._formSelector));
    forms.forEach((form) => {
      form.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners(form);
    });
  };
/*вешаем слушателя на форму ввода*/
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
};
_toggleButtonState(formInputs, formButton) {
  if (this._hasInvalidInput(formInputs)) {
    this._disableButton(formButton);
  } else {
    this._enableButton(formButton);
  }
}
/*проверка инпута и вывод ошибки в случае не валидности*/
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
/*проверка на валидность*/
_hasInvalidInput(formInputs) {
  return formInputs.some((item) => {
    return !item.validity.valid;
  });
}
/* делаем кнопку активной*/*
_enableButton(button) {
  button.classList.add(this._activeButtonClass);
  button.classList.remove(this._inactiveButtonClass);
  button.removeAttribute("disabled");
  console.log('enb');
}
/* делаем кнопку не активной*/
_disableButton(button) {
  button.classList.add(this._inactiveButtonClass);
  button.classList.remove(this._activeButtonClass);
  button.setAttribute("disabled", "");
}

}
//this.enableValidation(validationForm);
export default FormValidator;


/*проверка инпута и вывод ошибки в случае не валидности*//*
function checkInputValidity(input) {
  const errorContanier = document.querySelector(`#${input.id}-error`);
  const errorInput = document.querySelector(`#${input.id}`);
  if (input.checkValidity()) {
    errorContanier.textContent = "";
    errorInput.classList.remove(validationForm.inputErrorClass);
  } else {
    errorContanier.textContent = input.validationMessage;
    errorInput.classList.add(validationForm.inputErrorClass);
  }
}
/*проверка на валидность*//*
function hasInvalidInput(formInputs) {
  return formInputs.some((item) => {
    return !item.validity.valid;
  });
}
/* делаем кнопку активной*//*
function enableButton(button, { activeButtonClass, inactiveButtonClass }) {
  button.classList.remove(inactiveButtonClass);
  button.classList.add(activeButtonClass);
  button.removeAttribute("disabled");
}
/* делаем кнопку не активной*//*
function disableButton(button, { activeButtonClass, inactiveButtonClass }) {
  button.classList.add(inactiveButtonClass);
  button.classList.remove(activeButtonClass);
  button.setAttribute("disabled", "");
}
enableValidation(validationForm);
*/