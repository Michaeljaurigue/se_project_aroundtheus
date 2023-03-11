//Imports

import "./index.css";

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
const newCardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      newCardSection.addItem(createCard(data));
    },
  },
  selectors.cardSection
);
newCardSection.renderItems();
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

function submitEditProfile(inputValues) {
  userInfo.setUsserInfo({
    name: inputValues.title,
    job: inputValues.subtitle,
  });
}

function submitAddCard(inputValues) {
  createCard(
    { name: inputValues.title, link: inputValues.subtitle },
    selectors.cardSection
  );
  addFormPopup.close();
}

// function submitEditProfile() {
//   userInfo.setUserInfo({
//     name: (profileTitle.textContent = modalEditTitleInput.value),
//     job: (profileSubtitle.textContent = modalEditSubtitleInput.value),
//   });
//   modalEditPopup.close(modalEditProfile);
// }

// function submitAddCard() {
//   const name = modalAddCardNameInput.value;
//   const link = modalAddCardUrlInput.value;
//   createCard({ name:, link }, selectors.cardSection);
//   modalAddCardPopup.close(addNewCardModal);
// }

function openProfileEditForm() {
  const { name, job } = userInfo.getUserInfo();
  modalEditTitleInput.value = name;
  modalEditSubtitleInput.value = job;
  modalEditPopup.open(modalEditProfile);
}

// function openProfileEditForm() {
//   userInfo.setUserInfo({
//     name: (modalEditTitleInput.value = profileTitle.textContent),
//     job: (modalEditSubtitleInput.value = profileSubtitle.textContent),
//   });
//   modalEditPopup.open(modalEditProfile);
// }

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
