import * as d3Geo from 'd3-geo';
import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import React from 'react';

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
  const { style, tiles, projectionProps } = props;
  const projection = d3Geo
    .geoMercator()
    .center(projectionProps.center)
    .scale(projectionProps.scale)
    .translate(projectionProps.translate)
    .precision(projectionProps.precision);
  const geoPath = d3Geo.geoPath(projection);

  if (tiles == null || projection == null) {
    return <div>Couldn't load tiles</div>;
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-white">
      <p className="absolute top-0 left-0 bg-white">{`
      Projection: ${projection.center()[0]}, ${projection.center()[1]} |
      Layers: ${tiles.length}
      `}</p>
      <svg viewBox="0 0 600 600" className="bg-red-700">
        {tiles.map((tile) => (
          <>
            <path
              fill="#eee"
              d={geoPath(tile.layers['boundary']) as string}
            ></path>
            <path
              fill="none"
              stroke="#aaa"
              d={geoPath(tile.layers['water']) as string}
            ></path>
            <path
              fill="none"
              stroke="#000"
              d={geoPath(tile.layers['transportation']) as string}
              stroke-width="0.75"
            ></path>
          </>
        ))}
      </svg>
    </div>
  );
};

export default CityMapV1;

type TProps = {
  tiles: {
    layers: Record<string, FeatureCollection<Geometry, GeoJsonProperties>>;
    viewBox: {
      x: number;
      y: number;
      z: number;
    };
  }[];
  projectionProps: {
    center: [number, number];
    scale: number;
    translate: [number, number];
    precision: number;
  };
  style: any;
};
