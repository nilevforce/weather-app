import express from 'express';
import schemas from '../schemas/index.js';
import middlewares from '../middlewares/index.js';
import weatherController from '../controllers/weather/index.js';

const router = express.Router();

router.get(
  '/',
  middlewares.validateRequest(schemas.weatherQuerySchema, 'query'),
  weatherController.getCurrentWeather,
);

router.get(
  '/forecast',
  middlewares.validateRequest(schemas.weatherQuerySchema, 'query'),
  weatherController.getForecastWeather,
);

export default router;
