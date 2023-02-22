import { FeatureCollection } from 'geojson';
import { TViewBox } from '../types';

export class GeoJsonTile {
  public readonly viewBox: TViewBox;
  public readonly layers: Record<string, FeatureCollection>;

  constructor(layers: Record<string, FeatureCollection>, viewBox: TViewBox) {
    this.layers = layers;
    this.viewBox = viewBox;
  }
}
