import Popup from "../components/Popup.js";

export default class PopupWithDelete extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
		this._form = this._popupElement.querySelector('.popup__form');
	}

	submitCallback(del) {
		this._handleSubmit = del;
	}

	setEventListeners() {
		super.setEventListeners();
		this._form.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this._handleSubmit();
		});
	}
}
