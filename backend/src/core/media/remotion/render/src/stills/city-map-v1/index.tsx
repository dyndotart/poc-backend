import * as d3Geo from 'd3-geo';
import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import React from 'react';
import { Style as MapboxStyle } from '../../core/map/mapbox/types';
import * as tileStencil from '../../core/map/tile-stencil';

function getColor() {
  return `hsl(${360 * Math.random()}, 100%, 75%)`;
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
  const parsedStyle = {
    ...style,
    layers: style.layers.map(tileStencil.getStyleFuncs),
  };

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
          // const highwayStyle = parsedStyle.layers.find((layer) =>
          //   [
          //     'highway_motorway_inner',
          //     'highway-motorway-casing',
          //     'road_major_motorway',
          //     'transportation',
          //     'road_motorway_casing',
          //   ].includes(layer.id)
          // );
          // const highwayStyleFilter = tileStencil.buildFeatureFilter(
          //   highwayStyle.filter
          // );
          // const highwayData: FeatureCollection = {
          //   type: 'FeatureCollection',
          //   features: tile.layers['transportation'].features.filter(highwayStyleFilter),
          // };
          // console.log({ tile, highwayStyle, highwayStyleFilter, highwayData });

          return (
            <g
              key={`x${tile.viewBox.x}y${tile.viewBox.y}z${tile.viewBox.z}`}
              style={{
                outline: `solid 3px ${getColor()}`,
              }}
            >
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
