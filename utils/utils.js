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

export { openModal, closeModal, hideModalOnRemoteClick, hideModalOnEscape };
