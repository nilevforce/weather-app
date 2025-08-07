import WeatherService from '../../services/weather/weather.service.js';

/**
 * Controller for handling current weather requests.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>}
 */
const getForecastWeather = async (req, res) => {
  const { city, lang } = req.query;
  const data = await WeatherService.getForecastWeatherByCity({ city, lang });
  res.status(200).json(data);
};

export default getForecastWeather;
