class Card {
  constructor(
    {
      data,
      handleCardClick,
      handleDeleteClick,
      handleSetLike,
      handleDeleteLike,
    },
    templateSelector,
    userId
  ) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleSetLike = handleSetLike;
    this._handleDeleteLike = handleDeleteLike;
    this._handleDeleteClick = handleDeleteClick;
  }
  /*Копирование разметки template*/
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element__item")
      .cloneNode(true);
    return cardElement;
  }

  /*Функция создания карточки*/
  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector(".element__foto");
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementLike = this._element.querySelector(".element__like");
    this._elementDelete = this._element.querySelector(".element__dell");
    this._elementCounter = this._element.querySelector(".element__counterlike");
    this._elementCounter.textContent = this._likes.length;
    this._element.querySelector(".element__text").textContent = this._name;

    if (this._ownerId !== this._userId) {
      this._elementDelete.remove();
    }
    this._checkLikedState();
    this._setEventListeners();
    return this._element;
  }

  /*Функция добавления лайка*/
  handleLike(data) {
    this._likes = data.likes;
    this._elementCounter.textContent = this._likes.length;
    this._elementLike.classList.toggle("element__like_active");
  }
  /*Функция удаления карточки*/
  deleteCard = () => {
    if (this._element) {
      this._element.remove();
      this._element = null;
    }
  };

  /*Обработчик событий внутри класса*/
  _setEventListeners() {
    this._elementLike.addEventListener("click", () => {
      if (this._elementLike.classList.contains("element__like_active")) {
        this._handleDeleteLike(this._cardId);
      } else {
        this._handleSetLike(this._cardId);
      }
    });
    this._elementDelete.addEventListener("click", () => {
      this._handleDeleteClick();
    });
    this._elementImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }
  /*Проверка состояния лайка*/
  _checkLikedState() {
    this._data.likes.forEach((like) => {
      if (like._id === this._userId) {
        this._elementLike.classList.add("element__like_active");
      }
    });
  }
  /*ID- карточки*/
  getId() {
    return this._cardId;
  }
}
export default Card;
