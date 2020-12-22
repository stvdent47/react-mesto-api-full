class Api {
  constructor({ url }) {
    this._url = url;
  }
  /**
   * checking on errors: if a fetch is ok, returns json, if not shows an error
   */
  _checkErrors(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(
        `Something is wrong: 4 8 15 16 23 42 && ${res.status} ${res.statusText}`
      );
    }
  }
  /**
   * editing user profile info on the server
   */
  updateUser(info) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: info.name,
        about: info.about,
        id: info.id,
      }),
    }).then(this._checkErrors);
  }
  /**
   * updating profile avatar on the server
   */
  updateUserAvatar({ avatarUrl, userId }) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatarUrl,
        userId,
      }),
    }).then(this._checkErrors);
  }
  /**
   * getting cards from the server
   */
  getCards(token) {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(this._checkErrors);
  }
  /**
   * adding a new card to the server
   */
  createCard({ name, link, userId }) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        link,
        userId
      }),
    }).then(this._checkErrors);
  }
  /**
   * removing a card from the server
   */
  deleteCard(cardId, userId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
      }),
    }).then(this._checkErrors);
  }
  /**
   * @description this method sends a fetch request adding or removing like depending on whether a card is liked or not
   * @param {*} cardId is used to identify a card that is to changed
   * @param {*} isLiked is used to identify whether a card is liked or not
   */
  changeLikeCardStatus(cardId, isLiked, userId) {
    if (isLiked) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
        }),
      }).then(this._checkErrors);
    } else {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
        }),
      }).then(this._checkErrors);
    }
  }
}

const api = new Api({
  url: env.BASE_URL,
});
export default api;
