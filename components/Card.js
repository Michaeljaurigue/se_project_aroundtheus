import { openModal } from "../utils/utils.js";

const imageModal = document.querySelector("#image-modal");
const modalCardImage = imageModal.querySelector(".modal__image-img");
const modalCardName = imageModal.querySelector(".modal__image-text");

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;
  }

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
    this._likeButton.classList.toggle(".card__like-button_active");
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handlePreviewPicture(imageModal) {
    modalCardImage.src = this._link;
    modalCardImage.alt = `Photo of ${this._name}`;
    modalCardName.textContent = this._name;

    openModal(imageModal);
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
