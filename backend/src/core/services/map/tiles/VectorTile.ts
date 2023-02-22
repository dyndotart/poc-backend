import { VectorTile as MapboxVectorTile } from '@mapbox/vector-tile';
import { FeatureCollection } from 'geojson';
import Pbf from 'pbf';
import { TViewBox } from '../types';
import { GeoJsonTile } from './GeoJsonTile';

export class VectorTile extends MapboxVectorTile {
  public readonly viewBox: TViewBox;

  constructor(pbf: Pbf, viewBox: TViewBox) {
    super(pbf);
    this.viewBox = viewBox;
  }

  public toGeoJson() {
    const layers: Record<string, FeatureCollection> = {};

    Object.values(this.layers).forEach((layer) => {
      const features = Array.from(Array(layer._features.length), (v, i) => {
        return layer
          .feature(i)
          .toGeoJSON(this.viewBox.x, this.viewBox.y, this.viewBox.z);
      });
      layers[layer.name] = {
        type: 'FeatureCollection',
        features,
      };
    });

    return new GeoJsonTile(layers, this.viewBox);
  }
}
