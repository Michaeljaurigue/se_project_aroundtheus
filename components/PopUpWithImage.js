import Popup from "./PopUp.js";

class PopUpWithImage extends Popup {
  open(name, link) {
    this._popupElement.querySelector(".modal__image-img").src = link;
    this._popupElement.querySelector(".modal__image-img").alt = name;
    this._popupElement.querySelector(".modal__image-text").textContent = name;
    super.open();
  }
}

export default PopUpWithImage;
