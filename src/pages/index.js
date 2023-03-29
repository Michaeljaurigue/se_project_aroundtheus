import "./index.css";
import FormValidator from "../components/FormValidator.js";
import {
  cardsDisplayed,
  configUser,
  configValidate,
  baseURL,
  authToken,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from "../components/PopupWithConfirm";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

///////////////////////
//Card Variables
///////////////////////

const modalEditProfile = document.querySelector(".modal_edit");
const addNewCardModal = document.querySelector(".modal_add-card");
const modalPicturePicture = document.querySelector(".modal_profile");
const modalPreview = document.querySelector(".modal_image");
const modalConfirm = document.querySelector(".modal_confirm");
const profileFormElement = modalEditProfile.querySelector(".form");
const addCardFormElement = addNewCardModal.querySelector(".form");
const pictureFormElement = modalPicturePicture.querySelector(".form");
const profileElement = document.querySelector(".profile");
const editProfileButton = profileElement.querySelector(".profile__edit-button");
const addCardButton = profileElement.querySelector(".profile__add-button");
const changeAvatarButton = profileElement.querySelector(
  ".profile__image-button"
);

const formNameText = modalEditProfile.querySelector(".form__input_type_name");
const formAboutText = modalEditProfile.querySelector(".form__input_type_about");
const cardSelector = "#card";
let userId;

const api = new Api(baseURL, authToken);

///////////////////////
//API
/////////////////////

const cardSection = new Section(createCard, cardsDisplayed);

const userObject = new UserInfo(
  configUser.currentName,
  configUser.currentAbout,
  configUser.profilePicture
);

const imagePopup = new PopupWithImage(modalPreview, handlePictureSubmit);

const editProfileForm = new PopupWithForm(
  modalEditProfile,
  handleProfileSubmit
);
const addProfileForm = new PopupWithForm(addNewCardModal, handleAddCardSubmit);
const changeAvatarForm = new PopupWithForm(
  modalPicturePicture,
  handlePictureSubmit
);

const confirmForm = new PopupWithConfirm(modalConfirm);
confirmForm.setEventListeners();

function fillProfileForm() {
  const userInfo = userObject.getUserInfo();
  formNameText.value = userInfo.name;
  formAboutText.value = userInfo.about;
}

function displayEdit() {
  fillProfileForm();
  editProfileForm.open();
  editProfileFormValidator.resetValidation();
}

function displayAddCard() {
  addProfileForm.open();
  addProfileFormValidator.resetValidation();
}

function handleDisplayImage(name, link) {
  imagePopup.open(name, link);
}

function displayChangeAvatar() {
  changeAvatarForm.open();
}

function handleProfileSubmit(data) {
  editProfileForm.toggleIsSaving(true);
  api
    .setUserInfo(data)
    .then(() => {
      userObject.setUserInfo(data.name, data.about);
      editProfileForm.close();
    })
    .catch((err) => {
      console.log(`Error: ${err.status}`);
    })
    .finally(() => {
      editProfileForm.toggleIsSaving(false);
    });
}
function handleAddCardSubmit(inputValues) {
  const name = inputValues.name;
  const link = inputValues.link;

  const data = {
    name: name,
    link: link,
  };

  addProfileForm.toggleIsSaving(true);
  api
    .addCard(inputValues)
    .then((cardData) => {
      cardSection.addItem(cardData);
      addProfileForm.close();
    })
    .catch((err) => {
      console.error("Error:", err);
    })
    .finally(() => {
      addProfileForm.toggleIsSaving(false);
    });
}

function handlePictureSubmit(data) {
  console.log(data);
  changeAvatarForm.toggleIsSaving(true);
  api
    .setAvatar(data.avatar)
    .then(() => {
      userObject.setProfilePicture(data.avatar);
      changeAvatarForm.close();
    })
    .catch((err) => {
      console.log("Error:", err);
    })
    .finally(() => {
      changeAvatarForm.toggleIsSaving(false);
    });
}

function handleDeleteLocalCard(card) {
  confirmForm.open();
  confirmForm.setSubmit(() => {
    confirmForm.toggleIsSaving(true);
    api
      .deleteCard(card._id)
      .then(() => {
        card.handleDeleteLocalCard();
        confirmForm.close();
      })
      .catch((err) => {
        console.error("Error:", err);
      })
      .finally(() => {
        confirmForm.toggleIsSaving(false);
      });
  });
}
// console.log(`Error: ${err.status}`);
function handleCardLike(card) {
  if (card.isLiked()) {
    api
      .removeLike(card._id)
      .then((res) => card.updateLikes(res.likes))
      .catch((err) => {
        console.error("Error:", err);
      });
  } else {
    api
      .addLike(card._id)
      .then((res) => card.updateLikes(res.likes))
      .catch((err) => {
        console.error("Error:", err);
      });
  }
}

function createCard(card) {
  const newCard = new Card(
    card,
    cardSelector,
    handleCardLike,
    handleDisplayImage,
    handleDeleteLocalCard,
    userId
  );
  return newCard.getCardElement();
}

function setPageListeners() {
  editProfileButton.addEventListener("click", displayEdit);
  addCardButton.addEventListener("click", displayAddCard);
  changeAvatarButton.addEventListener("click", displayChangeAvatar);
}

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialData]) => {
    userId = userData._id;
    userObject.setProfilePicture(userData.avatar);
    userObject.setUserInfo(userData.name, userData.about);
    cardSection.renderItems(initialData);
  })
  .catch((err) => {
    console.log(err);
  });

setPageListeners();

const editProfileFormValidator = new FormValidator(
  configValidate,
  profileFormElement
);

const addProfileFormValidator = new FormValidator(
  configValidate,
  addCardFormElement
);

const changeAvatarFormValidator = new FormValidator(
  configValidate,
  pictureFormElement
);

editProfileFormValidator.enableValidation();
addProfileFormValidator.enableValidation();
changeAvatarFormValidator.enableValidation();
