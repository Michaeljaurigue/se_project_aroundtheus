import { ESC_KEYCODE } from "../utils/constants.js";

class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);

    this._handleEscUp = this._handleEscUp.bind(this); 
  }

  open() {
    this._popupElement.classList.add("modal__opened");
    document.addEventListener("keyup", this._handleEscUp);
  }

  close() {
    this._popupElement.classList.remove("modal__opened");
    document.removeEventListener("keyup", this._handleEscUp);
  }


  _handleEscUp(evt) {
    evt.preventDefault();
    if (evt.which === ESC_KEYCODE) {
      this.close();
    }
  }

  _setEventListeners() {
    this._popupElement.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("modal__opened") ||
        evt.target.classList.contains("modal__close-button")
      ) {
        this.close();
      }
    });
  }

  _removeEventListeners() {
    this._popupElement.removeEventListener("mousedown", (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
  }
}

export default Popup;
