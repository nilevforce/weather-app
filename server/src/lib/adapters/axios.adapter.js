// src/lib/adapters/axios.adapter.js
import axios from 'axios';

class AxiosAdapter {
  /**
   * Creates an instance of AxiosAdapter.
   * @param {number} [timeout=10000] - Request timeout in milliseconds.
   */
  constructor(timeout = 10000) {
    this.client = axios.create({
      timeout,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async get(url, options = {}) {
    const response = await this.client.get(url, options);
    return response.data;
  }
}

export default AxiosAdapter;
