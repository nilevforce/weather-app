// @ts-check

import LocationWeatherDto from './location-weather.dto.js';

/**
 * @typedef {Object} CurrentWeatherDtoData
 * @property {LocationWeatherDto} location - Location details.
 * @property {Object} current - The current weather information.
 * @property {number} current.temperature - Current temperature (°C).
 * @property {number} current.feelsLike - Feels-like temperature (°C).
 * @property {number} current.humidity - Humidity (%).
 * @property {number} current.pressure - Pressure (mb).
 * @property {number} current.windSpeed - Wind speed (m/s).
 * @property {number} current.windGust - Wind gust speed (m/s).
 * @property {string} current.windDirection - Wind direction (e.g., "NW").
 * @property {number} current.cloudCoverage - Cloud coverage (%).
 * @property {number} [current.precipitation] - Precipitation (mm).
 * @property {number} [current.uvIndex] - UV index.
 * @property {number} current.visibility - Visibility (m).
 * @property {string} [current.conditionDescription] - Weather description.
 */

/**
 * DTO for transferring current weather information.
 */
class CurrentWeatherDto {
  /**
   * @param {CurrentWeatherDtoData} data - Current weather data.
   */
  constructor({ location, current }) {
    this.location = new LocationWeatherDto(location);
    this.current = {
      temperature: current.temperature,
      feelsLike: current.feelsLike,
      humidity: current.humidity,
      pressure: current.pressure,
      windSpeed: current.windSpeed,
      windGust: current.windGust,
      windDirection: current.windDirection,
      cloudCoverage: current.cloudCoverage,
      precipitation: current.precipitation,
      uvIndex: current.uvIndex,
      visibility: current.visibility,
      conditionDescription: current.conditionDescription,
    };
  }
}

export default CurrentWeatherDto;
