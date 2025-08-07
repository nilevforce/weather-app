// @ts-check

import config from '../../../config/config.js';
// import HttpError from '../../../errors/HttpError.js';
// import ApiError from '../../../errors/ApiError.js';
import HttpClient from '../../../lib/http-client.js';
import {
  CurrentWeatherDto,
  ForecastWeatherDto,
} from '../../../dtos/weather/index.js';

/**
 * Adapter for fetching weather data from WeatherAPI.
 */
class WeatherApiAdapter {
  constructor() {
    this.baseUrl = 'http://api.weatherapi.com/v1';
    this.apiKey = config.weatherapiApiKey;
  }

  /**
   * Gets current weather data by city name from WeatherAPI.
   * @param {Object} params
   * @param {string} params.city - City name.
   * @param {string} [params.lang] - Language code for the response.
   * @returns {Promise<CurrentWeatherDto>}  Current weather data DTO.
   */
  async getCurrentWeatherByCity({ city, lang = 'en' }) {
    const query = new URLSearchParams({
      q: city,
      key: this.apiKey,
      lang,
    });

    const url = `${this.baseUrl}/current.json?${query}`;

    const response = await HttpClient.get(url);

    return new CurrentWeatherDto({
      location: {
        name: response.location.name,
        lat: response.location.lat,
        lon: response.location.lon,
        timestamp: response.location.localtime_epoch,
      },
      current: {
        temperature: response.current.temp_c,
        feelsLike: response.current.feelslike_c,
        humidity: response.current.humidity,
        pressure: response.current.pressure_mb,
        windSpeed: Math.round(parseFloat(response.current.wind_kph) / 3.6),
        windGust: Math.round(parseFloat(response.current.gust_kph) / 3.6),
        windDirection: response.current.wind_dir,
        cloudCoverage: response.current.cloud,
        precipitation: response.current.precip_mm,
        uvIndex: response.current.uv,
        visibility: parseFloat(response.current.vis_km) * 1000,
        conditionDescription: response.current.condition.text,
      },
    });
  }

  /**
   * Gets current weather data by city name from WeatherAPI.
   * @param {Object} params
   * @param {string} params.city - City name.
   * @param {string} [params.lang] - Language code for the response.
   * @param {number} params.days
   * @returns {Promise<ForecastWeatherDto>} Weather data DTO.
   */
  async getForecastWeatherByCity({ city, lang = 'en', days = 10 }) {
    const query = new URLSearchParams({
      q: city,
      key: this.apiKey,
      lang,
      days: String(days),
    });

    const url = `${this.baseUrl}/forecast.json?${query}`;

    const response = await HttpClient.get(url);

    return new ForecastWeatherDto({
      location: {
        name: response.location.name,
        lat: response.location.lat,
        lon: response.location.lon,
        timestamp: response.location.localtime_epoch,
      },
      forecast: response.forecast.forecastday.map((day) => ({
        date: day.date,
        maxTemp: day.day.maxtemp_c,
        minTemp: day.day.mintemp_c,
        avgTemp: day.day.avgtemp_c,
        maxWindSpeed: Math.round(parseFloat(day.day.maxwind_mph) / 3.6),
        totalPrecipitation: day.day.totalprecip_mm,
        avgHumidity: day.day.avghumidity,
        chanceOfRain: day.day.daily_chance_of_rain,
        conditionDescription: day.day?.condition?.text,
        uvIndex: day.day.uv,
        hourly: day.hour.map((hour) => ({
          timestamp: hour.time_epoch,
          localtime: hour.time,
          temperature: hour.temp_c,
          windSpeed: Math.round(parseFloat(hour.wind_mph) / 3.6),
          windDirection: hour.wind_dir,
          precipitation: hour.precip_mm,
          chanceOfRain: hour.chance_of_rain,
          conditionDescription: hour?.condition?.text,
        })),
      })),
    });
  }
}

export default WeatherApiAdapter;
