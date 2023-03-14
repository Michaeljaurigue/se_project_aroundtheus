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
const addCardSubmitButton = document.querySelector("#submit-button");
///////////////////////
//Initialize Cards
///////////////////////

profileEditButton.addEventListener("click", () => {
  openProfileEditForm();
});

addCardButton.addEventListener("click", (e) => {
  addFormValidator.toggleButtonState();
  addFormPopup.open();
});

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      cardsSection.addItem(createCard(data));
    },
  },
  selectors.cardSection
);

cardsSection.renderItems();

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
  console.log(inputValues);
  userInfo.setUserInfo({
    name: inputValues.name,
    job: inputValues.job,
  });
  editFormPopup.close();
}

function submitAddCard(inputValues) {
  const card = createCard(
    { name: inputValues.name, link: inputValues.link },
    cardSelector
  );
  cardsSection.addItem(card);
  addCardSubmitButton.classList.toggle("form__submit-button_inactive");
  addFormPopup.close();
}

function openProfileEditForm() {
  const { name, job } = userInfo.getUserInfo();
  console.log(name);
  console.log(job);
  modalEditTitleInput.value = name;
  modalEditSubtitleInput.value = job;
  editFormPopup.open();
}

///////////////////////
//Popups
///////////////////////

const editFormPopup = new PopUpWithForm("#modal_edit", submitEditProfile);
const addFormPopup = new PopUpWithForm("#modal_add-card", submitAddCard);
const modalImagePopup = new PopUpWithImage({ popupSelector: "#image-modal" });

modalImagePopup.setEventListeners();
editFormPopup.setEventListeners();
addFormPopup.setEventListeners();

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
  nameSelector: "#profile__title",
  jobSelector: "#profile__subtitle",
});

// document.getElementById("#submit_button").addEventListener("click", () => {
//   const ojb = {
//     name: document.getElementById("#name").value,
//     job: document.getElementById("#description").value,
//   };
//   submitAddCard(ojb);
// });
