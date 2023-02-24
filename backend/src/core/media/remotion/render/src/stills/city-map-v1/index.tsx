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
const geoPath = d3Geo.geoPath(null);

const CityMapV1: React.FC<TProps> = (props) => {
  const { style, tiles, projection } = props;
  const geoPath = d3Geo.geoPath(projection);

  React.useEffect(() => {
    console.log({ tiles, style, projection });

    // const highwayStyles = getStyleFuncs(
    //   mapStyle.layers.find((layer: any) => findHighway(layer.id))
    // );
    // const highwayFilter = buildFeatureFilter(highwayStyles.filter);
    // const highwayData = {
    //   type: 'FeatureCollection',
    //   features: geojson.layers['transportation'].features.filter(highwayFilter),
    // };
    // console.log({ highwayData, highwayStyles });
  }, [tiles, style]);

  if (tiles == null) {
    return <div>Couldn't load tiles</div>;
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-white">
      <svg viewBox="0 0 500 500">
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
  projection: d3Geo.GeoProjection;
  style: any;
};
