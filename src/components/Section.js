class Section {
  constructor(renderer, classSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(classSelector);
  }

  renderItems(data) {
    data.forEach((item) => {
      const card = this._renderer(item);
      this._container.append(card);
    });
  }
  
  addItem(items) {
    const card = this._renderer(items);
    this._container.prepend(card);
  }
}

export default Section;
