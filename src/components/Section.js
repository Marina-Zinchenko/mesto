export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  /*Добавление элемента*/
  addItem(element) {
    this._container.append(element);
  }
/*Добавление элемента в начало*/
  addItemPrepend(element) {
    this._container.prepend(element);
  }
  /*Отрисовка элемента*/
  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }
}
