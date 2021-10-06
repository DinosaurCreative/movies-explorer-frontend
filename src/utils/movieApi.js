import beatfilmApiURL from './constants';

export class MovieApi {
  constructor({ address, headers}) {
    this._address = address;
    this._headers = headers;
  }

  _checkServerResponse(item) {
    if(item.ok) {
      return item.json();
    } else {
      return Promise.reject(item.status);
    }
  }

  getMovies() {
    return fetch(`${this._address}`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    })
    .then(res => this._checkServerResponse(res))
  }
}

export default MovieApi;