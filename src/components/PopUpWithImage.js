import Popup from "./Popup.js";

export default class PopUpWithImage extends Popup {
  open(name, link) {
    this._popupElement.querySelector(".modal__image-text").textContent =
      name.name;
    this._popupElement.querySelector(".modal__image-img").src = name.link;
    this._popupElement.querySelector(
      ".modal__image-img"
    ).alt = `Image of ${name}`;

    super.open();
  }
}
