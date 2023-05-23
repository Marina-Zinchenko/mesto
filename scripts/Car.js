import initialCards from "./cards.js"
const popupElement = document.querySelector(".popup-img");
export default class Card {
constructor(data, templateSelector,  handleClickImg){
  this._data = data;
  this._name = data.name;
  this._link = data.link;
  this._like = data.like;
  this._delete = data.delete;
  this._handleClickImg =  handleClickImg;
  this._templateSelector = templateSelector;
}
_getTemplate() {
  const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element__item')
    .cloneNode(true);

  return cardElement;
}

_handleLikeButton = () => {
  this._elementLike.classList.toggle("element__like_active");
}

_handleDeleteButton = () => {
  this._element.remove();
}

_handleClickImgPopup = () => {
  this._handleOpenPopup(this._data);
  this._element.src = this._link;
  this._elementImage.alt = this._name;
}


_handleOpenPopup() {
  console.log('k');
  document.querySelector('.popup-img').classList.add('popup_opened');
}

_handleClosePopup() {
  this._elementImage.src = '';
  popupElement.classList.remove('popup_opened');
}
/*
popupList.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});*/



_setEventListeners() {
  this._elementLike.addEventListener('click', this._handleLikeButton);
  this._elementDelete.addEventListener('click', this._handleDeleteButton);
  this._elementImage.addEventListener('click', this._handleClickImgPopup);
 // this._element.addEventListener('click', () => {
   //this._handleOpenPopup();

  };
  
generateCard() {
  this._element = this._getTemplate();
  this._elementImage = this._element.querySelector('.element__foto');
  this._elementLike = this._element.querySelector('.element__like');
  this._elementDelete = this._element.querySelector('.element__dell');
  this._element.querySelector('.element__text').textContent = this._name;
  this._elementImage.src = this._link;
  this._elementImage.alt = this._name;
  this._setEventListeners(); 
  return this._element;
} 
addCard(card){
  this._container.append(card);
}

}

initialCards.forEach((item) => {
  const card = new Card(item, '.template');
  const cardElement = card.generateCard();

  // Добавляем в DOM
  document.querySelector('.element__items').append(cardElement);
});
/*
 


_handleOpenPopup() {
  popupImage.src = this._image;
  popupElement.classList.add('popup_is-opened');
} 
_handleClosePopup() {
  popupImage.src = '';
  popupElement.classList.remove('popup_is-opened');
} 


  popupCloseButton.addEventListener('click', () => {
    this._handleClosePopup();
  });
} 
  
  
}
*/
