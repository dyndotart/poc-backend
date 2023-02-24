import * as d3Geo from 'd3-geo';
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
const projection = d3Geo.geoMercator();
const geoPath = d3Geo.geoPath(null);

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
    <div className="flex h-full w-full items-center justify-center bg-white">
      <svg viewBox="0 0 600 600">
        <path
          fill="#eee"
          d={geoPath(geojson.layers['boundary']) as string}
        ></path>
        <path
          fill="none"
          stroke="#aaa"
          d={geoPath(geojson.layers['water']) as string}
        ></path>
        <path
          fill="none"
          stroke="#000"
          d={geoPath(geojson.layers['transportation']) as string}
          stroke-width="0.75"
        ></path>
      </svg>
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
