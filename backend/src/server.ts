import { createServer as createHttpServer } from 'http';
import { initRemotionSSR } from './core/media';
import config from './environment/config';

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
  // as soon as some async modules have been loaded
  onLoadedAsync(async () => {
    const { default: app } = await import('./app');
    app.set('port', PORT);
    httpServer.on('request', app);
  });

  return { httpServer };
})();

async function onLoadedAsync(callback: () => void) {
  console.log('Initializing async modules...');

  // Init Remotion
  await initRemotionSSR();

  callback();
  console.log('Initialized async modules.');
}
