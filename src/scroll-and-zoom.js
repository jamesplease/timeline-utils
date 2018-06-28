import clamp from './clamp';
import linearScale from './linear-scale';
import defaultMinFramePixelWidth from './default-min-frame-pixel-width';
import { getFramePixelWidthAtMinZoom } from './conversions';
import { getViewportFrameWidth } from './viewport';

export function getMaxZoomMagnitude({ timelineConfig } = {}) {
  const { minFramePixelWidth = defaultMinFramePixelWidth } = timelineConfig;

  const maxFramePixelWidth = getFramePixelWidthAtMinZoom({
    timelineConfig,
  });

  return minFramePixelWidth / maxFramePixelWidth;
}

export function getZoomMagnitude({ timelineConfig, normalizedZoom } = {}) {
  const maxMagnitude = getMaxZoomMagnitude({ timelineConfig });

  // Because the zoomMagnitude grows by 1/x, where x is the visible section of the
  // total set of items, we work with the _inverse_ max magnitude.
  const inverseMaxMagnitude = 1 / maxMagnitude;

  // We linearly map our normalizedZoom to the _inverse_ so that our measure represents
  // a more useful value.
  const inverseZoomMagnitude = linearScale({
    domain: [0, 1],
    range: [1, inverseMaxMagnitude],
    value: normalizedZoom,
  });

  // Lastly, to get the actual zoom magnitude, we return the inverse.
  const zoomMagnitude = 1 / inverseZoomMagnitude;

  // We clamp our result to avoid floating point issues that could cause our zoom to go
  // higher than the max! Note, however, that floating point issues can cause the actual
  // magnitude between 1 and max to be ever-so-slightly off.
  return clamp(1, zoomMagnitude, maxMagnitude);
}

export function getFocusableEndpoints({ timelineDescription }) {
  const { totalFrameCount } = timelineDescription;

  const viewportFrameWidth = getViewportFrameWidth({
    timelineDescription,
    // We need to use a smaller viewport here so that our dead frames include partially-visible
    // frames.
    roundUp: false,
  });

  const deadFrameSize = viewportFrameWidth / 2;

  return {
    start: Math.floor(deadFrameSize),
    // We subtract 1 here because frames are zero-indexed, so
    // lastFrame = totalFrameCount - 1
    end: Math.ceil(totalFrameCount - 1 - deadFrameSize),
  };
}