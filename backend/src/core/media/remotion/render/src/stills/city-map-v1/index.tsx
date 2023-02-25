import * as d3Geo from 'd3-geo';
import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import React from 'react';
import { Style as MapboxStyle } from '../../core/map/mapbox/types';

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

  // Define projection and geoPath, so that the map can be rendered
  // in the wished specific projection at the wished place
  // Note: Couldn't put these classes in a state as this threw an error.
  // Thus they've to be reinitialized every render
  const projection = d3Geo
    .geoMercator()
    .center(projectionProps.center)
    .scale(projectionProps.scale)
    .translate(projectionProps.translate)
    .precision(projectionProps.precision);
  const geoPath = d3Geo.geoPath(projection);

  React.useEffect(() => {
    // TODO
  }, []);

  console.log({ tiles });
  if (!Array.isArray(tiles) || tiles.length <= 0) {
    return <p>No tiles found</p>;
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-white">
      <p className="absolute top-0 left-0 bg-white">{`
      Projection: ${projection.center()[0]}, ${projection.center()[1]} |
      Layers: ${tiles.length}
      `}</p>
      <svg viewBox="0 0 600 600" className="bg-red-700">
        {tiles.map((tile) => (
          <g key={`x${tile.viewBox.x}y${tile.viewBox.y}z${tile.viewBox.z}`}>
            <path
              key={'boundary'}
              fill="#7CFC00"
              stroke="#7CFC00"
              d={geoPath(tile.layers['building']) as string}
            ></path>
            <path
              key={'water'}
              fill="#0096FF"
              stroke="#0096FF"
              d={geoPath(tile.layers['water']) as string}
            ></path>
            <path
              key={'transportation'}
              fill="none"
              stroke="#000"
              d={geoPath(tile.layers['transportation']) as string}
              strokeWidth="0.75"
            ></path>
          </g>
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
  style: MapboxStyle;
};
