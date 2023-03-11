import axios from 'axios';
import Pbf from 'pbf';
import mapConfig from '../../../../environment/config/map.config';
import { mapAxiosError } from '../../../../utils/map-error';
import { TViewBox } from '../types';

export const mapTilerApi = (() => {
  const apiKey = mapConfig.mapTiler.auth.apiKey;
  const apiEndpoint = mapConfig.mapTiler.baseUrl;

  async function getVectorTileAsPBF(viewBox: TViewBox): Promise<Pbf | null> {
    try {
      // Set up headers
      const headers = {};

      // Send request
      const endpoint = `${apiEndpoint}/tiles/v3/${viewBox.z}/${viewBox.x}/${viewBox.y}.pbf`;
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
