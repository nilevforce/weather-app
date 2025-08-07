import WeatherService from '../../services/weather/weather.service.js';

/**
 * Controller for handling current weather requests.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>}
 */
const getCurrentWeather = async (req, res) => {
  const { city, lang } = req.query;
  const data = await WeatherService.getCurrentWeatherByCity({ city, lang });
  res.status(200).json(data);
};

export default getCurrentWeather;
