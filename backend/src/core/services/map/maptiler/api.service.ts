import axios from 'axios';
import mapConfig from '../../../../config/map.config';
import { mapAxiosError } from '../../../../utils/map-error';

export const mapTilerApi = (() => {
  const apiKey = mapConfig.mapTiler.apiKey;
  const apiEndpoint = mapConfig.mapTiler.baseUrl;

  async function getVectorTileAsPBF(
    x: number,
    y: number,
    z: number
  ): Promise<string | null> {
    try {
      // Set up headers
      const headers = {};

      // Sent request
      const response = await axios.get(
        `${apiEndpoint}/tiles/v3/${z}/${x}/${y}.pbf`,
        {
          headers,
          params: {
            key: apiKey,
          },
        }
      );

      return response.data;
    } catch (e) {
      mapAxiosError(e);
    }

    return null;
  }

  return { getVectorTileAsPBF };
})();
