import Popup from "./Popup.js";

class PopUpWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formSelector = this._popupElement.querySelector(".form");

    this._submitButton = this._popupElement.querySelector(
      ".form__submit-button"
    );

    this._submitButtonText = this._submitButton.textContent;
  }

  setEventListeners() {
    super._setEventListeners();
    this._formSelector.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback();
    });
  }

  setSubmit(input) {
    this._handleSubmitCallback = input;
  }

  toggleIsSaving(isSaving) {
    if (isSaving) {
      this._submitButton.textContent = "Saving...";
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }
}

export default PopUpWithConfirm;