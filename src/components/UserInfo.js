export default class UserInfo {
  constructor({
    profileNameSelector,
    profileJobSelector,
    profileAvatarSelector,
  }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileJob = document.querySelector(profileJobSelector);
    this._profileAvatar = document.querySelector(profileAvatarSelector);
  }
  /*копирование данных из профиля*/
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      job: this._profileJob.textContent,
      avatar: this._profileAvatar.src,
    };
  }
  /*добавление новых данных в профиль из попап*/
  setUserInfo({ avatar, name, job }) {
    this._profileAvatar.src = avatar;
    this._profileName.textContent = name;
    this._profileJob.textContent = job;
  }
}
