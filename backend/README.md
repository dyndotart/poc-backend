# Backend

# 🔴 Issues

# 👨‍🏫 Learnings

## Remotion

### Server-Side Rendering (SSR)
- [Docs](https://www.remotion.dev/docs/ssr)

## Open Street Map (OSM)
- [Get borders of city](https://www.youtube.com/watch?v=fRTHshCj-L0)
- [Nominatim Docs](https://nominatim.org/release-docs/develop/api/Overview/)

### Vector Tiles
- [From Open Street Map](https://www.youtube.com/watch?v=Wh--DHRULkE)
- [Download](https://data.maptiler.com/downloads/tileset/osm/)

### Map Tiler API
- [Dashboard](https://cloud.maptiler.com/account/analytics)
- [Requests for operation (Billing)](https://documentation.maptiler.com/hc/en-us/articles/6576861156753-What-is-a-MapTiler-Cloud-request-)

#### Pro
- Free (100k requests per month)
- Scalable as company
- Supports zoom level so not every detail is queried

#### Contra
- Can only query tiles (x,y,z)

### Open Street Map API

#### Pro
- Free

#### Contra
- Limited to bound box size of 0.25
- Limited to 5000 nodes in this boundbox
- Limited to 1 request per second
- Not scalable (as community hosted)
- Can only query bound box

#### Example
```ts
const bbox = [minLon, minLat, maxLon, maxLat].join(',');
const osmResponse = await axios.get(
    `https://api.openstreetmap.org/api/0.6/map?bbox=${bbox}`
);
const osmData = osmResponse.data;
```

### Overpass API
- [Web Interface](https://overpass-turbo.eu/)

#### Pro
- Free
- Advanced querieing of vector data

#### Contra
- Limited if currently high demand
- Limited to 1 request per second
- Not scalable (as community hosted)

```ts
const bbox = [minLon, minLat, maxLon, maxLat].join(',');
const query = `
  [out:json][timeout:90];
  {{geocodeArea:LaPaz}}->.searchArea;
  (
    way["building"](area.searchArea);
    way["highway"](area.searchArea);
  );
  out body;
  >;
  out skel qt;
`;
const formData = new URLSearchParams();
formData.append('data', query);
const opResponse = await axios.post(
  'https://overpass-api.de/api/interpreter',
  formData,
  {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
  }
);
const opData = opResponse.data;
```

### GPX to GeoJSON
- [YouTube](https://www.youtube.com/watch?v=YwRGml8_3DU)

### Render Vector Tile
- [Blog](https://observablehq.com/@jjhembd/vector-tile-rendering)

## Other

### Data Transfer Object (DTO)
- Used to define types for data that is transferred between different layers of an application or between applications (OSI)

### Adding Custom Type Definitions to a Third-Party Library
- [Blog](https://www.detroitlabs.com/blog/adding-custom-type-definitions-to-a-third-party-library/)