class Api {
  constructor(baseURL, authToken) {
    this._baseURL = baseURL;
    this._authToken = authToken;
    this._headers = {
      authorization: authToken,
      "Content-Type": "application/json",
    };
  }

  async _request(url, options) {
    const res = await fetch(url, options);
    return this._processServerResponse(res);
  }

  _processServerResponse = (res) => {
    if (res.ok) {
      return res.json();
    }

    console.log(`Error: ${res.status}`);
    return Promise.reject(`Error: ${res.status}`);
  };

  async getInitialCards() {
    const res = await fetch(`${this._baseURL}/cards`, {
      method: "GET",
      headers: this._headers,
    });
    return this._processServerResponse(res);
  }

  async getUserInfo() {
    const res = await fetch(`${this._baseURL}/users/me`, {
      method: "GET",
      headers: this._headers,
    });
    return this._processServerResponse(res);
  }

  async getApiInfo() {
    const res = await Promise.all([this.getUserInfo(), this.getInitialCards()]);
    return this._processServerResponse(res);
  }

  async setUserInfo(data) {
    const res = await fetch(`${this._baseURL}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
    return this._processServerResponse(res);
  }

  async setAvatar(data) {
    const res = await fetch(`${this._baseURL}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data,
      }),
    });
    return this._processServerResponse(res);
  }

  async addCard(data) {
    const res = await fetch(`${this._baseURL}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
    return this._processServerResponse(res);
  }

  async deleteCard(data) {
    const res = await fetch(`${this._baseURL}/cards/${data}`, {
      method: "DELETE",
      headers: this._headers,
    });
    return this._processServerResponse(res);
  }

  async addLike(data) {
    const res = await fetch(`${this._baseURL}/cards/likes/${data}`, {
      method: "PUT",
      headers: this._headers,
    });
    return this._processServerResponse(res);
  }

  async removeLike(data) {
    const res = await fetch(`${this._baseURL}/cards/likes/${data}`, {
      method: "DELETE",
      headers: this._headers,
    });
    return this._processServerResponse(res);
  }
}

export default Api;
