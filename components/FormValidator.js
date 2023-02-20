class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;

    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputElements)) {
      this._submitButton.setAttribute("disabled", true);
      this._submitButton.classList.add(this._settings.inactiveButtonClass);
    } else {
      this._submitButton.removeAttribute("disabled");
      this._submitButton.classList.remove(this._settings.inactiveButtonClass);
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorMessageEl = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    errorMessageEl.textContent = errorMessage;
    inputElement.classList.add(this._inputErrorClass);
    errorMessageEl.classList.add(this._settings.errorClass);
  }

  _hideInputError(inputElement) {
    const errorMessageEl = this._fieldsetElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorMessageEl.classList.remove(this._settings.errorClass);
    errorMessageEl.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputElements.some(
      (inputElement) => !inputElement.validity.valid
    );
  }

  _setEventListeners() {
    this._inputElements = [
      ...this._fieldsetElement.querySelectorAll(this._inputSelector),
    ];
    this._submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );

    this._toggleButtonState();

    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", (e) => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    this._fieldsetElement = this._formElement.querySelector(
      this._settings.formFieldSelector
    );

    this._setEventListeners();
  }
}

export default FormValidator;
