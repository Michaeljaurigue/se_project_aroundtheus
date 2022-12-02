// Variables
const editProfilePopUp = document.querySelector(".modal_edit");
const editProfileButton = document.querySelector(".profile__edit");
const closeEditProfileButton = document.querySelector(
  ".modal__container_close-button"
);

editProfileButton.addEventListener("click", openProfileModal);
closeEditProfileButton.addEventListener("click", closeProfileModal);

function openProfileModal() {}

function closeProfileModal() {}

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "../images/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "../images/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "../images/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "../images/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "../images/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "../images/lago.jpg",
  },
];
