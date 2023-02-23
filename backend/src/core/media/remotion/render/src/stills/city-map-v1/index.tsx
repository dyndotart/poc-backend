import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import React from 'react';
import { buildFeatureFilter, getStyleFuncs } from '../../core/map/tile-stencil';

function findHighway(key: string) {
  return [
    'highway_motorway_inner',
    'highway-motorway-casing',
    'road_major_motorway',
    'transportation',
    'road_motorway_casing',
  ].includes(key);
}

const CityMapV1: React.FC<TProps> = (props) => {
  const { geojson, mapStyle } = props;

  React.useEffect(() => {
    console.log({ geojson, mapStyle });

    const highwayStyles = getStyleFuncs(
      mapStyle.layers.find((layer: any) => findHighway(layer.id))
    );
    const highwayFilter = buildFeatureFilter(highwayStyles.filter);
    const highwayData = {
      type: 'FeatureCollection',
      features: geojson.layers['transportation'].features.filter(highwayFilter),
    };
    console.log({ highwayData, highwayStyles });
  }, [geojson]);

  return (
    <div className="flex h-full w-full items-center justify-center bg-red-900">
      hello world
    </div>
  );
};

export default CityMapV1;

type TProps = {
  geojson: {
    layers: Record<string, FeatureCollection<Geometry, GeoJsonProperties>>;
    viewBox: {
      x: number;
      y: number;
      z: number;
    };
  };
  mapStyle: any;
};
