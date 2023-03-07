class UserInfo {
  constructor(name, about, picture) {
    this._name = name;
    this._about = about;
    this._picture = picture;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
    };
  }

  setUserInfo(name, about) {
    this._name.textContent = name;
    this._about.textContent = about;
  }

  setProfilePicture(picture) {
    this._picture = picture;
  }
}

export default UserInfo;
