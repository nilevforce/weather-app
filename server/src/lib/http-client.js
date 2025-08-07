import AxiosAdapter from './adapters/axios.adapter.js';

class HttpClient {
  constructor(adapter) {
    this.adapter = adapter;
  }

  /**
   * Performs a GET request.
   * @param {string} url - The URL to request.
   * @param {Object} [options] - Optional configuration for the request.
   * @returns {Promise<Object>} The response data.
   */
  async get(url, options) {
    return this.adapter.get(url, options);
  }

  /**
   * Performs a POST request.
   * @param {string} url - The URL to request.
   * @param {Object} data - The data to send in the request body.
   * @param {Object} [options] - Optional configuration for the request.
   * @returns {Promise<Object>} The response data.
   */
  async post(url, data, options) {
    return this.adapter.post(url, data, options);
  }
}

const httpClient = new HttpClient(new AxiosAdapter());

export default httpClient;
