import { getCompositions } from '@remotion/renderer';
import { getWebpackBundleLocation } from './bundle';

export async function getComposition(compName: string, inputProps: unknown) {
  const comps = await getCompositions(await getWebpackBundleLocation(), {
    inputProps: inputProps as object,
  });

  const comp = comps.find((c) => c.id === compName);
  if (!comp) {
    throw new Error(`No composition called ${compName}`);
  }

  return comp;
}
