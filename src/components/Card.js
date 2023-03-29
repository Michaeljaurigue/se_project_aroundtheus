class Card {
  constructor(
    data,
    cardSelector,
    handleCardLike,
    handleDisplayImage,
    handleDeleteCard,
    userId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.name;
    this._likes = data.likes;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._userId = userId;

    this._cardSelector = cardSelector;

    this._handleCardLike = handleCardLike;
    this._handleDisplayImage = handleDisplayImage;
    this._handleDeleteCard = handleDeleteCard;
  }
  console.log();
  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getCardElement() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".card__image");
    this._cardText = this._element.querySelector(".card__title");
    this._cardLikes = this._element.querySelector(".card__likes");

    this._cardText.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._alt;
    this._cardLikes.textContent = this._likes.length;

    this._heartButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._imageButton = this._element.querySelector(".card__image");

    this._assignCardButtons();

    if (this._ownerId !== this._userId) {
      this._deleteButton.remove();
    }

    this._renderLikes();

    return this._element;
  }

  _assignCardButtons() {
    this._heartButton.addEventListener("click", () =>
      this._handleCardLike(this)
    );
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteCard(this)
    );
    this._imageButton.addEventListener("click", () =>
      this._handleDisplayImage(this._name, this._link)
    );
  }

  isLiked() {
    return this._likes?.some((like) => this._userId === like._id);
  }

  updateLikes(likes) {
    this._likes = likes;
    this._renderLikes();
  }

  _renderLikes() {
    if (this.isLiked()) {
      this._heartButton.classList.add("card__like-button_active");
    } else {
      this._heartButton.classList.remove("card__like-button_active");
    }
    this._cardLikes.textContent = this._likes.length;
  }

  handleDeleteLocalCard() {
    this._element.remove();
    this._element = null;
  }
}

export default Card;
