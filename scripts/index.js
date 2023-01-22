import { resetValidation} from "./validate.js";
import { configValidate } from "./validate.js";

///Variables
// Profile Pop Up Variables
const modalProfilePopUp = document.querySelector(".modal_edit");
const editProfileForm = document.querySelector(".modal__form-edit");
const saveProfileEditForm = document.querySelector(".modal__form-edit");

const closeEditButton = document.querySelector(".modal__close-edit");

const editProfileButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");


const nameInput = document.querySelector(`.form__input[name="name"]`);
const jobInput = document.querySelector(`.form__input[name="description"]`);

const bodyElement = document.querySelector(".body");

const formProfileElement = modalProfilePopUp.querySelector(".form");

const formAddCardElement = editProfileButton.querySelector(".form");

const profileElement = document.querySelector(".profile");

//Save Location Variables and Functions
const saveLocationForm = document.querySelector(".modal_add-card");

//Add a Location Pop Up Variables
const addCardPopUp = document.querySelector(".modal_add-card");

const addLocationButton = document.querySelector(".profile__add-button");

const addLocationForm = document.querySelector(".modal__form-new-location");

//Form Input Variables

const formNameText = modalProfilePopUp.querySelector(".form__input_type_name");

const formAboutText = modalProfilePopUp.querySelector(".form__input_type_about");

const currentNameText = profileElement.querySelector(".profile__title");

const currentAboutText = profileElement.querySelector(".profile__description");

const formTitleText = addCardPopUp.querySelector(".form__input_type_place");
const formLinkText = addCardPopUp.querySelector(".form__input_type_link");

// const cardTemplate = document.querySelector("#card").content;
// const cardsDisplayed = document.querySelector(".cards");

// const modalDisplayImage = document.querySelector(".modal_display-image");
// const modalImage = modalDisplayImage.querySelector(".card__image");
// const modalImageDescription = modalDisplayImage.querySelector(".modal__image-description");


//////////////////////////////////////////////////

// Esc Key

// function removePreload() {
//   bodyElement.classList.remove("preload");
// }



function hideModalOnRemoteClick(evt) {
  if (evt.target === evt.currentTarget) {
    hideModal(evt.target);
  }
}

function hideModalonEscape(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal__opened");
    hideModal(openModal);
  }
}
// const handleEscUp = (evt) => {
//   evt.preventDefault();
//   IntersectionObserverEntry(evt, closeModal);
// };

//Modal Open and Close Functions
function openModal(modal) {
  modal.classList.add("modal__opened");
  document.addEventListener("keydown", hideModalonEscape);
  modal.addEventListener("mousedown", hideModalOnRemoteClick);
};

function closeModal(modal) {
  modal.classList.remove("modal__opened");
  document.removeEventListener("keydown", hideModalonEscape);
  modal.removeEventListener("mousedown", hideModalOnRemoteClick);
};

function fillProfileForm() {
  formNameText.value = currentNameText.textContent;
  formAboutText.value = currentAboutText.textContent;
}

function displayEdit() {
  removePreload();
  fillProfileForm();
  displayModal(modalProfile);
  resetValidation(configValidate);
}

function displayAdd() {
  removePreload();
  formAddCardElement.reset();
  displayModal(modalAddCard);
  resetValidation(configValidate);
}

function displayImage() {
  removePreload();

  const modalImageAltText = this.alt;
  modalImage.src = this.src;
  modalImage.alt = modalImageAltText;
  modalImageDescription.textContent = modalImageAltText;

  displayModal(modalDisplayImage);
}


// Profile Pop Up Open Functions

function openProfileModal() {
  const profileName = document.querySelector(".profile__title").textContent;
  const profileJob = document.querySelector(".profile__description").textContent;
  const nameInput = document.querySelector('.form__input[name="name"]');
  const jobInput = document.querySelector('.form__input[name="description"]');
  nameInput.value = profileName;
  jobInput.value = profileJob;
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

  editProfileForm.reset();
  closeProfileModal();
}

saveProfileEditForm.addEventListener("submit", handleProfileFormSubmit);

// Cards

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

// Template of Cards

const cardsList = document.querySelector(".cards__list");

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

  cardImage.addEventListener("click", (evt) => openImageModal(evt, data));

  const heart = card.querySelector(".card__like-button");
  heart.addEventListener("click", (evt) =>
    evt.target.classList.toggle("card__like-button_active")
  );

  const trash = card.querySelector(".card__trash");
  trash.addEventListener("click", (evt) =>
    evt.target.closest(".card").remove()
  );

  return card;
}


//Add a Location Pop Up Functions

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

//Save Location Functions

const saveNewLocation = (evt) => {
  evt.preventDefault();
  const titleInput = document.getElementById("title").value;
  const imageUrlInput = document.getElementById("image-url").value;
  const cardObject = { link: imageUrlInput, name: titleInput };
  const card = getCardElement(cardObject);
  cardsList.prepend(card);
  addLocationForm.reset();
  closeNewLocationModal();
};

saveLocationForm.addEventListener("submit", saveNewLocation);

//Iamge Pop Up Variables
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

const configClose = {
  closeButtonSelector: ".modal__close-button",
  modalOverlaySelector: ".modal",
  modalContainerList: ".modal__container",
};

//Closing the Modals by Clicking Overlay Code

modalProfilePopUp.addEventListener("mousedown", (evt) => {
  if (
    evt.target.classList.contains("modal") ||
    evt.target.classList.contains("modal_edit")
    ) {
      closeModal(modalProfilePopUp);
    }
  });

  addCardPopUp.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("modal") ||
      evt.target.classList.contains("popup__close")
    ) {
      closeModal(addCardPopUp);
    }
  });

  imageModalPopUp.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("modal") ||
      evt.target.classList.contains("modal_add-card")
    ) {
      closeModal(imageModalPopUp);
    }
  });

  function setCloseListeners(config) {
    const closeButtonList = [
      ...document.querySelectorAll(config.closeButtonSelector),
    ];

    closeButtonList.forEach((button) => {
      button.addEventListener("click", function () {
        closeModal(button.closest(config.modalOverlaySelector));
      });
    });
  }


  function setPageListeners() {
    editProfileButton.addEventListener("click", displayEdit);
  addLocationButton.addEventListener("click", displayAdd);
  formProfileElement.addEventListener("submit", handleProfileFormSubmit);
  formAddCardElement.addEventListener("submit", handleAddCardSubmit);
  setCloseListeners(configClose);
  }

  loadCards(initialCards);
  setPageListeners();
