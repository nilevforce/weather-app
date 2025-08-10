// @ts-check

import config from '../../../config/config.js';
import { NotFoundError, ServiceUnavailableError } from '../../../errors/api/index.js';
import { HttpClientError } from '../../../errors/app/index.js';
import HttpClient from '../../../lib/http-client.js';
import {
  CurrentWeatherDto,
  ForecastWeatherDto,
} from '../../../dtos/weather/index.js';

export const WEATHER_API_ERRORS = {
  1002: 'API key not provided.',
  1003: "Parameter 'q' not provided.",
  1005: 'API request url is invalid.',
  1006: "No location found matching parameter 'q'.",
  2006: 'API key provided is invalid.',
  2007: 'API key has exceeded calls per month quota.',
  2008: 'API key has been disabled.',
  2009: 'API key does not have access to the resource. Please check pricing page for what is allowed in your API subscription plan.',
  9000: 'Json body passed in bulk request is invalid. Please make sure it is valid json with utf-8 encoding.',
  9001: 'Json body contains too many locations for bulk request. Please keep it below 50 in a single request.',
  9999: 'Internal application error.',
};

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
    try {
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
    } catch (error) {
      if (error instanceof HttpClientError) {
        const errorJson = error.toJSON();
        const httpStatusCode = errorJson.status;
        const errorCode = errorJson.body.error.code;

        if (httpStatusCode === 400 && errorCode === 1006) {
          throw new NotFoundError({
            message: 'No matching location found',
          });
        }
      }

      throw new ServiceUnavailableError({
        message: 'The weather forecasting service is temporarily unavailable',
      });
    }
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
    try {
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
    } catch (error) {
      if (error instanceof HttpClientError) {
        const errorJson = error.toJSON();
        const httpStatusCode = errorJson.status;
        const errorCode = errorJson.body.error.code;

        if (httpStatusCode === 400 && errorCode === 1006) {
          throw new NotFoundError({
            message: 'No matching location found.',
          });
        }
      }

      throw new ServiceUnavailableError({
        message: 'The weather forecasting service is temporarily unavailable',
      });
    }
  }
}

export default WeatherApiAdapter;
