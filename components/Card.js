const imageModal = document.querySelector("#image-modal");

const modalCardImage = imageModal.querySelector(".modal__image-img");

const modalCardName = imageModal.querySelector(".modal__image-text");

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

  _setEventListeners() {
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

  _handlePreview() {
    const modalCardImage = document.querySelector(".modal__image-img");
    const modalCardName = document.querySelector(".modal__image-text");

    modalCardImage.src = this._link;
    modalCardImage.alt = this._alt;
    modalCardName.textContent = this._name;

    imageModal.classList.add("modal__opened");
    document.addEventListener("keyup", this._handleEscUp);
  }

  // _handlePreview() {
  //   modalCardImage.src = this._link;
  //   modalCardImage.alt = this._alt;
  //   modalCardName.textContent = this._name;

  //   imageModal.classList.add("modal__opened");
  //   document.addEventListener("keyup", this._handleEscUp);
  // }

  getCardElement() {
    this._element = this._getTemplate();
    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__title").textContent = this._name;

    this._element.querySelector(".card__image").alt = this._alt;

    this._setEventListeners();

    return this._element;
  }

  // _handleOpenModal() {
  //   popupText.textContent = this._name;
  //   super._handleOpenModal();
  // }

  // _handleCloseModal() {
  //   popupText.textContent = "";
  //   super._handleCloseModal();
  // }
}

export default Card;
