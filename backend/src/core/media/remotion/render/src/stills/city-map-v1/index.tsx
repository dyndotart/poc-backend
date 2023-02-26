import * as d3Geo from 'd3-geo';
import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import React from 'react';
import { Style as MapboxStyle } from '../../core/map/mapbox/types';
import * as tileStencil from '../../core/map/tile-stencil';

const CityMapV1: React.FC<TProps> = (props) => {
  const { style, tiles, projectionProps } = props;
  // const canvasRef = React.useRef<HTMLCanvasElement>(null);

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

  // React.useEffect(() => {
  //   const canvas = canvasRef.current;
  //   if (canvas == null) return;
  //   const ctx = canvas.getContext('2d');
  //   if (ctx == null) return;

  //   const tile = tiles[0];
  //   const layer: any = tile.layers.transportation;
  //   const layerFuncs = style.layers.map(tileStencil.getStyleFuncs);
  //   const parsedStyle = {
  //     ...style,
  //     layers: layerFuncs,
  //   };
  //   const parsedFilter = tileStencil.buildFeatureFilter(layer.filter);
  //   const highwayStyle = parsedStyle.layers.find(findHighway);
  //   const canvasGeoPath = d3Geo.geoPath(null, ctx);

  //   // Select the highway features
  //   const highwayData = {
  //     type: 'FeatureCollection',
  //     features: layer.features.filter(parsedFilter),
  //   };

  //   console.log({ highwayStyle, highwayData, parsedStyle, tile });

  //   // ctx.fillStyle = 'white';
  //   // ctx.fillRect(0, 0, 512, 512);

  //   // Set the highway styles: translate style properties to Canvas2D settings
  //   ctx.miterLimit = highwayStyle.layout['line-miter-limit'](tile.viewBox.z);
  //   ctx.lineWidth = highwayStyle.paint['line-width'](tile.viewBox.z);
  //   ctx.strokeStyle = highwayStyle.paint['line-color'](tile.viewBox.z);

  //   // Draw the highways
  //   ctx.beginPath();
  //   canvasGeoPath(highwayData as any);
  //   ctx.stroke();
  // }, [canvasRef.current]);

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
        {tiles.map((tile) => {
          const highwayStyle = parsedStyle.layers.find((layer) =>
            [
              'highway_motorway_inner',
              'highway-motorway-casing',
              'road_major_motorway',
              'transportation',
              'road_motorway_casing',
            ].includes(layer.id)
          );
          const highwayStyleFilter = tileStencil.buildFeatureFilter(
            highwayStyle.filter
          );
          const highwayData: FeatureCollection = {
            type: 'FeatureCollection',
            features: tile.layers['transportation'].features,
            // tile.layers['transportation'].features.filter(highwayStyleFilter),
          };
          console.log({ tile, highwayStyle, highwayStyleFilter, highwayData });

          return (
            <g key={`x${tile.viewBox.x}y${tile.viewBox.y}z${tile.viewBox.z}`}>
              <path
                fill="none"
                stroke={`rgba(${highwayStyle.paint['line-color'](
                  tile.viewBox.z / 2
                )})`}
                // strokeWidth={highwayStyle.paint['line-width'](
                //   tile.viewBox.z / 2
                // )}
                strokeWidth={0.75}
                strokeMiterlimit={highwayStyle.layout['line-miter-limit'](
                  tile.viewBox.z / 2
                )}
                d={geoPath(highwayData) as string}
              />
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
