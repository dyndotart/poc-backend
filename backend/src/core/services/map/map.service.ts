import * as d3Geo from 'd3-geo';
// @ts-ignore
import * as d3Tile from 'd3-tile';
import { mapTilerService } from './maptiler';
import { GeoJsonTile } from './tiles/GeoJsonTile';
import { TViewBox } from './types';

export const mapService = (() => {
  async function getGeoJsonTile(
    viewBox: TViewBox
  ): Promise<GeoJsonTile | null> {
    return mapTilerService.getGeoJsonTile(viewBox);
  }

  async function getGeoJsonTilesByProjection(
    long: number,
    lat: number
  ): Promise<{
    tiles: GeoJsonTile[];
    projection: d3Geo.GeoProjection;
  }> {
    const width = 500;
    const height = 500;

    // TODO calculate zoom

    // Calculate Projection
    const projection = d3Geo
      .geoMercator()
      .center([long, lat])
      .scale(Math.pow(2, 21) / (2 * Math.PI))
      .translate([width / 2, height / 2])
      .precision(0);

    // Calculate Tile view boxes to represent the projection
    const getTileViewBoxes = d3Tile
      .tile()
      .size([width, height])
      .scale(projection.scale() * 2 * Math.PI)
      .translate(projection([0, 0]));
    const tileViewBoxes = getTileViewBoxes();

    // Fetch Tiles to the Tile view boxes
    const tiles: GeoJsonTile[] = [];
    for (const viewBox of tileViewBoxes) {
      const tile = await getGeoJsonTile({
        x: viewBox[0],
        y: viewBox[1],
        z: viewBox[2],
      });
      if (tile != null) {
        tiles.push(tile);
      }
    }

    return { tiles, projection };
  }

  return { getGeoJsonTile, getGeoJsonTilesByProjection };
})();
