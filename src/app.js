import express from 'express';
import cookieParser from 'cookie-parser';
import middlewares from './middlewares/index.js';
import authRouter from './routes/auth.routes.js';
import usersRouter from './routes/users.routes.js';

const app = express();

app.use(middlewares.json);
app.use(middlewares.cors);
app.use(cookieParser());
app.use(middlewares.requestLogger);

app.use('/api/auth', authRouter);
app.use('/api/users', middlewares.auth, usersRouter);

app.get('/api/ping', async (req, res) => {
  res.status(200)
    .json({ ok: true, data: 'pong' });
});

app.use(middlewares.errorHandler);

export default app;
