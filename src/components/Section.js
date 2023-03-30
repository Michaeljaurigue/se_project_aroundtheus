class Section {
  constructor(renderer, classSelector) {
    this._renderer = renderer;
    this._cardsDisplayed = document.querySelector(classSelector);
  }

  renderItems(data) {
    data.forEach((item) => {
      const card = this._renderer(item);
      this._cardsDisplayed.append(card);
    });
  }
  
  addItem(items) {
    const card = this._renderer(items);
    this._cardsDisplayed.prepend(card);
  }
}

export default Section;
