import axios from 'axios';
import logger from '../logger.js';
import { HttpClientError } from '../../errors/app/index.js';

class AxiosAdapter {
  /**
   * @param {number} [timeout=10000] - Request timeout in milliseconds.
   */
  constructor(timeout = 10000) {
    this.client = axios.create({
      timeout,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async get(url, options = {}) {
    try {
      const response = await this.client.get(url, options);
      return response.data;
    } catch (error) {
      throw AxiosAdapter.handleError(error, url);
    }
  }

  static handleError(error, url) {
    if (error.response) {
      logger.error(
        `Axios response error: ${error.response.status} ${error.response.statusText}`,
        {
          url: error.config?.url || url,
          status: error.response.status,
          data: error.response.data,
          code: error.code,
        },
      );
      throw new HttpClientError({
        message: `HTTP Axios response error: ${error.response.statusText || 'Unknown error'}`,
        status: error.response.status,
        code: error.code || null,
        url: error.config?.url || url,
        body: error.response.data,
        cause: error,
      });
    }

    if (error.request) {
      logger.error(
        'Axios no response received from server',
        {
          url: error.config?.url || url,
          code: error.code,
        },
      );
      throw new HttpClientError({
        message: 'HTTP Axios no response received from server',
        status: null,
        code: error.code || null,
        url: error.config?.url || url,
        body: null,
        cause: error,
      });
    }

    logger.error(
      `Axios request setup error: ${error.message}`,
      {
        url,
        code: error.code,
      },
    );
    throw new HttpClientError({
      message: `HTTP Axios request setup error: ${error.message}`,
      status: null,
      code: error.code || null,
      url,
      body: null,
      cause: error,
    });
  }
}

export default AxiosAdapter;
