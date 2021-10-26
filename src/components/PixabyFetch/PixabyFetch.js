// key 23221080-2cf2140e9411e0421a0100dec
// https://pixabay.com/api/?q=что_искать&page=номер_страницы&key=твой_ключ&image_type=photo&orientation=horizontal&per_page=12

import axios from 'axios';

export default class PixabayFetch {
  constructor() {
    this._searchQuery = '';
    this.page = 1;
  }

  get searchQuery() {
    return this._searchQuery;
  }
  set searchQuery(value) {
    return (this._searchQuery = value);
  }

  get searchPage() {
    return this.page;
  }

  set searchPage(value) {
    return (this.page = value);
  }

  resetPage() {
    return (this.page = 1);
  }

  searchPhotos() {
    const base_url = 'https://pixabay.com/api/';
    const api_key = '23221080-2cf2140e9411e0421a0100dec';

    const params = `?q=${this.searchQuery}&page=${this.page}&per_page=12&image_type=photo&orientation=horizontal&key=${api_key}`;
    const url = base_url + params;

    return axios
      .get(url)
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
      });
  }
}