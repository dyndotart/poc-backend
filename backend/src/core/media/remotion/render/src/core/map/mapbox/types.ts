// Based on:
// https://www.npmjs.com/package/@types/mapbox-gl?activeTab=explore

export type CameraFunctionSpecification<T> =
  | { type: 'exponential'; stops: Array<[number, T]> }
  | { type: 'interval'; stops: Array<[number, T]> };

export type ExpressionSpecification = Array<unknown>;

export type PropertyValueSpecification<T> =
  | T
  | CameraFunctionSpecification<T>
  | ExpressionSpecification;

export interface TerrainSpecification {
  source: string;
  exaggeration?: PropertyValueSpecification<number> | undefined;
}

type ExpressionName =
  // Types
  | 'array'
  | 'boolean'
  | 'collator'
  | 'format'
  | 'literal'
  | 'number'
  | 'number-format'
  | 'object'
  | 'string'
  | 'image'
  | 'to-boolean'
  | 'to-color'
  | 'to-number'
  | 'to-string'
  | 'typeof'
  // Feature data
  | 'feature-state'
  | 'geometry-type'
  | 'id'
  | 'line-progress'
  | 'properties'
  // Lookup
  | 'at'
  | 'get'
  | 'has'
  | 'in'
  | 'index-of'
  | 'length'
  | 'slice'
  // Decision
  | '!'
  | '!='
  | '<'
  | '<='
  | '=='
  | '>'
  | '>='
  | 'all'
  | 'any'
  | 'case'
  | 'match'
  | 'coalesce'
  | 'within'
  // Ramps, scales, curves
  | 'interpolate'
  | 'interpolate-hcl'
  | 'interpolate-lab'
  | 'step'
  // Variable binding
  | 'let'
  | 'var'
  // String
  | 'concat'
  | 'downcase'
  | 'is-supported-script'
  | 'resolved-locale'
  | 'upcase'
  // Color
  | 'rgb'
  | 'rgba'
  | 'to-rgba'
  // Math
  | '-'
  | '*'
  | '/'
  | '%'
  | '^'
  | '+'
  | 'abs'
  | 'acos'
  | 'asin'
  | 'atan'
  | 'ceil'
  | 'cos'
  | 'e'
  | 'floor'
  | 'ln'
  | 'ln2'
  | 'log10'
  | 'log2'
  | 'max'
  | 'min'
  | 'pi'
  | 'round'
  | 'sin'
  | 'sqrt'
  | 'tan'
  // Zoom, Heatmap
  | 'zoom'
  | 'heatmap-density';

type Expression = [ExpressionName, ...any[]];

type Anchor =
  | 'center'
  | 'left'
  | 'right'
  | 'top'
  | 'bottom'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export interface StyleFunction {
  stops?: any[][] | undefined;
  property?: string | undefined;
  base?: number | undefined;
  type?: 'identity' | 'exponential' | 'interval' | 'categorical' | undefined;
  default?: any;
  colorSpace?: 'rgb' | 'lab' | 'hcl' | undefined;
}

type Visibility = 'visible' | 'none';

export interface Layout {
  visibility?: Visibility | undefined;
}

export interface BackgroundLayout extends Layout {}

export interface BackgroundPaint {
  'background-color'?: string | Expression | undefined;
  'background-color-transition'?: Transition | undefined;
  'background-pattern'?: string | undefined;
  'background-pattern-transition'?: Transition | undefined;
  'background-opacity'?: number | Expression | undefined;
  'background-opacity-transition'?: Transition | undefined;
}

export interface FillLayout extends Layout {
  'fill-sort-key'?: number | Expression | undefined;
}

export interface FillPaint {
  'fill-antialias'?: boolean | Expression | undefined;
  'fill-opacity'?: number | StyleFunction | Expression | undefined;
  'fill-opacity-transition'?: Transition | undefined;
  'fill-color'?: string | StyleFunction | Expression | undefined;
  'fill-color-transition'?: Transition | undefined;
  'fill-outline-color'?: string | StyleFunction | Expression | undefined;
  'fill-outline-color-transition'?: Transition | undefined;
  'fill-translate'?: number[] | undefined;
  'fill-translate-transition'?: Transition | undefined;
  'fill-translate-anchor'?: 'map' | 'viewport' | undefined;
  'fill-pattern'?: string | Expression | undefined;
  'fill-pattern-transition'?: Transition | undefined;
}

export interface FillExtrusionLayout extends Layout {}

export interface FillExtrusionPaint {
  'fill-extrusion-opacity'?: number | Expression | undefined;
  'fill-extrusion-opacity-transition'?: Transition | undefined;
  'fill-extrusion-color'?: string | StyleFunction | Expression | undefined;
  'fill-extrusion-color-transition'?: Transition | undefined;
  'fill-extrusion-translate'?: number[] | Expression | undefined;
  'fill-extrusion-translate-transition'?: Transition | undefined;
  'fill-extrusion-translate-anchor'?: 'map' | 'viewport' | undefined;
  'fill-extrusion-pattern'?: string | Expression | undefined;
  'fill-extrusion-pattern-transition'?: Transition | undefined;
  'fill-extrusion-height'?: number | StyleFunction | Expression | undefined;
  'fill-extrusion-height-transition'?: Transition | undefined;
  'fill-extrusion-base'?: number | StyleFunction | Expression | undefined;
  'fill-extrusion-base-transition'?: Transition | undefined;
  'fill-extrusion-vertical-gradient'?: boolean | undefined;
}

export interface LineLayout extends Layout {
  'line-cap'?: 'butt' | 'round' | 'square' | Expression | undefined;
  'line-join'?: 'bevel' | 'round' | 'miter' | Expression | undefined;
  'line-miter-limit'?: number | Expression | undefined;
  'line-round-limit'?: number | Expression | undefined;
  'line-sort-key'?: number | Expression | undefined;
}

export interface LinePaint {
  'line-opacity'?: number | StyleFunction | Expression | undefined;
  'line-opacity-transition'?: Transition | undefined;
  'line-color'?: string | StyleFunction | Expression | undefined;
  'line-color-transition'?: Transition | undefined;
  'line-translate'?: number[] | Expression | undefined;
  'line-translate-transition'?: Transition | undefined;
  'line-translate-anchor'?: 'map' | 'viewport' | undefined;
  'line-width'?: number | StyleFunction | Expression | undefined;
  'line-width-transition'?: Transition | undefined;
  'line-gap-width'?: number | StyleFunction | Expression | undefined;
  'line-gap-width-transition'?: Transition | undefined;
  'line-offset'?: number | StyleFunction | Expression | undefined;
  'line-offset-transition'?: Transition | undefined;
  'line-blur'?: number | StyleFunction | Expression | undefined;
  'line-blur-transition'?: Transition | undefined;
  'line-dasharray'?: number[] | Expression | undefined;
  'line-dasharray-transition'?: Transition | undefined;
  'line-pattern'?: string | Expression | undefined;
  'line-pattern-transition'?: Transition | undefined;
  'line-gradient'?: Expression | undefined;
}

export interface SymbolLayout extends Layout {
  'symbol-placement'?: 'point' | 'line' | 'line-center' | undefined;
  'symbol-spacing'?: number | Expression | undefined;
  'symbol-avoid-edges'?: boolean | undefined;
  'symbol-z-order'?: 'viewport-y' | 'source' | undefined;
  'icon-allow-overlap'?: boolean | StyleFunction | Expression | undefined;
  'icon-ignore-placement'?: boolean | Expression | undefined;
  'icon-optional'?: boolean | undefined;
  'icon-rotation-alignment'?: 'map' | 'viewport' | 'auto' | undefined;
  'icon-size'?: number | StyleFunction | Expression | undefined;
  'icon-text-fit'?: 'none' | 'both' | 'width' | 'height' | undefined;
  'icon-text-fit-padding'?: number[] | Expression | undefined;
  'icon-image'?: string | StyleFunction | Expression | undefined;
  'icon-rotate'?: number | StyleFunction | Expression | undefined;
  'icon-padding'?: number | Expression | undefined;
  'icon-keep-upright'?: boolean | undefined;
  'icon-offset'?: number[] | StyleFunction | Expression | undefined;
  'icon-anchor'?: Anchor | StyleFunction | Expression | undefined;
  'icon-pitch-alignment'?: 'map' | 'viewport' | 'auto' | undefined;
  'text-pitch-alignment'?: 'map' | 'viewport' | 'auto' | undefined;
  'text-rotation-alignment'?: 'map' | 'viewport' | 'auto' | undefined;
  'text-field'?: string | StyleFunction | Expression | undefined;
  'text-font'?: string[] | Expression | undefined;
  'text-size'?: number | StyleFunction | Expression | undefined;
  'text-max-width'?: number | StyleFunction | Expression | undefined;
  'text-line-height'?: number | Expression | undefined;
  'text-letter-spacing'?: number | Expression | undefined;
  'text-justify'?:
    | 'auto'
    | 'left'
    | 'center'
    | 'right'
    | Expression
    | undefined;
  'text-anchor'?: Anchor | StyleFunction | Expression | undefined;
  'text-max-angle'?: number | Expression | undefined;
  'text-rotate'?: number | StyleFunction | Expression | undefined;
  'text-padding'?: number | Expression | undefined;
  'text-keep-upright'?: boolean | undefined;
  'text-transform'?:
    | 'none'
    | 'uppercase'
    | 'lowercase'
    | StyleFunction
    | Expression
    | undefined;
  'text-offset'?: number[] | Expression | undefined;
  'text-allow-overlap'?: boolean | undefined;
  'text-ignore-placement'?: boolean | undefined;
  'text-optional'?: boolean | undefined;
  'text-radial-offset'?: number | Expression | undefined;
  'text-variable-anchor'?: Anchor[] | undefined;
  'text-writing-mode'?: ('horizontal' | 'vertical')[] | undefined;
  'symbol-sort-key'?: number | Expression | undefined;
}

export interface SymbolPaint {
  'icon-opacity'?: number | StyleFunction | Expression | undefined;
  'icon-opacity-transition'?: Transition | undefined;
  'icon-color'?: string | StyleFunction | Expression | undefined;
  'icon-color-transition'?: Transition | undefined;
  'icon-halo-color'?: string | StyleFunction | Expression | undefined;
  'icon-halo-color-transition'?: Transition | undefined;
  'icon-halo-width'?: number | StyleFunction | Expression | undefined;
  'icon-halo-width-transition'?: Transition | undefined;
  'icon-halo-blur'?: number | StyleFunction | Expression | undefined;
  'icon-halo-blur-transition'?: Transition | undefined;
  'icon-translate'?: number[] | Expression | undefined;
  'icon-translate-transition'?: Transition | undefined;
  'icon-translate-anchor'?: 'map' | 'viewport' | undefined;
  'text-opacity'?: number | StyleFunction | Expression | undefined;
  'text-opacity-transition'?: Transition | undefined;
  'text-color'?: string | StyleFunction | Expression | undefined;
  'text-color-transition'?: Transition | undefined;
  'text-halo-color'?: string | StyleFunction | Expression | undefined;
  'text-halo-color-transition'?: Transition | undefined;
  'text-halo-width'?: number | StyleFunction | Expression | undefined;
  'text-halo-width-transition'?: Transition | undefined;
  'text-halo-blur'?: number | StyleFunction | Expression | undefined;
  'text-halo-blur-transition'?: Transition | undefined;
  'text-translate'?: number[] | Expression | undefined;
  'text-translate-transition'?: Transition | undefined;
  'text-translate-anchor'?: 'map' | 'viewport' | undefined;
}

export interface RasterLayout extends Layout {}

export interface RasterPaint {
  'raster-opacity'?: number | Expression | undefined;
  'raster-opacity-transition'?: Transition | undefined;
  'raster-hue-rotate'?: number | Expression | undefined;
  'raster-hue-rotate-transition'?: Transition | undefined;
  'raster-brightness-min'?: number | Expression | undefined;
  'raster-brightness-min-transition'?: Transition | undefined;
  'raster-brightness-max'?: number | Expression | undefined;
  'raster-brightness-max-transition'?: Transition | undefined;
  'raster-saturation'?: number | Expression | undefined;
  'raster-saturation-transition'?: Transition | undefined;
  'raster-contrast'?: number | Expression | undefined;
  'raster-contrast-transition'?: Transition | undefined;
  'raster-fade-duration'?: number | Expression | undefined;
  'raster-resampling'?: 'linear' | 'nearest' | undefined;
}

export interface CircleLayout extends Layout {
  'circle-sort-key'?: number | Expression | undefined;
}

export interface CirclePaint {
  'circle-radius'?: number | StyleFunction | Expression | undefined;
  'circle-radius-transition'?: Transition | undefined;
  'circle-color'?: string | StyleFunction | Expression | undefined;
  'circle-color-transition'?: Transition | undefined;
  'circle-blur'?: number | StyleFunction | Expression | undefined;
  'circle-blur-transition'?: Transition | undefined;
  'circle-opacity'?: number | StyleFunction | Expression | undefined;
  'circle-opacity-transition'?: Transition | undefined;
  'circle-translate'?: number[] | Expression | undefined;
  'circle-translate-transition'?: Transition | undefined;
  'circle-translate-anchor'?: 'map' | 'viewport' | undefined;
  'circle-pitch-scale'?: 'map' | 'viewport' | undefined;
  'circle-pitch-alignment'?: 'map' | 'viewport' | undefined;
  'circle-stroke-width'?: number | StyleFunction | Expression | undefined;
  'circle-stroke-width-transition'?: Transition | undefined;
  'circle-stroke-color'?: string | StyleFunction | Expression | undefined;
  'circle-stroke-color-transition'?: Transition | undefined;
  'circle-stroke-opacity'?: number | StyleFunction | Expression | undefined;
  'circle-stroke-opacity-transition'?: Transition | undefined;
}

export interface HeatmapLayout extends Layout {}

export interface HeatmapPaint {
  'heatmap-radius'?: number | StyleFunction | Expression | undefined;
  'heatmap-radius-transition'?: Transition | undefined;
  'heatmap-weight'?: number | StyleFunction | Expression | undefined;
  'heatmap-intensity'?: number | StyleFunction | Expression | undefined;
  'heatmap-intensity-transition'?: Transition | undefined;
  'heatmap-color'?: string | StyleFunction | Expression | undefined;
  'heatmap-opacity'?: number | StyleFunction | Expression | undefined;
  'heatmap-opacity-transition'?: Transition | undefined;
}

export interface HillshadeLayout extends Layout {}

export interface HillshadePaint {
  'hillshade-illumination-direction'?: number | Expression | undefined;
  'hillshade-illumination-anchor'?: 'map' | 'viewport' | undefined;
  'hillshade-exaggeration'?: number | Expression | undefined;
  'hillshade-exaggeration-transition'?: Transition | undefined;
  'hillshade-shadow-color'?: string | Expression | undefined;
  'hillshade-shadow-color-transition'?: Transition | undefined;
  'hillshade-highlight-color'?: string | Expression | undefined;
  'hillshade-highlight-color-transition'?: Transition | undefined;
  'hillshade-accent-color'?: string | Expression | undefined;
  'hillshade-accent-color-transition'?: Transition | undefined;
}

export interface SkyLayout extends Layout {}

export interface SkyPaint {
  'sky-atmosphere-color'?: string | Expression | undefined;
  'sky-atmosphere-halo-color'?: string | Expression | undefined;
  'sky-atmosphere-sun'?: number[] | Expression | undefined;
  'sky-atmosphere-sun-intensity'?: number | Expression | undefined;
  'sky-gradient'?: string | Expression | undefined;
  'sky-gradient-center'?: number[] | Expression | undefined;
  'sky-gradient-radius'?: number | Expression | undefined;
  'sky-opacity'?: number | Expression | undefined;
  'sky-type'?: 'gradient' | 'atmosphere' | undefined;
}

export type ElevationQueryOptions = {
  exaggerated: boolean;
};

export interface Projection {
  name:
    | 'albers'
    | 'equalEarth'
    | 'equirectangular'
    | 'lambertConformalConic'
    | 'mercator'
    | 'naturalEarth'
    | 'winkelTripel'
    | 'globe';
  center?: [number, number];
  parallels?: [number, number];
}

export type AnyLayout =
  | BackgroundLayout
  | FillLayout
  | FillExtrusionLayout
  | LineLayout
  | SymbolLayout
  | RasterLayout
  | CircleLayout
  | HeatmapLayout
  | HillshadeLayout
  | SkyLayout;

export type AnyPaint =
  | BackgroundPaint
  | FillPaint
  | FillExtrusionPaint
  | LinePaint
  | SymbolPaint
  | RasterPaint
  | CirclePaint
  | HeatmapPaint
  | HillshadePaint
  | SkyPaint;

interface Layer {
  id: string;
  type: string;

  metadata?: any;
  ref?: string | undefined;

  source?: string | AnySourceData | undefined;

  'source-layer'?: string | undefined;

  minzoom?: number | undefined;
  maxzoom?: number | undefined;

  interactive?: boolean | undefined;

  filter?: any[] | undefined;
  layout?: AnyLayout | undefined;
  paint?: AnyPaint | undefined;
}

interface BackgroundLayer extends Layer {
  type: 'background';
  layout?: BackgroundLayout | undefined;
  paint?: BackgroundPaint | undefined;
}

interface CircleLayer extends Layer {
  type: 'circle';
  layout?: CircleLayout | undefined;
  paint?: CirclePaint | undefined;
}

interface FillExtrusionLayer extends Layer {
  type: 'fill-extrusion';
  layout?: FillExtrusionLayout | undefined;
  paint?: FillExtrusionPaint | undefined;
}

interface FillLayer extends Layer {
  type: 'fill';
  layout?: FillLayout | undefined;
  paint?: FillPaint | undefined;
}

interface HeatmapLayer extends Layer {
  type: 'heatmap';
  layout?: HeatmapLayout | undefined;
  paint?: HeatmapPaint | undefined;
}

interface HillshadeLayer extends Layer {
  type: 'hillshade';
  layout?: HillshadeLayout | undefined;
  paint?: HillshadePaint | undefined;
}

interface LineLayer extends Layer {
  type: 'line';
  layout?: LineLayout | undefined;
  paint?: LinePaint | undefined;
}

interface RasterLayer extends Layer {
  type: 'raster';
  layout?: RasterLayout | undefined;
  paint?: RasterPaint | undefined;
}

interface SymbolLayer extends Layer {
  type: 'symbol';
  layout?: SymbolLayout | undefined;
  paint?: SymbolPaint | undefined;
}

interface SkyLayer extends Layer {
  type: 'sky';
  layout?: SkyLayout | undefined;
  paint?: SkyPaint | undefined;
}

export type AnyLayer =
  | BackgroundLayer
  | CircleLayer
  | FillExtrusionLayer
  | FillLayer
  | HeatmapLayer
  | HillshadeLayer
  | LineLayer
  | RasterLayer
  | SymbolLayer
  | SkyLayer;

export interface Style {
  layers: AnyLayer[];
  sources: Sources;

  bearing?: number | undefined;
  center?: number[] | undefined;
  fog?: Fog | undefined;
  glyphs?: string | undefined;
  metadata?: any;
  name?: string | undefined;
  pitch?: number | undefined;
  light?: Light | undefined;
  sprite?: string | undefined;
  terrain?: TerrainSpecification | undefined;
  transition?: Transition | undefined;
  version: number;
  zoom?: number | undefined;
}

export interface Transition {
  delay?: number | undefined;
  duration?: number | undefined;
}

export interface Light {
  anchor?: 'map' | 'viewport' | undefined;
  position?: number[] | undefined;
  'position-transition'?: Transition | undefined;
  color?: string | undefined;
  'color-transition'?: Transition | undefined;
  intensity?: number | undefined;
  'intensity-transition'?: Transition | undefined;
}

export interface Fog {
  color?: string | Expression | undefined;
  'horizon-blend'?: number | Expression | undefined;
  range?: number[] | Expression | undefined;
}

export interface Sources {
  [sourceName: string]: AnySourceData;
}

export type PromoteIdSpecification = { [key: string]: string } | string;

export type AnySourceData = any;
