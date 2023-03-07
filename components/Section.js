class Section {
  constructor({ renderer, items }, classSelector) {
    this._renderer = renderer;
    this._items = items;
    this._cardsDisplayed = document.querySelector(classSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      const card = this._renderer(item);
    });
  }

  addItem(item) {
    this._cardsDisplayed.prepend(item);
  }
}

export default Section;
