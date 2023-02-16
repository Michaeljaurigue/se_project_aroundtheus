import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";

// import { config, toggleButtonState } from "./validate.js";
// import { resetValidation } from "./validate.js";

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

// console.log(editFormElement);
// console.log(addFormElement);

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

// const cardFormSubmitHandler = (evt) => {
//   evt.preventDefault();

//   renderCard({
//     name: cardNameInputValue.value,
//     link: cardLinkInputValue.value
//   }, placesWrap);
//   toggleModalWindow(cardFormModalWindow);
//   };

// const renderCard = (data, wrap) => {
//     wrap.prependnew Card(data, "#card-template").getView()
//   };

  
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
//Template of Cards
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const cardSelector = document.querySelector("#card-template");
// const cardsDisplayed = document.querySelector(".cards");

const cardsList = document.querySelector(".cards__list");
  
const renderCard = (data, wrap) => {
  const card = new Card(data, cardSelector);
  wrap.prepend(card.getView());
};

// initialCards.forEach((data) => {
//   renderCard(data)
// });

// initialCards.forEach((cardObject) => {
//   renderCard(cardObject, placesWrap)
// });


initialCards.forEach((cardObject) => {
  const card = getCardElement(cardObject);
  cardsList.appendChild(card);
});

function getCardElement(data) {
  const cardElement = document.querySelector("#card-template").content;
  const card = cardElement.querySelector(".card").cloneNode(true);
  const cardTitle = card.querySelector(".card__title");
  cardTitle.textContent = data.name;
  const cardImage = card.querySelector(".card__image");

  cardImage.setAttribute("src", data.link);
  cardImage.setAttribute("alt", `Photo of ${data.name}`);

  const heart = card.querySelector(".card__like-button");
  const trash = card.querySelector(".card__trash");

  cardImage.addEventListener("click", (evt) => openImageModal(evt, data));
  trash.addEventListener("click", (evt) =>
    evt.target.closest(".card").remove()
  );
  heart.addEventListener("click", (evt) =>
    evt.target.classList.toggle("card__like-button_active")
  );

  return card;
}



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
//Modal Open and Close Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function hideModalOnRemoteClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.target);
  }
}

function hideModalOnEscape(evt) {
  if (evt.key === "Escape") {
    const modalProfilePopUp = document.querySelector(".modal__opened");
    closeModal(modalProfilePopUp);
  }
}
function openModal(modal) {
  modal.classList.add("modal__opened");
  document.addEventListener("keydown", hideModalOnEscape);
  modal.addEventListener("mousedown", hideModalOnRemoteClick);
}

function closeModal(modal) {
  modal.classList.remove("modal__opened");
  document.removeEventListener("keydown", hideModalOnEscape);
  modal.removeEventListener("mousedown", hideModalOnRemoteClick);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Save Location Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const saveNewLocation = (evt) => {
  evt.preventDefault();
  const titleInput = document.getElementById("title").value;
  const imageUrlInput = document.getElementById("image-url").value;
  const cardObject = { link: imageUrlInput, name: titleInput };
  const card = getCardElement(cardObject);
  cardsList.prepend(card);
  addLocationForm.reset();
  closeNewLocationModal();
  toggleButtonState(
    [document.getElementById("title"), document.getElementById("image-url")],
    addCardPopUp.querySelector(".form__submit-button"),
    config
  );
};

addCardPopUp.addEventListener("submit", saveNewLocation);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Iamge Pop Up Variables
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const imageModalPopUp = document.querySelector(".modal_image");

//Image Pop Up Open Functions

const openImageModal = (evt, data) => {
  imagePreview.src = evt.target.src;
  imagePreview.alt = `Photo of ${data.name}`;
  imageText.textContent = data.name;
  openModal(imageModalPopUp);
};

//Image Pop Up Close Functions

const closeImageModalButton = document.querySelector(".modal__image-close");

const imagePreview = imageModalPopUp.querySelector(".modal__image-img");
const imageText = imageModalPopUp.querySelector(".modal__image-text");

function closeImageModal() {
  closeModal(imageModalPopUp);
}

closeImageModalButton.addEventListener("click", closeImageModal);

// const cardSelector = '#card-template';
