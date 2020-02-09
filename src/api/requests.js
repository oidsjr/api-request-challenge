import axios from 'axios';

export default class RequestsFactory {
  baseUrl = 'https://api.github.com';

  defaultConfig = {
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `token ${process.env.VUE_APP_GITHUB_TOKEN}`,
    },
  };

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
