const imageModalWindow = document.querySelector("#card-template");

const imageCaption = imageModalWindow.querySelector(".card__title");
const imageElement = imageModalWindow.querySelector(".card__image");
const ESC_KEYCODE = 27;

const handleEscUp = (evt) => {
  evt.preventDefault();

  const activePopup = document.querySelector(".modal__opened");

  if (evt.which === ESC_KEYCODE) {
    closeModal(activePopup);
  }

  isEscEvent(evt, closeModal);
};

const openModal = (modal) => {
  modal.classList.add(".modal__opened");
  document.addEventListener("keyup", handleEscUp);
};

const closeModal = (modal) => {
  modal.classList.remove(".modal__opened");
  document.removeEventListener("keyup", handleEscUp);
};

// const isEscEvent = (evt, action) => {
//     const activePopup = document.querySelector(".modal__opened");
//     if (evt.which === ESC_KEYCODE) {
//         action(activePopup);
//     }
// };

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    // const cardElement = document
    //   .querySelector(this._cardSelector)
    //   .content.querySelector(".card")
    //   .cloneNode(true);

    // return cardElement;

    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    //Video Example
    //  this._likeButton.addEventListener("click", handleLikeIcon);
    //  this._deleteButton.addEventListener("click", handleDeleteCard);
    //  this._cardImage.addEventListener("click", () => this._handlePreviewPicture(data));
    //     this._trash.addEventListener("click", (evt) =>
    //     evt.target.closest(".card").remove()
    //   );

    //   this._heart.addEventListener("click", (evt) =>
    //     evt.target.classList.toggle("card__like-button_active")
    //   );

    //   this._cardImage.addEventListener("click", (evt) =>
    //     openImageModal(evt, data)
    //   );

    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => this._handleLikeIcon());

    this._element
      .querySelector(".card__trash")
      .addEventListener("click", () => this._handleDeleteCard());

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => this._handlePreviewPicture());
  };

  _handleLikeIcon() {
    this._element
      .querySelector(".card__like-button_active")
      .classList.toggle(".card__like-button_active");
  };

  _handleDeleteCard() {
    this._element.querySelector(".card__trash").classList.toggle("card");
  };

  _handlePreviewPicture() {
    this._element;
    cardImage.setAttribute("src", data.link);
    cardImage.setAttribute("alt", `Photo of ${data.name}`);
    cardTitle.textContent = data.name;
    openModal(imageModalWindow);
  };

  getView() {
    this._element = this._getTemplate();

    this._setEventListeners();

    this._element.querySelector(".card__image").style.backgroundImage = `url(${this._link})`;
    this._element.querySelector(".card__title").textContent = this._name;

    return this._element;
  };
};

export default Card;
