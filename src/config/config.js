import 'dotenv/config';

const {
  REDIS_URL,
  DATABASE_URL,
  APP_PORT,
  LOG_LEVEL,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
} = process.env;

if (!REDIS_URL) throw new Error('The REDIS_URL environment variable is not defined.');
if (!DATABASE_URL) throw new Error('The DATABASE_URL environment variable is not defined.');
if (!APP_PORT) throw new Error('The APP_PORT environment variable is not defined.');
if (!LOG_LEVEL) throw new Error('The LOG_LEVEL environment variable is not defined.');
if (!JWT_ACCESS_SECRET) throw new Error('The JWT_ACCESS_SECRET environment variable is not defined.');
if (!JWT_REFRESH_SECRET) throw new Error('The JWT_REFRESH_SECRET environment variable is not defined.');

const config = {
  appPort: APP_PORT,
  logLevel: LOG_LEVEL,
  redisUrl: REDIS_URL,
  jwtAccessSecret: JWT_ACCESS_SECRET,
  jwtRefreshSecret: JWT_REFRESH_SECRET,
};

export default config;
