import * as d3Geo from 'd3-geo';
import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import React from 'react';

const SimpleCityMapV1: React.FC<TProps> = (props) => {
  const { tiles, projectionProps } = props;
  const projection = React.useMemo(
    () =>
      d3Geo
        .geoMercator()
        .center(projectionProps.center)
        .scale(projectionProps.scale)
        .translate(projectionProps.translate)
        .precision(projectionProps.precision),
    [projectionProps]
  );
  const geoPath = React.useMemo(() => d3Geo.geoPath(projection), [projection]);

  console.log('Tiles', tiles);

  if (!Array.isArray(tiles) || tiles.length <= 0) {
    return <p>No tiles found</p>;
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-white">
      <p className="absolute top-0 left-0 bg-white">
        Tile 1: ${JSON.stringify(tiles[0].viewBox)}
        <br />
        Projection: ${JSON.stringify(projectionProps)}
      </p>
      <svg viewBox="0 0 600 600">
        {tiles.map((tile) => {
          return (
            <g key={`x${tile.viewBox.x}y${tile.viewBox.y}z${tile.viewBox.z}`}>
              <path
                fill="#eee"
                stroke="#aaa"
                d={geoPath(tile.layers['water']) as string}
              ></path>
              <path
                fill="none"
                stroke="#000"
                strokeWidth="0.75"
                d={geoPath(tile.layers['transportation']) as string}
              ></path>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default SimpleCityMapV1;

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
};
