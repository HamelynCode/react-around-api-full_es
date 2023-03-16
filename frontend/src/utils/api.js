class Api {
  constructor({ user, url }) {
    this._user = user;
    this._url = url;
    this._token = "";
  }

  _makeRequest(method, url, body) {
    return fetch(`${this._url}${url}`, {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Content-Security-Policy': 'default-src self; img-src *; script-src self',
        'Authorization': `Bearer ${this._token}`,
      },
      body: method !== "GET" ? JSON.stringify(body) : undefined,
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject(`Error: ${res.statusText}`);
    });
  }

  setAuthorizationToken(token) {
    this._token = token;
  }

  getUserInfo() {
    return this._makeRequest("GET", `/users/${this._user}`);
  }

  getInitialCards() {
    return this._makeRequest("GET", "/cards");
  }

  editProfile(name, about) {
    return this._makeRequest("PATCH", `/users/${this._user}`, {
      name: name,
      about: about,
    });
  }

  addNewCard(name, url) {
    return this._makeRequest("POST", `/cards`, {
      name: name,
      link: url,
    });
  }

  deleteCard(cardId) {
    return this._makeRequest("DELETE", `/cards/${cardId}`);
  }

  addNewLike(cardId) {
    return this._makeRequest("PUT", `/cards/${cardId}/likes`);
  }

  removeLike(cardId) {
    return this._makeRequest("DELETE", `/cards/${cardId}/likes`);
  }

  setProfileImage(url) {
    return this._makeRequest("PATCH", `/users/${this._user}/avatar`, {
      avatar: url,
    });
  }
}

const api = new Api({
  user: 'me',
  url: 'https://20.0.187.166/api'
});

export default api;