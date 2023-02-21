import * as d3 from 'd3';
import React from 'react';

const CityMapV1: React.FC<TProps> = (props) => {
  const { geojson } = props;
  const svgRef = React.useRef();

  React.useEffect(() => {
    console.log({ geojson });
    async function renderMap() {
      const geojsonInline = {
        features: [
          {
            type: 'Feature',
            properties: {
              name: 'Africa',
            },
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [-6, 36],
                  [33, 30],
                  [-6, 36],
                ],
              ],
            },
          },
        ],
      };

      const chosenProjection = d3
        .geoMercator()
        .scale(600)
        .translate([1300, 450]);
      const geoGenerator = d3.geoPath().projection(chosenProjection);
      const path = geoGenerator(JSON.stringify(geojsonInline) as any);

      console.log({ path });

      d3.select('#map')
        .selectAll('path')
        .data(geojsonInline.features)
        .join('path')
        .attr('d', path);
    }
    renderMap();
  }, [geojson]);

  return (
    <div className="flex h-full w-full items-center justify-center bg-red-900">
      <svg id="map" width="960" height="500"></svg>
    </div>
  );
};

export default CityMapV1;

type TProps = {
  geojson: string;
};
