import axios from 'axios';
import Pbf from 'pbf';
import mapConfig from '../../../../environment/config/map.config';
import { mapAxiosError } from '../../../../utils/map-error';

export const mapTilerApi = (() => {
  const apiKey = mapConfig.mapTiler.apiKey;
  const apiEndpoint = mapConfig.mapTiler.baseUrl;

  async function getVectorTileAsPBF(
    x: number,
    y: number,
    z: number
  ): Promise<Pbf | null> {
    try {
      // Set up headers
      const headers = {};

      // Sent request
      const endpoint = `${apiEndpoint}/tiles/v3/${z}/${x}/${y}.pbf`;
      const response = await axios.get(endpoint, {
        headers,
        responseType: 'arraybuffer',
        params: {
          key: apiKey,
        },
      });
      const data = response.data;

      if (data instanceof ArrayBuffer || data instanceof Uint8Array) {
        return new Pbf(data);
      }
    } catch (e) {
      mapAxiosError(e);
    }

    return null;
  }

  return { getVectorTileAsPBF };
})();
