// Profile Pop Up Variables
const editProfilePopUp = document.querySelector(".modal_edit");

const editProfileForm = document.querySelector(".modal__form-edit");

const saveProfileEditForm = document.querySelector(".modal__form-edit");

const closeEditProfileButton = document.querySelector(".modal__close-edit");

const editProfileButton = document.querySelector(".profile__edit");

const profileName = document.querySelector(".profile__name");

const profileJob = document.querySelector(".profile__title");

const nameInput = document.querySelector(`.form__input[name="name"]`);

const jobInput = document.querySelector(`.form__input[name="description"]`);

//Modal Open and Close Functions
function openModal(modal) {
  modal.classList.add("modal__opened");
}

function closeModal(modal) {
  modal.classList.remove("modal__opened");
}

// Profile Pop Up Open Functions

function openProfileModal() {
  const profileName = document.querySelector(".profile__name").textContent;
  const profileJob = document.querySelector(".profile__title").textContent;
  const nameInput = document.querySelector('.form__input[name="name"]');
  const jobInput = document.querySelector('.form__input[name="description"]');
  nameInput.value = profileName;
  jobInput.value = profileJob;
  openModal(editProfilePopUp);
}

editProfileButton.addEventListener("click", openProfileModal);

// Profile Pop Up Close Functions

function closeProfileModal() {
  closeModal(editProfilePopUp);
}

closeEditProfileButton.addEventListener("click", closeProfileModal);
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
    link: "https://github.com/Michaeljaurigue/se_project_aroundtheus/blob/main/images/yosemite-valley.jpg?raw=true",
  },

  {
    name: "Lake Louise",
    link: "https://github.com/Michaeljaurigue/se_project_aroundtheus/blob/main/images/lake-louise.png?raw=true",
  },

  {
    name: "Bald Mountains",
    link: "https://github.com/Michaeljaurigue/se_project_aroundtheus/blob/main/images/bald-mountains.png?raw=true",
  },

  {
    name: "Latemar",
    link: "https://github.com/Michaeljaurigue/se_project_aroundtheus/blob/main/images/latemar.png?raw=true",
  },

  {
    name: "Vanoise National Park",
    link: "https://github.com/Michaeljaurigue/se_project_aroundtheus/blob/main/images/vanoise-national-park.png?raw=true",
  },

  {
    name: "Lago di Braies",
    link: "https://github.com/Michaeljaurigue/se_project_aroundtheus/blob/main/images/lago-di-braies.png?raw=true",
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

//Add a Location Pop Up Variables
const addLocationPopUp = document.querySelector(".modal_add-location");

const addLocationButton = document.querySelector(".profile__add-button");

const addLocationForm = document.querySelector(".modal__form-new-location");

//Add a Location Pop Up Functions

const openLocationModal = () => {
  openModal(addLocationPopUp);
};

addLocationButton.addEventListener("click", openLocationModal);

//Close a Location Pop Up Close Functions

function closeNewLocationModal() {
  closeModal(addLocationPopUp);
}

const closeNewLocationButton = document.querySelector(
  ".modal__close-new-location"
);

closeNewLocationButton.addEventListener("click", closeNewLocationModal);

//Save Location Variables and Functions
const saveLocationForm = document.querySelector(".modal_add-location");

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
const imageModal = document.querySelector(".modal_image");

//Image Pop Up Open Functions

const openImageModal = (evt, data) => {
  imagePreview.src = evt.target.src;
  imagePreview.alt = `Photo of ${data.name}`;
  imageText.textContent = data.name;
  openModal(imageModal);
};

//Image Pop Up Close Functions

const closeImageModalButton = document.querySelector(".modal__image-close");

const imagePreview = imageModal.querySelector(".modal__image-img");
const imageText = imageModal.querySelector(".modal__image-text");

function closeImageModal() {
  closeModal(imageModal);
}

closeImageModalButton.addEventListener("click", closeImageModal);
