import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleOnSubmit = handleFormSubmit;
    this._formSelector = this._selector.querySelector(".form");
    this._submitButton = this._selector.querySelector(".form__submit-button");
    this.currentButtonText = this._submitButton.textContent;
  }

  _handleSubmit = (evt) => {
    evt.preventDefault();
    const inputValues = this._getInputValues();
    this._handleOnSubmit(inputValues);
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
    this._formSelector.addEventListener("submit", this._handleSubmit);
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._formSelector.removeEventListener("submit", this._handleSubmit);
  }

  close() {
    super.close();
    this._formSelector.reset();
  }

  toggleIsSaving(isSaving) {
    if (isSaving) {
      this._submitButton.textContent = "Saving...";
    } else {
      this._submitButton.textContent = this.currentButtonText;
    }
  }
}

export default PopupWithForm;
