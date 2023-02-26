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
    lat: number,
    zoom = 21
  ): Promise<{
    tiles: GeoJsonTile[];
    projection: d3Geo.GeoProjection;
  }> {
    // TODO pass as props.. size of canvas
    const width = 600;
    const height = 600;

    // Calculate Projection
    const projection = d3Geo
      .geoMercator()
      .center([long, lat]) // Long, Lat of Location to zoom out
      .scale(Math.pow(2, zoom) / (2 * Math.PI))
      .translate([width / 2, height / 2])
      .precision(0);

    // Calculate Tile view boxes to represent the projection
    const getTileViewBoxes = d3Tile
      .tile()
      .tileSize(512)
      .size([width, height])
      .scale(Math.pow(2, zoom))
      // .scale(projection.scale() * 2 * Math.PI)
      .translate(projection([0, 0]))
      .zoomDelta(1);
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
