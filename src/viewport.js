import clamp from './clamp';
import linearScale from './linear-scale';
import { getTimelineWidth } from './timeline';
import { frameToPixel, pixelToFrame } from './conversions';

// These utilities are all about the viewport. The viewport is the
// visible section of the timeline. The `viewportWidth` in
// `timelineConfig` represents the physical size of the viewport.

// This is the furthest to the left that the viewport can scroll.
export function getMaxViewportOffset({ timelineConfig, normalizedZoom } = {}) {
  const { viewportWidth } = timelineConfig;
  const fullTimelineWidth = getTimelineWidth({
    timelineConfig,
    normalizedZoom,
  });

  return fullTimelineWidth - viewportWidth;
}

export function clampViewportOffset({ timelineConfig, viewportOffset } = {}) {
  const maxViewportOffset = getMaxViewportOffset({ timelineConfig });

  return clamp(0, viewportOffset, maxViewportOffset);
}

export function getViewportOffset({
  timelineConfig,
  normalizedZoom,
  focusedFractionalFrame,
} = {}) {
  const { viewportWidth } = timelineConfig;

  const framePixelOffset = frameToPixel({
    timelineConfig,
    normalizedZoom,
    frame: focusedFractionalFrame,
    // We perform the rounding here. That way, the focused frame is as close as possible
    // to the nearest pixel.
    fractional: false,
  });

  // This ensures that the _offset_ of the pixel is constant. The intention here is to
  // prevent "wiggles" as the user zooms in. So long as the distance between the focused
  // pixel and the left viewport edge remain constant, there should not be wiggles.
  const halfViewportWidth = Math.round(viewportWidth / 2);

  // Both of these values are integers, so this should always return a whole number
  const possibleViewportOffset = framePixelOffset - halfViewportWidth;

  // Lastly, we clamp our offset so that it matches what is physically possible in the
  // browser. This helps to ensure that any local state that mirrors the viewport does not disagree with
  // what's in the DOM.
  return clampViewportOffset({
    timelineConfig,
    viewportOffset: possibleViewportOffset,
  });
}

// The frame endpoints refer to which frame bin the first and last pixel of the viewport fall into.
export function getViewportFrameEndpoints({
  timelineConfig,
  normalizedZoom,
  fractional,
}) {
  const { viewportWidth } = timelineConfig;

  const viewportOffset = getViewportOffset({ timelineConfig, normalizedZoom });

  const startPixel = viewportOffset;
  // We can be certain at this point that, with proper use of this lib, this never jumps over the boundary
  const endPixel = startPixel + viewportWidth;

  const startFrame = pixelToFrame({
    timelineConfig,
    pixel: startPixel,
    fractional,
  });

  const endFrame = pixelToFrame({
    timelineConfig,
    pixel: endPixel,
    fractional,
  });

  return {
    startFrame,
    endFrame,
  };
}

// Note: non-fractional values round up.
export function getViewportFrameWidth({
  timelineConfig,
  normalizedZoom,
  fractional,
}) {
  const { startFrame, endFrame } = getViewportFrameEndpoints({
    timelineConfig,
    normalizedZoom,
    fractional,
  });

  const diff = endFrame - startFrame;

  return fractional ? diff : Math.ceil(diff);
}

export function getViewportOffsetMeasure({
  timelineConfig,
  focusedFractionalFrame,
  normalizedZoom,
} = {}) {
  const viewportOffset = getViewportOffset({
    timelineConfig,
    normalizedZoom,
    focusedFractionalFrame,
  });

  const maxViewportOffset = getMaxViewportOffset({ timelineConfig });

  return linearScale({
    domain: [0, maxViewportOffset],
    range: [0, 1],
    value: viewportOffset,
  });
}
