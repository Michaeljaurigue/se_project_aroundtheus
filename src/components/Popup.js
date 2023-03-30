class Popup {
  constructor(popupSelector) {
    this._selector = popupSelector;
    this._closeButton = this._selector.querySelector(".modal__close-button");
    this._handleEscapeClose = this._handleEscClose.bind(this);
    this._handleRemoteClickClose = this._handleRemoteClickClose.bind(this);
    this._closePopup = this.close.bind(this);
  }

  open() {
    this._selector.classList.add("modal__opened");
    this._setEventListeners();
  }

  close() {
    this._selector.classList.remove("modal__opened");
    this._removeEventListeners();
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleRemoteClickClose(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }

  _setEventListeners() {
    document.addEventListener("keydown", this._handleEscapeClose);
    this._selector.addEventListener("mousedown", this._handleRemoteClickClose);
    this._closeButton.addEventListener("click", this._closePopup);
  }

  _removeEventListeners() {
    document.removeEventListener("keydown", this._handleEscapeClose);
    this._selector.removeEventListener(
      "mousedown",
      this._handleRemoteClickClose
    );
    this._closeButton.removeEventListener("click", this._closePopup);
  }
}

export default Popup;
