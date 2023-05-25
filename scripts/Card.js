import { openPopup, popupElementImg } from "./utils.js";
class Card {
  constructor(data, templateSelector) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._like = data.like;
    this._delete = data.delete;
    this._templateSelector = templateSelector;
  }
  /*Копирование разметки template*/
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element__item")
      .cloneNode(true);
    return cardElement;
  }
  /*Функция добавления лайка*/
  _handleLikeButton = () => {
    this._elementLike.classList.toggle("element__like_active");
  };
  /*Функция удаления карточки*/
  _handleDeleteButton = () => {
    this._element.remove();
  };
  /*Открытие картинки*/
  _handleClickImgPopup = () => {
    openPopup(popupElementImg);
    document.querySelector(".popup__element-foto").src = this._link;
    document.querySelector(".popup__element-foto").alt = this._name;
    document.querySelector(".popup__name-img").textContent = this._name;
  };
  /*Обработчик событий внутри класса*/
  _setEventListeners() {
    this._elementLike.addEventListener("click", this._handleLikeButton);
    this._elementDelete.addEventListener("click", this._handleDeleteButton);
    this._elementImage.addEventListener("click", this._handleClickImgPopup);
  }
  /*Функция создания карточки*/
  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector(".element__foto");
    this._elementLike = this._element.querySelector(".element__like");
    this._elementDelete = this._element.querySelector(".element__dell");
    this._element.querySelector(".element__text").textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._setEventListeners();
    return this._element;
  }
}
export default Card;