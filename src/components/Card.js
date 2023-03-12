class Card {
  constructor(data, handlePreview, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._handlePreview = handlePreview;
    this._cardSelector = cardSelector;
    this._alt = data.name;
  }

  _getTemplate() {
    const cardElement =
      this._cardSelector.content.firstElementChild.cloneNode(true);
    return cardElement;
  }

  setEventListeners() {
    this._likeButton = this._element.querySelector(".card__like-button");
    this._likeButton.addEventListener("click", () => this._handleLikeIcon());

    this._element
      .querySelector(".card__trash")
      .addEventListener("click", () => this._handleDeleteCard());

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () =>
        this._handlePreview({ name: this._name, link: this._link })
      );
  }

  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  getCardElement() {
    this._element = this._getTemplate();

    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__title").textContent = this._name;

    this._element.querySelector(".card__image").alt = this._alt;

    this.setEventListeners();

    return this._element;
  }
}

export default Card;
