// @ts-check

/**
 * @typedef {Object} LocationWeatherDtoData
 * @property {string} name - Location name (e.g., "London").
 * @property {number} lat - Latitude.
 * @property {number} lon - Longitude.
 * @property {number} timestamp - Local time (Unix).
 */

/**
 * DTO for transferring location information.
 */
class LocationWeatherDto {
  /**
   * @param {LocationWeatherDtoData} data - Location data.
   */
  constructor(data) {
    this.name = data.name;
    this.lat = data.lat;
    this.lon = data.lon;
    this.timestamp = data.timestamp;
  }
}

export default LocationWeatherDto;
