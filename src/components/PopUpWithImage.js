import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupElement.querySelector(".modal__image-img");
    this._modalImageDescription =
      this._popupElement.querySelector(".modal__image-text");
  }
 
  open(name, link) {
    super.open();
    this._image.alt = name;
    this._image.src = link;
    this._modalImageDescription.textContent = name;
  }
}

export default PopupWithImage;
