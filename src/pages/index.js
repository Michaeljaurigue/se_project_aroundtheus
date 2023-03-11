//Imports

import {
  initialCards,
  selectors,
  validationSettings,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopUpWithImage from "../components/PopupWithImage.js";
import PopUpWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

///////////////////////
//Card Variables
///////////////////////
const cardSelector = document.querySelector("#card-template");
const cardListEl = document.querySelector(".cards_list");
const closeButtons = document.querySelectorAll(".modal__close-button");
const modalPreview = document.querySelector(".modal_image");

///////////////////////
//Profile Variables
///////////////////////
const profileEditButton = document.querySelector(".profile__edit-button");
const modalEditProfile = document.querySelector("#modal_edit");
const modalEditProfileForm = document.querySelector("#modal-profile-form");
const profileTitle = document.querySelector("#profile__title");
const profileSubtitle = document.querySelector("#profile__subtitle");
const modalEditTitleInput = document.querySelector("#name");
const modalEditSubtitleInput = document.querySelector("#description");

///////////////////////
//Add Card Variables
///////////////////////
const addNewCardModal = document.querySelector("#modal_add-card");
const modalAddCardForm = document.querySelector("#modal__form-new-location");
const modalAddCardNameInput = document.querySelector("#title");
const modalAddCardUrlInput = document.querySelector("#image-url");
const addCardButton = document.querySelector("#profile__add-button");

///////////////////////
//Initialize Cards
///////////////////////
const CardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      // const card = new Card(data, cardSelector);
      CardSection.addItem(createCard(data));
    },
  },
  selectors.cardSection
);
CardSection.renderItems();
function createCard(data) {
  const newCard = new Card(data, handleImageClick, cardSelector);
  return newCard.getCardElement();
}
export function handleImageClick(name, link) {
  modalImagePopup.open(name, link);
}

///////////////////////
//Functions
///////////////////////
function submitEditProfile() {
  userInfo.setUserInfo({
    name: (profileTitle.textContent = modalEditTitleInput.value),
    job: (profileSubtitle.textContent = modalEditSubtitleInput.value),
  });
  modalEditPopup.close(modalEditProfile);
}
function submitAddCard() {
  const name = modalAddCardNameInput.value;
  const link = modalAddCardUrlInput.value;
  createCard({ name, link }, selectors.cardSection);
  modalAddCardPopup.close(addNewCardModal);
}
function openProfileEditForm() {
  userInfo.setUserInfo({
    name: (modalEditTitleInput.value = profileTitle.textContent),
    job: (modalEditSubtitleInput.value = profileSubtitle.textContent),
  });
  modalEditPopup.open(modalEditProfile);
}
profileEditButton.addEventListener("click", () => {
  openProfileEditForm();
});
addCardButton.addEventListener("click", () => {
  modalAddCardPopup.open(addNewCardModal);
});

///////////////////////
//Popups
///////////////////////
const modalEditPopup = new Popup({ popupSelector: "#modal_edit" });
const modalAddCardPopup = new Popup({ popupSelector: "#modal_add-card" });
const modalImagePopup = new PopUpWithImage({ popupSelector: "#image-modal" });
modalEditPopup._setEventListeners();
modalAddCardPopup._setEventListeners();
modalImagePopup._setEventListeners();
const editFormPopup = new PopUpWithForm("#modal_edit", submitEditProfile);
const addFormPopup = new PopUpWithForm("#modal_add-card", submitAddCard);
editFormPopup._setEventListeners();
addFormPopup._setEventListeners();

///////////////////////
//Form Validation
///////////////////////
const modalProfilePopUp = document.querySelector(".modal_edit");
const addCardPopUp = document.querySelector(".modal_add-card");
const formProfileElement = modalProfilePopUp.querySelector(".form");
const addFormElement = addCardPopUp.querySelector(".form");
const editFormValidator = new FormValidator(
  validationSettings,
  formProfileElement
);
const addFormValidator = new FormValidator(validationSettings, addFormElement);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

///////////////////////
//User Info
///////////////////////
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

///////////////////////////////////////
//Old Code
///////////////////////////////////////

// import Card from "../components/Card.js";

// import FormValidator from "../components/FormValidator.js";

// import { openModal, closeModal } from "../utils/utils.js";

// // import Section from "../components/Section.js";

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //Variables
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const modalProfilePopUp = document.querySelector(".modal_edit");
// const addCardPopUp = document.querySelector(".modal_add-card");
// const saveProfileEditForm = document.querySelector(".modal__form-edit");
// const closeEditButton = document.querySelector(".modal__close-edit");
// const editProfileButton = document.querySelector(".profile__edit-button");
// const profileName = document.querySelector(".profile__title");
// const profileJob = document.querySelector(".profile__description");
// const profileElement = document.querySelector(".profile");

// const nameInput = document.querySelector(`.form__input[name="name"]`);
// const jobInput = document.querySelector(`.form__input[name="description"]`);

// const bodyElement = document.querySelector(".body");

// //Add a Location Pop Up Variables
// const addLocationButton = document.querySelector(".profile__add-button");
// const addLocationForm = document.querySelector(".modal__form-new-location");

// //Form Input Variables
// const formAboutText = modalProfilePopUp.querySelector(
//   ".form__input_type_about"
// );
// const currentNameText = profileElement.querySelector(".profile__title");
// const currentAboutText = profileElement.querySelector(".profile__description");
// const formLinkText = addCardPopUp.querySelector(".form__input_type_link");
// const ESC_KEYCODE = 27;

// //Image Modal Variables
// //Below is a function that will be used to create the cards
// const openImageModal = (data) => {
//   imagePreview.src = data.link;
//   imagePreview.alt = `Photo of ${data.name}`;
//   imageText.textContent = data.name;
//   openModal(imageModalPopUp);
// };

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //Validaion
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const validationSettings = {
//   formSelector: ".form",
//   formFieldSelector: ".form__fieldset",
//   inputSelector: ".form__input",
//   submitButtonSelector: ".form__submit-button",
//   inactiveButtonClass: "form__submit-button_inactive",
//   inputErrorClass: "form__input_type_error",
//   errorClass: "form__error_visible",
// };

// const formProfileElement = modalProfilePopUp.querySelector(".form");

// const addFormElement = addCardPopUp.querySelector(".form");

// const editFormValidator = new FormValidator(
//   validationSettings,
//   formProfileElement
// );

// //Here we are passing in validationSettings and addFormElement because we want to validate the add card form.
// //We pass these in becuase we want to validate the add card form this happens when the user clicks the add location button.
// const addFormValidator = new FormValidator(validationSettings, addFormElement);

// editFormValidator.enableValidation();
// addFormValidator.enableValidation();

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // Profile Pop Up Open Functions
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// //Below is a function that will be used to open the profile pop up
// function fillProfileForm() {
//   nameInput.value = profileName.textContent;
//   jobInput.value = profileJob.textContent;
// }
// function openProfileModal() {
//   fillProfileForm();
//   openModal(modalProfilePopUp);
// }

// editProfileButton.addEventListener("click", openProfileModal);

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
// //Card
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const initialCards = [
//   {
//     name: "Yosemite Valley",
//     link: "https://github.com/Michaeljaurigue/se_project_aroundtheus/blob/main/images/Pixabay-Yosemite-Valley.jpg?raw=true",
//   },

//   {
//     name: "Lake Louise",
//     link: "https://github.com/Michaeljaurigue/se_project_aroundtheus/blob/main/images/Pixabay-Lake-Louise.jpg?raw=true",
//   },

//   {
//     name: "Bald Mountains",
//     link: "https://github.com/Michaeljaurigue/se_project_aroundtheus/blob/main/images/Pixabay-Bald-Mountains.jpg?raw=true",
//   },

//   {
//     name: "Latemar",
//     link: "https://github.com/Michaeljaurigue/se_project_aroundtheus/blob/main/images/Pixabay-Latemar.jpg?raw=true",
//   },

//   {
//     name: "Vanoise National Park",
//     link: "https://github.com/Michaeljaurigue/se_project_aroundtheus/blob/main/images/Pixabay-Vanoise-National.jpg?raw=true",
//   },

//   {
//     name: "Lago di Braies",
//     link: "https://github.com/Michaeljaurigue/se_project_aroundtheus/blob/main/images/Pixabay-Lago-di-Braies.jpg?raw=true",
//   },
// ];

// //Below is a variable that will be used to create the cards
// const cardSelector = document.querySelector(".cards__list");
// const cardsList = cardSelector.querySelector(".card");

// //below is a function that will be used to create the cards
// const createCard = (data) => {
//   //Here, you can specify the elements that will be used to create the cards
//   const card = new Card(
//     data,
//     "#card-template",
//     openImageModal
//   ).getCardElement();
//   //here .getCardElement() is a method that will be used to create the cards

//   //bewlow we use prepend to add the cards to the top of the list
//   cardSelector.prepend(card);
// };

// //Here, we use a forEach loop to create the cards
// //ForEach loop is used to iterate through the array
// //Here, we are iterating through the array of initialCards
// initialCards.forEach((data) => {
//   createCard(data, cardSelector);
// });

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

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //Modal Functions from Util.js
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// function openModal(modal) {
//   modal.classList.add("modal__opened");
//   document.addEventListener("keydown", hideModalOnEscape);
//   modal.addEventListener("mousedown", hideModalOnRemoteClick);
// }

// function closeModal(modal) {
//   modal.classList.remove("modal__opened");
//   document.removeEventListener("keydown", hideModalOnEscape);
//   modal.removeEventListener("mousedown", hideModalOnRemoteClick);
// }

// function hideModalOnRemoteClick(evt) {
//   if (evt.target === evt.currentTarget) {
//     closeModal(evt.target);
//   }
// }

// function hideModalOnEscape(evt) {
//   if (evt.key === "Escape") {
//     const modalProfilePopUp = document.querySelector(".modal__opened");
//     closeModal(modalProfilePopUp);
//   }
// }

// const bodyElement = document.querySelector(".body");

// function removePreloader() {
//   bodyElement.classList.remove("preload");
// }

// export { openModal, closeModal, removePreloader };
