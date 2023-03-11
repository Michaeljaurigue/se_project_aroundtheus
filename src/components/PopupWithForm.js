import Popup from "./Popup.js";

class PopUpWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = document.querySelector(".form");
    this._formInputs = this._popupForm.querySelectorAll(".form__input");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputVales = {};

    this._formInputs.forEach((input) => {
      inputVales[input.name] = input.value;
    });
    
    return inputVales;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  _setEventListeners() {
    super._setEventListeners();

    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
      this.close();
    });
  };
}

export default PopUpWithForm;
