import express from 'express';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import middlewares from './middlewares/index.js';
import authRouter from './routes/auth.routes.js';
import usersRouter from './routes/users.routes.js';
import weatherRouter from './routes/weather.routes.js';

const app = express();

const swaggerDocument = YAML.load(`${process.cwd()}/swagger.yaml`);

app.use(middlewares.generalLimiter);
app.use(middlewares.json);
app.use(middlewares.cors);
app.use(cookieParser());
app.use(middlewares.requestLogger);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', middlewares.auth, usersRouter);
app.use('/api/v1/weather', middlewares.auth, weatherRouter);

app.get('/api/ping', async (req, res) => {
  res.status(200).send('PONG');
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
