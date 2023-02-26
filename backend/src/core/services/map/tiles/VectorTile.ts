import { VectorTile as MapboxVectorTile } from '@mapbox/vector-tile';
import { Feature, FeatureCollection } from 'geojson';
import Pbf from 'pbf';
import { TViewBox } from '../types';
import { GeoJsonTile } from './GeoJsonTile';

export class VectorTile extends MapboxVectorTile {
  public readonly viewBox: TViewBox;

  constructor(pbf: Pbf, viewBox: TViewBox) {
    super(pbf);
    this.viewBox = viewBox;
  }

  public toGeoJson(): GeoJsonTile {
    const newLayers: Record<string, FeatureCollection> = {};

    // Map layers
    for (const layerKey of Object.keys(this.layers)) {
      const layer = this.layers[layerKey];
      const features: Feature[] = [];

      // Map features of layer
      for (let i = 0; i < layer.length; ++i) {
        const feature = layer
          .feature(i)
          .toGeoJSON(this.viewBox.x, this.viewBox.y, this.viewBox.z);
        if (feature != null) {
          features.push(feature);
        }
      }

      newLayers[layer.name] = {
        type: 'FeatureCollection',
        features,
      };
    }

    return new GeoJsonTile(newLayers, this.viewBox);
  }
}
