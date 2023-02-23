// //This class is used to create a form for adding a new card to the page because the form is used in two different places
// class SubmitForm {
//   //The constructor takes an object with a formSelector property that is a string that will be used to select the form template in the HTML file
//   //A handleFormSubmit property that is a function that will be called when the form is submitted (see below)
//   //A text property that is a string that will be used to set the text of the submit button (see below)
//   //The text property is optional and defaults to "Submit"
//   //The handleFormSubmit property is optional and defaults to an empty function
//   constructor({ formSelector }) {
//     this._formSelector = formSelector;
//   }

//   //This method will be used to create the form and return it to the caller (see below)
//   _getTemplate() {
//     const formElement = document
//       .querySelector(this._formSelector)
//       .content.querySelector(".form")
//       .cloneNode(true);
//     return formElement;
//   }

//   //This method will be used to set the text of the submit button (see below)
//   _generateForm() {
//     //Here we are creating a new form element by cloning the template. The template is a hidden element in the HTML file that contains the form template.
//     //We want to clone the template so that we can use it to create a new form element. We don't want to use the template directly because we don't want to modify the template.
//     this._element = this._getTemplate();

//     //Here we are setting event listeners for the form because we want to call the handleFormSubmit function when the form is submitted.
//     //The user will not be able to submit the form unless the form is valid.
//     //This is important because we don't want to call the handleFormSubmit function if the form is not valid.
//     this._setEventListeners();

//     //Here we are setting the text of the submit button. The text is passed in as an argument to the constructor.
//     //The text is optional and defaults to "Submit"
//     //The constructor is called in the CardList class and the text is set to "Create"
//     this._element.querySelector(".form__submit-button").textContent =
//       this._text;

//     //Here we are returning the form element to the caller (see below)
//     //This is important because the caller will need to append the form to the page.
//     return this._element;
//   }

//   //Here we are setting event listeners for the form because we want to call the handleFormSubmit function when the form is submitted.
//   //This is important because we don't want to call the handleFormSubmit function if the form is not valid.
//   _setEventListeners() {
//     this._element.addEventListener("submit", (evt) => {
//       evt.preventDefault();
//       //Here we reset this._element so that the form will be empty when the user clicks the "Create" button again.
//       this._element.reset();
//       //Here we are calling the handleFormSubmit function that was passed in as an argument to the constructor.
//       this._handleFormSubmit();
//     });
//   }
// }

// //Finally, we are exporting the class so that it can be imported into other files.
// export default SubmitForm;

// //As you can see, the SubmitForm class is very similar to the Section class.
// //The main difference is that the SubmitForm class is used to create a form that can be used in two different places.
// //The Section class is used to create a list of cards that will be displayed on the page.
