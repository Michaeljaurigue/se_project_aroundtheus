class UserInfo {
  constructor(name, about, picture) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
    this._picture = document.querySelector(picture);
  }
  
  getUserInfo() {
    return { name: this._name.textContent, about: this._about.textContent };
  }

  setUserInfo(name, about) {
    this._name.textContent = name;
    this._about.textContent = about;
  }

  setProfilePicture(data) {
    this._picture.src = data;
  }
}

export default UserInfo;
