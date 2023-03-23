export default class Api {
  constructor({ baseUrl, headers }) {
    // this._getInitialCards = this._getInitialCards.bind(this);
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._token = headers.authorization;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._token,
    }).then((res) => this._checkResponse(res));
  }

  updateProfileInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._token,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => this._checkResponse(res));
  }

  //Old Code
  // getInitialCards() {
  //   return fetch(`${this._baseUrl}/cards`, {
  //     method: "GET",
  //     headers: this._token,
  //   }).then((res) => this._checkResponse(res));
  // }

  getInitialCards() {
    // console.log(this._baseUrl);
    // console.log(this._token);
    // console.log(this._headers);
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._token,
    }).then((res) => {
      console.log(res);
      return this._checkResponse(res);
    });
  }

  addNewCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._token,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => this._checkResponse(res));
  }

  showLikes(likes) {
    return (
      fetch(`${this._baseUrl}/cards`),
      {
        method: "GET",
        headers: this._token,
        body: JSON.stringify({
          likes,
        }),
      }
    );
  }
}

// const api = new Api({
//   baseUrl: "https://swapi.dev/api/",
//   headers: {
//     // authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
//     // "Content-Type": "application/json",
//   },
// });

//   getInitialCards() {
//     return fetch("https://around.nomoreparties.co/v1/group-42/cards", {
//       headers: {
//         authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
//       },
//     })
//       .then((res) => {
//         if (res.ok) {
//           return res.json();
//         } else {
//           throw new Error(
//             `Failed to fetch cards: ${res.status} ${res.statusText}`
//           );
//         }
//       })
//       .catch((err) => {
//         console.error(err); // log the error to the console
//       });

// other methods for working with the API
