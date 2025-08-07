import app from './app.js';
import config from './config/config.js';
import logger from './lib/logger.js';
import prisma from './lib/prisma.js';

const PORT = config.appPort;

process.on('uncaughtException', (err) => {
  logger.error(err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  logger.error(err);
  process.exit(1);
});

const startServer = async () => {
  try {
    await prisma.$connect();

    app.listen(PORT, () => {
      logger.info(`App is listening on PORT: ${PORT}`);
    });
  } catch (error) {
    logger.error(`Error starting app: ${error}`);
    process.exit(1);
  }
};

startServer();
