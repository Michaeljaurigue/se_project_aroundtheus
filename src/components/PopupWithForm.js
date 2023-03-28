import Popup from "./Popup.js";

class PopUpWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._onSubmit = handleFormSubmit;
    this._formSelector = this._popupElement.querySelector(".form");
    this._submitButton = this._popupElement.querySelector(
      ".form__submit-button"
    );
    this.currentButtonText = this._submitButton.textContent;
  }

  _handleFormSubmit = (evt) => {
    evt.preventDefault();
    const inputValues = this._getInputValues();
    this._onSubmit(inputValues);
  };

  _getInputValues() {
    const formFieldInputs = [
      ...this._formSelector.querySelectorAll(".form__input"),
    ];
    const inputValues = {};
    formFieldInputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  _setEventListeners() {
    super._setEventListeners();
    this._formSelector.addEventListener("submit", this._handleFormSubmit);
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._formSelector.removeEventListener("submit", this._handleFormSubmit);
  }

  close() {
    super.close();
    this._popupElement.querySelector(".form").reset();
  }

  toggleIsSaving(isSaving) {
    if (isSaving) {
      this._submitButton.textContent = "Saving...";
    } else {
      this._submitButton.textContent = this.currentButtonText;
    }
  }
}

export default PopUpWithForm;
