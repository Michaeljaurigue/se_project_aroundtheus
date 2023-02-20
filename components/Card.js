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
    // e.target.classList.toggle(".card__like-button_active");
    this._element
      .querySelector(".card__like-button")
      .classList.add(".card__like-button_active");
  }

  _handleDeleteCard() {
    // const card = e.target.closest(".card");
    // card.remove();
    this._element.remove();
    this._element = null;
    //this._element.querySelector(".card__trash").classList.toggle(".card");
  }

  _handlePreviewPicture() {
    // document.querySelector(".card__image").src = `Photo of ${this._name}`;
    // document.querySelector(".card__title").alt = this._link;
    // this._element.setAttribute("src", this._link);
    // this._element.setAttribute("alt", `Photo of ${this._name}`);
    this._element.querySelector(".card__image").setAttribute("src", this._link);
    this._element
      .querySelector(".card__image")
      .setAttribute("alt", `Photo of ${this._name}`);

    this._element.textContent = this._name;
    openImageModal(imageModalWindow);
  }

  getCardElement() {
    this._element = this._getTemplate();

    // this._element.querySelector(
    //   ".card__image"
    // ).style.backgroundImage = `url(${this._link})`;
    // this._element.querySelector(".card__title").textContent = this._name;

    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__title").textContent = this._name;

    this._setEventListeners();
    return this._element;
  }
}

export default Card;
