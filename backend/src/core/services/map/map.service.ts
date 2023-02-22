import { mapTilerService } from './maptiler';
import { GeoJsonTile } from './tiles/GeoJsonTile';
import { TViewBox } from './types';

export const mapService = (() => {
  async function getGeoJsonTile(
    viewBox: TViewBox
  ): Promise<GeoJsonTile | null> {
    return mapTilerService.getGeoJsonTile(viewBox);
  }

  return { getGeoJsonTile };
})();
