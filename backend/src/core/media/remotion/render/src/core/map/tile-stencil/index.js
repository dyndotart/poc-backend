import { autoGetters } from './style-func.js';
import { layoutDefaults, paintDefaults } from './defaults.js';

export * from './filter';

export function getStyleFuncs(inputLayer) {
  const layer = Object.assign({}, inputLayer); // Leave input unchanged

  // Replace rendering properties with functions
  layer.layout = autoGetters(layer.layout, layoutDefaults[layer.type]);
  layer.paint = autoGetters(layer.paint, paintDefaults[layer.type]);

  return layer;
}
