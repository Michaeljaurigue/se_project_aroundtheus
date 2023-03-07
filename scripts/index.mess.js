import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { cardsDisplayed, configClose, configUser } from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopUpWithForm from "../components/PopUpWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://github.com/Michaeljaurigue/se_project_aroundtheus/blob/main/images/Pixabay-Yosemite-Valley.jpg?raw=true",
  },

  {
    name: "Lake Louise",
    link: "https://github.com/Michaeljaurigue/se_project_aroundtheus/blob/main/images/Pixabay-Lake-Louise.jpg?raw=true",
  },

  {
    name: "Bald Mountains",
    link: "https://github.com/Michaeljaurigue/se_project_aroundtheus/blob/main/images/Pixabay-Bald-Mountains.jpg?raw=true",
  },

  {
    name: "Latemar",
    link: "https://github.com/Michaeljaurigue/se_project_aroundtheus/blob/main/images/Pixabay-Latemar.jpg?raw=true",
  },

  {
    name: "Vanoise National Park",
    link: "https://github.com/Michaeljaurigue/se_project_aroundtheus/blob/main/images/Pixabay-Vanoise-National.jpg?raw=true",
  },

  {
    name: "Lago di Braies",
    link: "https://github.com/Michaeljaurigue/se_project_aroundtheus/blob/main/images/Pixabay-Lago-di-Braies.jpg?raw=true",
  },
];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Variables //Rule of thumb, if any of the variables are used in any other component, they should be in the constants file.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const modalProfilePopUp = document.querySelector(".modal_edit"); //MOVED TO index.js
// const addCardPopUp = document.querySelector(".modal_add-card"); //MOVED TO index.js

const saveProfileEditForm = document.querySelector(".modal__form-edit");
const closeEditButton = document.querySelector(".modal__close-edit");
const editProfileButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const profileElement = document.querySelector(".profile");

const nameInput = document.querySelector(`.form__input[name="name"]`);
const jobInput = document.querySelector(`.form__input[name="description"]`);

const bodyElement = document.querySelector(".body");

const addLocationButton = document.querySelector(".profile__add-button");
const addLocationForm = document.querySelector(".modal__form-new-location");

const formAboutText = modalProfilePopUp.querySelector(
  ".form__input_type_about"
);
const currentNameText = profileElement.querySelector(".profile__title");
const currentAboutText = profileElement.querySelector(".profile__description");
const formLinkText = addCardPopUp.querySelector(".form__input_type_link");
const ESC_KEYCODE = 27;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Template
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const cardSelector = document.querySelector(".cards__list");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Validation
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const validationSettings = {
  formSelector: ".form",
  formFieldSelector: ".form__fieldset",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-button",
  inactiveButtonClass: "form__submit-button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};

const formProfileElement = modalProfilePopUp.querySelector(".form");
const addFormElement = addCardPopUp.querySelector(".form");

const editFormValidator = new FormValidator(
  validationSettings,
  formProfileElement
);
const addFormValidator = new FormValidator(validationSettings, addFormElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//UserInfo Callback
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Card Callback
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const editProfileForm = new PopUpWithForm("#new-card-popup", () => {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  editProfileForm.close();
}); //Create a new pop up for the edit profile form

editProfileForm.setEventListeners();

//Below is a function that will be used to open the add card pop up
const addCardForm = new PopUpWithForm("#modal_add-card", () => {
  const newCard = {
    name: formLinkText.value,
    link: formAboutText.value,
  };
}); //Create a new pop up for the add card form

const cardModalPopUp = new PopupWithImage("#modal_image"); //Create a new pop up

cardModalPopUp.setEventListeners(); //This is a function that will be used to close the pop up

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Render Card Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const cardsList = cardSelector.querySelector(".card");

function createCard() {
  const createCard = {
    name: formLinkText.value,
    link: formAboutText.value,
  };

  const card = new Card(createCard, cardSelector);
  return card;
} //This is a function that will be used to create a new card

// const createCard = (data) => {
//   const card = new Card(
//     data,
//     "#card-template",
//     openImageModal
//   ).getCardElement();

//   cardSelector.prepend(card);
// };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Section Callback
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const cardElement = createCard(data);
      cardSection.addItem(cardElement);
    },
  },
  selectors.cardSection //This line of code is used to pass the card section into the section class. We use cardSection because that is the name of the variable that we used to store the card section.
);

cardSection.renderItems();

cardAddForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  cardSelector.prepend(createCard().getCardElement());
  closePopup(addCardPopUp);
  addCardPopUp.reset();
});

initialCards.forEach(function (data) {
  const card = new Card(data, cardSelector);
  cardSelector.prepend(card.getCardElement());
});

// initialCards.forEach((data) => {
//   createCard(data, cardSelector);
// });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//PopUpWithImage Callback
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const previewPopUp = new PopupWithImage(selectors.imagePreview); //Create a new pop up for the image preview
previewPopUp.setEventListeners(); //This is a function that will be used to close the pop up

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//PopUpWithForm Callback
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const addNewCardPopUp = new PopUpWithForm({
  popupSelector: ".modal_add-card",
  handleFormSubmit: (data) => {
    const card = createCard(data);
    cardSection.addItem(card);
    addNewCardPopUp.close();
  },
}); //Create a new pop up for the add card form

addNewCardPopUp.setEventListeners(); //This is a function that will be used to close the pop up

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//UserInfo Callback
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const userInfoPopup = new PopUpWithForm({
  popupSelector: ".modal_edit",
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data.name, data.description);
  },
}); //Create a new pop up for the edit profile form

// //Below is a function that will be used to create the cards
// const openImageModal = (data) => {
//   imagePreview.src = data.link;
//   imagePreview.alt = `Photo of ${data.name}`;
//   imageText.textContent = data.name;
//   openModal(imageModalPopUp);
// };

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // Profile Pop Up Open Functions
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// //Below is a function that will be used to open the profile pop up

// // const cardObj = new Card(newCardInfo, "#card-template", () => {cardModalPopUp.open()});//Create a new card

// // const newCard = cardObj.generateCard(); //Generate the card
// // cardGridObject.addItem(newCard); //Add the card to the grid
// // addCardForm.reset(); //Reset the form
// // addCardFormObj.setButtonInactive(); //Set the button to inactive
// // addCardFormPopup.close(); //Close the pop up
// // });

// // const newCardPopup = new PopUpWithForm("#new-card-popup");
// // newCardPopup.open();
// // newCardPopup.close();

// // function fillProfileForm() {
// //   nameInput.value = profileName.textContent;
// //   jobInput.value = profileJob.textContent;
// // }
// // function openProfileModal() {
// //   fillProfileForm();
// //   openModal(modalProfilePopUp);
// // }

// // editProfileButton.addEventListener("click", openProfileModal);

// // Profile Pop Up Close Functions

// function closeProfileModal() {
//   closeModal(modalProfilePopUp);
// }

// closeEditButton.addEventListener("click", closeProfileModal);

// //Here is a function that will be used to submit the form
// function handleProfileFormSubmit(evt) {
//   evt.preventDefault();

//   const nameInput = document.getElementById("name").value;
//   const jobInput = document.getElementById("description").value;

//   profileName.textContent = nameInput;
//   profileJob.textContent = jobInput;

//   closeProfileModal();
// }

// formProfileElement.addEventListener("submit", handleProfileFormSubmit);

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //Add a Location Pop Up Functions //STAYS INSIDE INDEX.JS
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const openLocationModal = () => {
//   openModal(addCardPopUp);
// };

// addLocationButton.addEventListener("click", openLocationModal);

// //Close a Location Pop Up Close Functions

// function closeNewLocationModal() {
//   closeModal(addCardPopUp);
// }

// const closeNewLocationButton = document.querySelector(
//   ".modal__close-new-location"
// );

// closeNewLocationButton.addEventListener("click", closeNewLocationModal);

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //Add New Location Card
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const addCardModal = document.querySelector(".modal_add-card");

// const modalAddCardForm = addCardModal.querySelector(
//   ".modal__form-new-location"
// );

// const modalAddCardTitleInput = modalAddCardForm.querySelector("#title");

// const modalAddCardLinkInput = modalAddCardForm.querySelector("#image-url");

// const profileAddCardBtn = document.querySelector("#submit-button");

// profileAddCardBtn.addEventListener("click", (evt) => {
//   openModal(addCardModal);
// });

// //Below is an event listener that will be used to submit the form because we want to submit the form when the user clicks the submit button
// modalAddCardForm.addEventListener("submit", handleAddCardSubmit);

// //This Function will be used to add a new location card
// function handleAddCardSubmit(evt) {
//   //Here we prevent the default action of the form
//   evt.preventDefault();
//   //Next we specify the elements that will be used to create the new location card
//   const name = modalAddCardTitleInput.value;
//   const link = modalAddCardLinkInput.value;
//   createCard({ name, link }, cardSelector);
//   closeNewLocationModal(addCardModal);
//   modalAddCardForm.reset();
//   //Here we reset the form
//   addFormValidator.toggleButtonState();
// }

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //Iamge Pop Up Variables
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const imageModalPopUp = document.querySelector(".modal_image");

// //Image Pop Up Close Functions

// const closeImageModalButton = document.querySelector(".modal__image-close");

// const imagePreview = imageModalPopUp.querySelector(".modal__image-img");
// const imageText = imageModalPopUp.querySelector(".modal__image-text");

// function closeImageModal() {
//   closeModal(imageModalPopUp);
// }

// closeImageModalButton.addEventListener("click", closeImageModal);

// export { openImageModal };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Validaion
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const validationSettings = {
//   formSelector: ".form",
//   formFieldSelector: ".form__fieldset",
//   inputSelector: ".form__input",
//   submitButtonSelector: ".form__submit-button",
//   inactiveButtonClass: "form__submit-button_inactive",
//   inputErrorClass: "form__input_type_error",
//   errorClass: "form__error_visible",
// };
//Moved to Constants.js





























////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// CardSection.renderItems(initialCards);

// initialCards.forEach((data) => {
//   const card = new Card(data, selectors.cardsList);
//   CardSection.addItem(card.getCardElement());
// });

// const CardSection = new Section(
//   {
//     renderer: (data) => {
//       const card = new Card(data, selectors.cardsList);
//       CardSection.addItem(card.getCardElement());
//     },
//   },
//   selectors.cardSection
// );

//Initialize all my instances
// CardSection.renderItems(initialCards);

//All the rest of the code

// // import "./index.css";

// //Import all the classes
// import {
//   initialCards,
//   selectors,
//   validationSettings,
// } from "../utils/constants.js";
// import Card from "../components/Card.js";
// import FormValidator from "../components/FormValidator.js";
// import PopupWithImage from "../components/PopupWithImage.js";
// import PopupWithForm from "../components/PopupWithForm.js";
// import Section from "../components/Section.js";
// import UserInfo from "../components/UserInfo.js";

// const modalProfilePopUp = document.querySelector(".modal_edit");
// const addCardPopUp = document.querySelector(".modal_add-card");

// //Create instances of the classes
// const CardPreviewPopup = new PopupWithImage(selectors.cardPreview);

// const CardSection = new Section(
//   {
//     renderer: (data) => {
//       const card = new Card(
//         {
//           data,
//           handleImageClick: (imgData) => {
//             CardPreviewPopup.open(imgData);
//           },
//         },
//         selectors.cardsList
//       );
//       CardSection.addItem(card.getCardElement());
//     },
//   },
//   selectors._cardContainer
// );

// const formProfileElement = modalProfilePopUp.querySelector(".form");
// const addFormElement = addCardPopUp.querySelector(".form");

// const editFormValidator = new FormValidator(
//   validationSettings,
//   formProfileElement
// );
// const addFormValidator = new FormValidator(validationSettings, addFormElement);

// //Initialize all my instances
// CardSection.renderItems(initialCards);
// CardPreviewPopup._setEventListeners();

// editFormValidator.enableValidation();
// addFormValidator.enableValidation();
// //All the rest of the code

// //event listeners for opening your add card and edit profile popups
