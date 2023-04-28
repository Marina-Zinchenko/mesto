const validationForm = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	activeButtonClass: 'popup__button_valid',
	inactiveButtonClass: 'popup__button_invalid',
	inputErrorClass: 'popup__input_type_error'
};
/*ф-ция запускает валидацию*/
const enableValidation = (
	{
		formSelector,
		...rest
	}) =>
	{
		const forms = Array.from(document.querySelectorAll(formSelector))
		forms.forEach(form =>
		{
			form.addEventListener('submit', (evt) =>
			{
				evt.preventDefault();
			})
			setEventListeners(form, rest)
		})
	}
	/*вешаем слушателя на форму ввода*/
const setEventListeners = (form,
	{
		inputSelector,
		submitButtonSelector,
		...rest
	}) =>
	{
		const formInputs = Array.from(form.querySelectorAll(inputSelector));
		const formButton = form.querySelector(submitButtonSelector);
		disableButton(formButton, rest);
			formInputs.forEach(input =>
		{
			input.addEventListener('input', () =>
			{
				checkInputValidity(input);
				toggleButtonState(formInputs, formButton, rest);
				form.addEventListener('reset', () => {
					disableButton(formButton, rest);
				});
			});
		})
	}
	function toggleButtonState(formInputs, formButton, rest) {
		if (hasInvalidInput(formInputs))
		{
			disableButton(formButton, rest)
		}
		else
		{
			enableButton(formButton, rest)
		}};
	/*проверка инпута и вывод ошибки в случае не валидности*/
function checkInputValidity (input) {
		const errorContanier = document.querySelector(`#${input.id}-error`);
		const errorInput = document.querySelector(`#${input.id}`);
		if (input.checkValidity())
		{
			errorContanier.textContent = '';
			errorInput.classList.remove('popup__input_type_error');
		}
		else
		{
			errorContanier.textContent = input.validationMessage;
			errorInput.classList.add('popup__input_type_error');
		}

	} 
	/*проверка на валидность*/
function hasInvalidInput(formInputs)
{
	return formInputs.some((item) =>
	{
		return !item.validity.valid;
	})
}
/* делаем кнопку активной*/
function enableButton(button,
{
	activeButtonClass,
	inactiveButtonClass,
})
{
	button.classList.remove(inactiveButtonClass);
	button.classList.add(activeButtonClass);
	button.removeAttribute('disabled');
}
/* делаем кнопку не активной*/
function disableButton(button,
{
	activeButtonClass,
	inactiveButtonClass,
})
{
	button.classList.add(inactiveButtonClass);
	button.classList.remove(activeButtonClass);
	button.setAttribute('disabled', '');
}
enableValidation(validationForm);

