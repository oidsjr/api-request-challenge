import axios from 'axios';

export default class RequestsFactory {
  constructor(token = localStorage.getItem('github_token')) {
    this.token = token;
    localStorage.setItem('github_token', this.token || '');

    this.defaultConfig = {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    };

    if (!this.token) return;
    this.defaultConfig.headers.Authorization = `token ${this.token}`;
  }

  baseUrl = 'https://api.github.com';

  getHeaders(headers) {
    return { ...this.defaultConfig.headers, ...headers };
  }

  config(config) {
    return {
      ...this.defaultConfig,
      headers: this.getHeaders((config && config.headers) || {}),
    };
  }

  get(url, config = {}) {
    return axios.get(`${this.baseUrl}${url}`, this.config(config)).then((result) => result.data);
  }

  post(url, data = {}, config = {}) {
    return axios.post(`${this.baseUrl}${url}`, data, this.config(config)).then((result) => result.data);
  }

  patch(url, config = {}) {
    return axios.patch(`${this.baseUrl}${url}`, this.config(config)).then((result) => result.data);
  }

  delete(url, config = {}) {
    return axios.delete(`${this.baseUrl}${url}`, this.config(config)).then((result) => result.data);
  }

  put(url, data = {}, config = {}) {
    return axios.put(`${this.baseUrl}${url}`, data, this.config(config)).then((result) => result.data);
  }
}
