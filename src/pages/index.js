import "./index.css";
import {
  validationForm,
  popupElementAvatar,
  popupElementProfile,
  popupElementMesto,
  popupElementRemoval,
  popupAvatarSelector,
  popupProfileSelector,
  popupMestoSelector,
  popupImageSelector,
  templateSelector,
  containerSelector,
  popupRemovalSelector,
  nameInput,
  jobInput,
} from "../utils/constants.js";
import loadingText from "../utils/utils.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithDelete from "../components/PopupWithDelete.js";
const buttonOpenPopupAvatar = document.querySelector(".profile__edit");
const buttonOpenPopupProfile = document.querySelector(".profile__button-pen");
const buttonOpenPopupMesto = document.querySelector(".profile__add");

const avatarValidator = new FormValidator(validationForm, popupElementAvatar);
const profileValidator = new FormValidator(validationForm, popupElementProfile);
const validatorAddCard = new FormValidator(validationForm, popupElementMesto);
let userId = null;

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-68",
  headers: {
    authorization: "3212e562-199c-4acd-ac86-0318a7669948",
    "Content-Type": "application/json",
  },
});

Promise.all([api.getInitialInfo(), api.getInitialCards()])
  .then(([dataUser, dataCard]) => {
    userId = dataUser._id;
    userInfo.setUserInfo({
      avatar: dataUser.avatar,
      name: dataUser.name,
      job: dataUser.about,
    });
    cardsFromAnArray.renderItems(dataCard);
  })
  .catch((error) => console.error(`Ошибка в создании страницы ${error}`));

/*Перебириаем массив и загружаем карточки с сервера*/
const cardsFromAnArray = new Section(
  {
    renderer: (item) => {
      cardsFromAnArray.addItem(creadCard(item));
    },
  },
  containerSelector
);

const userInfo = new UserInfo({
  profileNameSelector: ".profile__name",
  profileJobSelector: ".profile__about",
  profileAvatarSelector: ".profile__image",
});
/*Редактирование аватвра профиля*/
const popupAvatar = new PopupWithForm(popupAvatarSelector, {
  callbackSubmit: (dataAvatar) => {
    loadingText(popupElementAvatar, "Сохранение...");
    api
      .addNewAvatar({
        avatar: dataAvatar.avatar,
      })
      .then((res) => {
        console.log(res);
        userInfo.setUserInfo({
          name: res.name,
          job: res.about,
          avatar: res.avatar,
        });
        popupAvatar.closePopup();
      })
      .catch((error) =>
        console.error(`Возникла ошибка при добавлении аватара ${error}`)
      )
      .finally(() => {
        loadingText(popupElementAvatar, "Сохранить");
      });
  },
});

/*Редактирование профиля*/
const popupProfile = new PopupWithForm(popupProfileSelector, {
  callbackSubmit: (dataInputProfile) => {
    loadingText(popupElementProfile, "Сохранение...");
    api
      .addUserInfo({
        name: dataInputProfile.name,
        job: dataInputProfile.job,
      })
      .then((res) => {
        userInfo.setUserInfo({
          name: res.name,
          job: res.about,
          avatar: res.avatar,
        });
        popupProfile.closePopup();
      })
      .catch((error) =>
        console.error(`Возникла ошибка при редактировании профиля ${error}`)
      )
      .finally(() => {
        loadingText(popupElementProfile, "Сохранить");
      });
  },
});

/*Редактирование новой карточки*/
const popupMesto = new PopupWithForm(popupMestoSelector, {
  callbackSubmit: (dataInputMesto) => {
    loadingText(popupElementMesto, "Сохранение...");
    api
      .addNewCards(dataInputMesto.name, dataInputMesto.link)
      .then((res) => {
        cardsFromAnArray.addItemPrepend(creadCard(res));
        popupMesto.closePopup();
      })
      .catch((error) =>
        console.error(`Возникла ошибка при добавлении новой карточки ${error}`)
      )
      .finally(() => {
        loadingText(popupElementMesto, "Создать");
      });
  },
});
/*Попап с увеличеной картинукой*/
const popupImage = new PopupWithImage(popupImageSelector);
/*Попап для удаления картинки */
const popupDelete = new PopupWithDelete(popupRemovalSelector);
/*Функция для создания карточки*/
function creadCard(data) {
  const card = new Card(
    {
      data,
      handleCardClick: (name, link) => {
        popupImage.openPopup(name, link);
      },
      handleDeleteClick: () => {
        popupDelete.openPopup();
        popupDelete.submitCallback(() => {
          loadingText(popupElementRemoval, "Удаление...");
          api
            .deleteCard(card.getId())
            .then(() => {
              card.deleteCard();
              popupDelete.closePopup();
            })
            .catch((err) => {
              console.error(`Возникла ошибка при удалении карточки ${err}`);
            })
            .finally(() => {
              loadingText(popupElementRemoval, "Да");
            });
        });
      },
      handleSetLike: (cardId) => {
        api
          .setLike(cardId)
          .then((data) => {
            card.handleLike(data);
          })
          .catch((err) => {
            console.error(`Возникла ошибка при добавлении лайка ${err}`);
          });
      },
      handleDeleteLike: (cardId) => {
        api
          .deleteLike(cardId)
          .then((data) => {
            card.handleLike(data);
          })
          .catch((err) => {
            console.error(`Возникла ошибка при удалении лайка ${err}`);
          });
      },
    },
    templateSelector,
    userId
  );
  return card.generateCard();
}

/*Открытие окна редактирования профиля и копирование в него данных*/
function handleClickProfile() {
  popupProfile.openPopup();
  const dateInputProfile = userInfo.getUserInfo();
  nameInput.value = dateInputProfile.name;
  jobInput.value = dateInputProfile.job;
}

/*Открытие окна добавления карточки*/
function handleClickMesto() {
  popupMesto.openPopup();
}
/*Открытие окна редактирования аватара */
function handleClickAvatar() {
  popupAvatar.openPopup();
}

/*Вызов функций */
avatarValidator.enableValidation();
profileValidator.enableValidation();
validatorAddCard.enableValidation();
popupAvatar.setEventListeners();
popupProfile.setEventListeners();
popupMesto.setEventListeners();
popupImage.setEventListeners();
popupDelete.setEventListeners();

buttonOpenPopupAvatar.addEventListener("click", handleClickAvatar);
buttonOpenPopupProfile.addEventListener("click", handleClickProfile);
buttonOpenPopupMesto.addEventListener("click", handleClickMesto);
