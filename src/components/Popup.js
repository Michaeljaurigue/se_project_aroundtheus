class Popup {
  constructor(popupSelector) {
    this._popupElement = popupSelector;
    this._closeButton = this._popupElement.querySelector(
      ".modal__close-button"
    );
    this._handleEscapeClose = this._handleEscClose.bind(this);
    this._handleRemoteClickClose = this._handleRemoteClickClose.bind(this);
    this._closePopup = this.close.bind(this);
  }
  
  open() {
    this._popupElement.classList.add("modal__opened");
    this._setEventListeners();
  }

  close() {
    this._popupElement.classList.remove("modal__opened");
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
    this._popupElement.addEventListener(
      "mousedown",
      this.__handleRemoteClickClose
    );
    this._closeButton.addEventListener("click", this._closePopup);
    this._popupElement.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("modal__opened") ||
        evt.target.classList.contains("modal__close")
      ) {
        this.close();
      }
    });
  }

  _removeEventListeners() {
    document.removeEventListener("keydown", this._handleEscapeClose);
    this._popupElement.removeEventListener(
      "mousedown",
      this.__handleRemoteClickClose
    );
    this._closeButton.removeEventListener("click", this._closePopup);
  }
}

export default Popup;
