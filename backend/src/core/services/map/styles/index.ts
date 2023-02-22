import darkMatterStyles from './dark-matter-style.json';
import osmBrightStyle from './osm-bright-style.json';
import positronStyle from './positron-style.json';
import tonerStyle from './toner-style.json';

// TODO insert maptiler key
export const mapStyles: { name: string; styles: object }[] = [
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
