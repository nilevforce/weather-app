// @ts-check

import LocationWeatherDto from './location-weather.dto.js';

/**
 * @typedef {Object} DailyForecastWeatherDtoData
 * @property {string} date - Forecast date (ISO 8601).
 * @property {number} maxTemp - Max temperature (°C).
 * @property {number} minTemp - Min temperature (°C).
 * @property {number} avgTemp - Avg temperature (°C).
 * @property {number} maxWindSpeed - Max wind speed (m/s).
 * @property {number} totalPrecipitation - Total precipitation (mm).
 * @property {number} avgHumidity - Avg humidity (%).
 * @property {number} chanceOfRain - Rain chance (%).
 * @property {string} conditionDescription - Weather description.
 * @property {number} uvIndex - UV index.
 * @property {Array<HourlyForecastWeatherDtoData>} [hourly] - Hourly data.
 */

/**
 * @typedef {Object} HourlyForecastWeatherDtoData
 * @property {number} timestamp - Local time (Unix).
 * @property {string} localtime - Date and time.
 * @property {number} temperature - Temperature (°C).
 * @property {number} windSpeed - Wind speed (m/s).
 * @property {string} windDirection - Wind direction.
 * @property {number} precipitation - Precipitation (mm).
 * @property {number} chanceOfRain - Rain chance (%).
 * @property {string} conditionDescription - Weather description.
 */

/**
 * @typedef {Object} ForecastWeatherDtoData
 * @property {LocationWeatherDto} location - Location details.
 * @property {Array<DailyForecastWeatherDtoData>} forecast - Array of daily forecast data.
 */

class ForecastWeatherDto {
  /**
   * @param {ForecastWeatherDtoData} data - Forecast weather data.
   */
  constructor({ location, forecast }) {
    this.location = new LocationWeatherDto(location);
    this.forecast = forecast.map((day) => ({
      date: day.date,
      maxTemp: day.maxTemp,
      minTemp: day.minTemp,
      avgTemp: day.avgTemp,
      maxWindSpeed: day.maxWindSpeed,
      totalPrecipitation: day.totalPrecipitation,
      avgHumidity: day.avgHumidity,
      chanceOfRain: day.chanceOfRain,
      conditionDescription: day.conditionDescription,
      uvIndex: day.uvIndex,
      hourly: day.hourly?.map((hour) => ({
        timestamp: hour.timestamp,
        localtime: hour.localtime,
        temperature: hour.temperature,
        windSpeed: hour.windSpeed,
        windDirection: hour.windDirection,
        precipitation: hour.precipitation,
        chanceOfRain: hour.chanceOfRain,
        conditionDescription: hour.conditionDescription,
      })),
    }));
  }
}

export default ForecastWeatherDto;
