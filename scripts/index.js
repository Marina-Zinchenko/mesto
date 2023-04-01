let profilElement = document.querySelector('.profile');
let popupElement = document.querySelector('.popup');
let popupContent = popupElement.querySelector('.popup__container');
let popupCloseButton = popupElement.querySelector('.popup__close');
let popupOpenButton = profilElement.querySelector('.profile__button-pen');
let popupSaveButton = popupElement.querySelector('.popup__save');
let profilName = profilElement.querySelector('.profile__name');
let profilJob = profilElement.querySelector('.profile__about');
let nameInput = popupElement.querySelector('.popup__input_type_name');
let jobInput = popupElement.querySelector('.popup__input_type_job');

function handleFormSubmit(evt) {
    evt.preventDefault();
    profilName.textContent = nameInput.value;
    profilJob.textContent = jobInput.value;
    closePopup();
};

function copyProfilEdit() {
    nameInput.value = profilName.textContent;
    jobInput.value = profilJob.textContent;
};

const openPopup = function () {
       copyProfilEdit();
       popupElement.classList.add('popup_opened');
};

const closePopup = function () {
    popupElement.classList.remove('popup_opened');
};

popupContent.addEventListener('submit', handleFormSubmit);
popupCloseButton.addEventListener('click', closePopup);
popupOpenButton.addEventListener('click', openPopup);


