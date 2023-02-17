import { createServer as createHttpServer } from 'http';
import app from './app';
import config, { STAGE } from './config';

export const { httpServer } = (() => {
  const PORT = config.app.port;

  // Create http server
  // https://expressjs.com/en/api.html
  const httpServer = createHttpServer();

  // Create https server
  // Note: Https will be configured through 'nginx'
  // const httpsServer = createHttpsServer();

  // Listen on specified port, on all network interfaces
  httpServer.listen(PORT);
  httpServer.on('error', (error) => {
    throw error;
  });
  httpServer.on('listening', () => {
    console.log(`Running on Port: ${PORT}`);
  });

  // Assign ExpressJs as request listener to the just created http server
  app.set('port', PORT);
  httpServer.on('request', app);

  return { httpServer };
})();
