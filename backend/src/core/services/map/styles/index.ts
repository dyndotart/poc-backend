import darkMatterStyles from './osm/dark-matter-style.json';
import osmBrightStyle from './osm/osm-bright-style.json';
import positronStyle from './osm/positron-style.json';
import tonerStyle from './osm/toner-style.json';

// TODO insert maptiler key
export const mapStyles: { name: string; styles: any }[] = [
  {
    name: 'OSM Bright',
    styles: osmBrightStyle,
  },
  {
    name: 'Dark Matter',
    styles: darkMatterStyles,
  },
  {
    name: 'Positron',
    styles: positronStyle,
  },
  {
    name: 'Toner',
    styles: tonerStyle,
  },
];
