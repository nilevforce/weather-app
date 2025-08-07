import { WeatherApiAdapter } from './providers/index.js';
import {
  CurrentWeatherDto,
  ForecastWeatherDto,
} from '../../dtos/weather/index.js';

/**
 * Service for retrieving weather data from the provider.
 */
class WeatherService {
  constructor() {
    this.provider = new WeatherApiAdapter();
  }

  /**
   * Gets current weather data by city name.
   * @param {Object} params
   * @param {string} params.city - City name.
   * @param {string} [params.lang] - Language code for the response.
   * @returns {Promise<CurrentWeatherDto>} Weather data.
   */
  async getCurrentWeatherByCity({ city, lang }) {
    const data = await this.provider.getCurrentWeatherByCity({ city, lang });
    return data;
  }

  /**
   * Gets current weather data by city name.
   * @param {Object} params
   * @param {string} params.city - City name.
   * @param {string} [params.lang] - Language code for the response.
   * @returns {Promise<ForecastWeatherDto>} Forecast weather data.
   */
  async getForecastWeatherByCity({ city, lang }) {
    const data = await this.provider.getForecastWeatherByCity({ city, lang });
    return data;
  }
}

export default new WeatherService();
