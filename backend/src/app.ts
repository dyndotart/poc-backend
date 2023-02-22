import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import logger from 'morgan';
import config from './environment/config';
import errorMiddlewares from './middlewares/error';
import { rateLimiterMiddleware } from './middlewares/security/rate-limiter.middleware';
import routes from './routes';

// Init Express App
const { app } = (() => {
  const app = express();

  // Logging Middleware
  app.use(logger('dev'));

  // Protect app from some well-known web vulnerabilities
  app.use(helmet());

  // Cors Middleware
  app.use(
    cors({
      origin: config.app.corsOrigins,
      credentials: true, // Access-Control-Allow-Credentials
    })
  );

  // This setting will reveal the real IP address of the user, so we can apply rate limiting.
  app.set('trust proxy', 1);

  // Rate Limiter Middleware
  app.use(rateLimiterMiddleware);

  // Parse JSON Body Middleware
  app.use(bodyParser.json());

  // Routes
  app.use('/', routes);

  // Error Handling Middleware's
  errorMiddlewares.map((errorMiddleware) => {
    app.use(errorMiddleware);
  });

  return { app };
})();

export default app;
