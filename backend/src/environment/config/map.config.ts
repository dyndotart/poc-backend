const mapTilerAPIKey = process.env.MAP_MAP_TILER_API_KEY;

export default {
  mapTiler: {
    auth: {
      apiKey: mapTilerAPIKey,
    },
    baseUrl: 'https://api.maptiler.com',
  },
};
