import { GeoJsonTile } from '../tiles/GeoJsonTile';
import { VectorTile } from '../tiles/VectorTile';
import { TViewBox } from '../types';
import { mapTilerApi } from './api.service';

export const mapTilerService = (() => {
  async function getVectorTile(viewBox: TViewBox): Promise<VectorTile | null> {
    // Query "Protocolbuffer Binary Format" for view box
    const pbf = await mapTilerApi.getVectorTileAsPBF(viewBox);
    if (pbf == null) return null;

    // Parse PBF to Vector Tile
    return new VectorTile(pbf, viewBox);
  }

  async function getGeoJsonTile(
    viewBox: TViewBox
  ): Promise<GeoJsonTile | null> {
    // Query Vector Tile for view box
    const vectorTile = await getVectorTile(viewBox);
    if (vectorTile == null) return null;

    // Parse Vector Tile to GeoJson Vector Tile
    return vectorTile.toGeoJson();
  }

  return { getVectorTile, getGeoJsonTile };
})();
