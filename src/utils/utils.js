import{
  nameInput,
  jobInput,
  nameInputMesto,
  urlInputMesto
}from "./utils/constants.js"

/*Открытие окна редактирования профиля и копирование в него данных*/
export  function handleClickProfile() {
  popupProfile.openPopup();
  const input = userInfo.getUserInfo();
  nameInput.value = input.name;
  jobInput.value = input.job;
}

/*функция добавления новых данных в профиль из попап*/
export function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  const profileData = {
    name: nameInput.value,
    job: jobInput.value,
  };
  userInfo.setUserInfo(profileData);
  popupProfile.closePopup();
}

/*Открытие окна добавления карточки*/
export function handleClickMesto() {
  popupMesto.openPopup();
  popupMesto.reset;
}
/*Добавление новой карточки */
export function submitFormMesto(evt) {
  evt.preventDefault();
  const cardData = {
    name: nameInputMesto.value,
    link: urlInputMesto.value,
  };
  console.log(cardData)
  const newCard = creadCard(cardData);
  cardsFromAnArray.addItem(newCard);
     popupMesto.closePopup();
  evt.target.reset();
}
