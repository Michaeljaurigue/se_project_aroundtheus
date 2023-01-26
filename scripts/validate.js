export const config = {
  formSelector: ".form",
  formFieldSelector: ".form__fieldset",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-button",
  inactiveButtonClass: "form__submit-button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};

function showInputError(formElement, inputElement, { inputErrorClass, errorClass }) {
  const errorMessageEl = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputElement.validationMessage;
  errorMessageEl.classList.add(errorClass);
}

function hideInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  const errorMessageEl = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
}
function checkInputValidity(formElement, inputElement, options) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, options);
  } else {
    hideInputError(formElement, inputElement, options);
  }
}

// function checkInputValidity(formElement, inputElement, options) {
//   if (!inputElement.validity.valid) {
//     return showInputError(formElement, inputElement, options);
//   }
//   hideInputError(formElement, inputElement, options);
// }

function hasInvalidIinput(inputList) {
  return !inputList.every((inputElement) => inputElement.validity.valid);
}

function dsiableButton(inputElements, submitButton, { inactiveButtonClass }) {
  submitButton.classList.add(inactiveButtonClass);
  submitButton.disabled = true;
}

function enableButton(inputElements, submitButton, { inactiveButtonClass }) {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

function toggleButtonState(
  inputElements,
  submitButton,
  { inactiveButtonClass }
) {
  if (hasInvalidIinput(inputElements)) {
    dsiableButton(inputElements, submitButton, { inactiveButtonClass });
  } else {
    enableButton(inputElements, submitButton, { inactiveButtonClass });
  }
}
// function toggleButtonState(
//   inputElements,
//   submitButton,
//   { inactiveButtonClass }
// ) {
//   if (hasInvalidIinput(inputElements)) {
//     submitButton.classList.add(inactiveButtonClass);
//     submitButton.disabled = true;
//     return;
//   }
//   submitButton.classList.remove(inactiveButtonClass);
//   submitButton.disabled = false;
// }

//destructing included here.. syntantic sugar

function setEventListeners(formElement, options) {
  const { inputSelector } = options;
  const inputElements = [...formElement.querySelectorAll(inputSelector)];
  const submitButton = formElement.querySelector(".form__button");
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", (e) => {
      checkInputValidity(formElement, inputElement, options);
      toggleButtonState(inputElements, submitButton, options);
    });
  });
}

function enableValidation(options) {
  const formElements = [...document.querySelectorAll(options.formSelector)];
  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement, options);
  });
}

// export function resetValidation(options) {
//   const fieldsetList = [
//     ...document.querySelectorAll(options.formFieldsetSelector),
//   ];
//   fieldsetList.forEach((fieldsetElement) => {
//     const buttonElement = fieldsetElement.querySelector(
//       options.submitButtonSelector
//     );
//     const inputList = [
//       ...fieldsetElement.querySelectorAll(options.inputSelector),
//     ];

//     toggleButtonState(inputList, buttonElement, options);

//     inputList.forEach((inputElement) => {
//       hideInputError(fieldsetElement, inputElement, options);
//     });
//   });
// }

enableValidation(config);
