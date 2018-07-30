import clamp from './clamp';
import linearScale from './linear-scale';
import defaultMinFramePixelWidth from './default-min-frame-pixel-width';
import { getFramePixelWidthAtMinZoom, pixelToFrame } from './conversions';
import { getTimelineWidth } from './timeline';

export function getMaxZoomMagnitude({ timelineConstants } = {}) {
  const { minFramePixelWidth = defaultMinFramePixelWidth } = timelineConstants;

  const maxFramePixelWidth = getFramePixelWidthAtMinZoom({
    timelineConstants,
  });

  return minFramePixelWidth / maxFramePixelWidth;
}

export function getZoomMagnitude({ timelineConstants, normalizedZoom } = {}) {
  const maxMagnitude = getMaxZoomMagnitude({ timelineConstants });

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

// Heads up! The focusable endpoints are _always_ fractional, because the viewport does not ever
// necessarily line up with a frame.
export function getFocusableEndpoints({ timelineConstants, normalizedZoom }) {
  const { viewportWidth } = timelineConstants;

  // We get the non-fractional width, so that we are working with the real timeline,
  // including any dead space.
  const timelineWidth = getTimelineWidth({
    timelineConstants,
    normalizedZoom,
  });

  const distanceFromEdge = viewportWidth / 2;

  const startPixel = Math.floor(distanceFromEdge);

  // We ceil the endPixel because we can scroll _into_ any fractional pixels
  // to get the end of the timeline.
  // It's not clear to me that we need to floor the start at the moment.
  const endPixel = Math.ceil(timelineWidth - distanceFromEdge);

  return {
    startFractionalFrame: pixelToFrame({
      timelineConstants,
      normalizedZoom,
      pixel: startPixel,
      fractional: true,
    }),
    endFractionalFrame: pixelToFrame({
      timelineConstants,
      normalizedZoom,
      pixel: endPixel,
      fractional: true,
    }),
  };
}

export function getPositionFromFrame({
  startFrame,
  endFrame,
  timelineConstants,
}) {
  const {
    totalFrameCount,
    viewportWidth,
    minFramePixelWidth = defaultMinFramePixelWidth,
  } = timelineConstants;
  const frameWidth = endFrame - startFrame;
  const focusedFractionalFrame = endFrame - frameWidth / 2;

  const maxZoomFrameWidth = viewportWidth / minFramePixelWidth;

  const normalizedZoom = linearScale({
    domain: [totalFrameCount, maxZoomFrameWidth],
    range: [0, 1],
    value: [frameWidth],
  });

  return {
    normalizedZoom,
    focusedFractionalFrame,
  };
}
