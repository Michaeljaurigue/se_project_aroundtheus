import Card from "../components/Card.js";

import FormValidator from "../components/FormValidator.js";

import { openModal, closeModal } from "../utils/utils.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Variables
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Profile Pop Up Variables

const modalProfilePopUp = document.querySelector(".modal_edit");
const formProfileElement = modalProfilePopUp.querySelector(".form");
const addCardPopUp = document.querySelector(".modal_add-card");
const saveProfileEditForm = document.querySelector(".modal__form-edit");
const closeEditButton = document.querySelector(".modal__close-edit");
const editProfileButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const profileElement = document.querySelector(".profile");
const nameInput = document.querySelector(`.form__input[name="name"]`);
const jobInput = document.querySelector(`.form__input[name="description"]`);
const bodyElement = document.querySelector(".body");

//Add a Location Pop Up Variables
const addLocationButton = document.querySelector(".profile__add-button");
const addLocationForm = document.querySelector(".modal__form-new-location");

//Form Input Variables
const formNameText = modalProfilePopUp.querySelector(".form__input_type_name");
const formAboutText = modalProfilePopUp.querySelector(
  ".form__input_type_about"
);
const currentNameText = profileElement.querySelector(".profile__title");
const currentAboutText = profileElement.querySelector(".profile__description");
const formLinkText = addCardPopUp.querySelector(".form__input_type_link");
const ESC_KEYCODE = 27;

//Image Pop Up Open Functions

const openImageModal = (data) => {
  imagePreview.src = data.link;
  imagePreview.alt = `Photo of ${data.name}`;
  imageText.textContent = data.name;
  openModal(imageModalPopUp);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Validaion
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

const editFormElement = modalProfilePopUp.querySelector(".form");

const addFormElement = addCardPopUp.querySelector(".form");

const editFormValidator = new FormValidator(
  validationSettings,
  editFormElement
);

const addFormValidator = new FormValidator(validationSettings, addFormElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Profile Pop Up Open Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function fillProfileForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
function openProfileModal() {
  fillProfileForm();
  openModal(modalProfilePopUp);
}

editProfileButton.addEventListener("click", openProfileModal);

// Profile Pop Up Close Functions

function closeProfileModal() {
  closeModal(modalProfilePopUp);
}

closeEditButton.addEventListener("click", closeProfileModal);

// Profile Pop Up Submit Button

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = document.getElementById("name").value;
  const jobInput = document.getElementById("description").value;

  profileName.textContent = nameInput;
  profileJob.textContent = jobInput;

  formProfileElement.reset();
  closeProfileModal();
}

formProfileElement.addEventListener("submit", handleProfileFormSubmit);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Card
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

const cardSelector = document.querySelector(".cards__list");
const cardsList = cardSelector.querySelector(".card");

const createCard = (data) => {
  const card = new Card(
    data,
    "#card-template",
    openImageModal
  ).getCardElement();

  cardSelector.prepend(card);
};

initialCards.forEach((data) => {
  createCard(data, cardSelector);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Add a Location Pop Up Functions //STAYS INSIDE INDEX.JS
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const openLocationModal = () => {
  openModal(addCardPopUp);
};

addLocationButton.addEventListener("click", openLocationModal);

//Close a Location Pop Up Close Functions

function closeNewLocationModal() {
  closeModal(addCardPopUp);
}

const closeNewLocationButton = document.querySelector(
  ".modal__close-new-location"
);

closeNewLocationButton.addEventListener("click", closeNewLocationModal);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Add New Location Card
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const addCardModal = document.querySelector(".modal_add-card");

const modalAddCardForm = addCardModal.querySelector(
  ".modal__form-new-location"
);

const modalAddCardTitleInput = modalAddCardForm.querySelector("#title");

const modalAddCardLinkInput = modalAddCardForm.querySelector("#image-url");

const profileAddCardBtn = document.querySelector("#submit-button");

profileAddCardBtn.addEventListener("click", (evt) => {
  openModal(addCardModal);
});

modalAddCardForm.addEventListener("submit", handleAddCardSubmit);

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const name = modalAddCardTitleInput.value;
  const link = modalAddCardLinkInput.value;
  createCard({ name, link }, cardSelector);
  closeNewLocationModal(addCardModal);
  modalAddCardForm.reset();
  addFormValidator._toggleButtonState(
    [document.getElementById("title"), document.getElementById("image-url")],
    addCardPopUp.querySelector(".form__submit-button"),
    validationSettings
  );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Iamge Pop Up Variables
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const imageModalPopUp = document.querySelector(".modal_image");

//Image Pop Up Close Functions

const closeImageModalButton = document.querySelector(".modal__image-close");

const imagePreview = imageModalPopUp.querySelector(".modal__image-img");
const imageText = imageModalPopUp.querySelector(".modal__image-text");

function closeImageModal() {
  closeModal(imageModalPopUp);
}

closeImageModalButton.addEventListener("click", closeImageModal);

export { openImageModal };
