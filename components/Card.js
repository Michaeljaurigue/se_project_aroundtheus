import { openImageModal } from "../scripts/index.js";

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;
  }

  // _getTemplate() {
  //   const cardElement = document
  //     .querySelector(this._cardSelector)
  //     .content.querySelector(".card")
  //     .cloneNode(true);

  //   return cardElement;
  // }

  _getTemplate() {
    const template = document.querySelector(this._cardSelector);
    const cardElement = template.content.cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => this._handleLikeIcon());

    this._element
      .querySelector(".card__trash")
      .addEventListener("click", () => this._handleDeleteCard());

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => this._handlePreviewPicture());
  }

  _handleLikeIcon() {
    this._element
      .querySelector(".card__like-button")
      .classList.toggle(".card__like-button_active");
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
    // this._element.querySelector(".card__trash").classList.toggle(".card");
  }

  _handlePreviewPicture() {
    this._element.setAttribute("src", this._link);
    this._element.setAttribute("alt", `Photo of ${this._name}`);
    this._element.textContent = this._name;
    openImageModal(imageModalWindow);
  }

  getCardElement() {
    this._element = this._getTemplate();

    this._element.querySelector(
      ".card__image"
    ).style.backgroundImage = `url(${this._link})`;
    this._element.querySelector(".card__title").textContent = this._name;

    this._setEventListeners();
    return this._element;
  }
}

export default Card;
