import Popup from "./Popup.js";

class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formSelector = this._selector.querySelector(".form");

    this._submitButton = this._selector.querySelector(".form__submit-button");

    this._submitButtonText = this._submitButton.textContent;
  }

  setEventListeners() {
    super._setEventListeners();
    this._formSelector.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback();
    });
  }

  setSubmit(handler) {
    this._handleSubmitCallback = handler;
  }

  toggleIsSaving(isSaving) {
    if (isSaving) {
      this._submitButton.textContent = "Saving...";
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  toggleIsDeleting(isDeleting) {
    if (isDeleting) {
      this._submitButton.textContent = "Deleting...";
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  removeEventListeners() {
    super._removeEventListeners();
    this._formSelector.removeEventListener("submit", this._handleSubmit);
  }
}

export default PopupWithConfirm;
