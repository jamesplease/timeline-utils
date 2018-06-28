import clamp from './clamp';
import { getZoomMagnitude } from './scroll-and-zoom';
import { getTimelineWidth } from './timeline';

// The size of a frame, in pixels, when normalizedZoom is 0
export function getFramePixelWidthAtMinZoom({ timelineConfig } = {}) {
  const { viewportWidth, totalFrameCount } = timelineConfig;

  return viewportWidth / totalFrameCount;
}

export function getFramePixelWidth({ timelineConfig, normalizedZoom } = {}) {
  const zoomMagnitude = getZoomMagnitude({
    timelineConfig,
    normalizedZoom,
  });
  const minFramePixelWidth = getFramePixelWidthAtMinZoom({
    timelineConfig,
  });

  return zoomMagnitude * minFramePixelWidth;
}

export function frameToPixel({
  timelineConfig,
  normalizedZoom,
  frame,
  fractional = false,
}) {
  const framePixelWidth = getFramePixelWidth({
    timelineConfig,
    normalizedZoom,
  });

  const fractionalPixel = frame * framePixelWidth;

  // Note that the fractional prop is only provided to mirror the API of `pixelToFrame`,
  // but at the moment I do not know of any use cases around not returning a fractional pixel.
  // This is also why it uses `Math.round` vs `pixelToFrame`'s floor. The primary use case of
  // a discrete pixelToFrame transform is to get the pixel that they clicked out.
  return fractional ? fractionalPixel : Math.round(fractionalPixel);
}

// Returns the _nearest_ frame to the pixel. Always returns an entire
// pixel value. This can be useful for snapping interfaces.
export function nearestFrameToPixel({ timelineConfig, normalizedZoom, pixel }) {
  const framePixelWidth = getFramePixelWidth({
    timelineConfig,
    normalizedZoom,
  });

  const timelineWidth = getTimelineWidth({
    timelineConfig,
    normalizedZoom,
    fractional: true,
  });

  const pixelToUse = clamp(0, pixel, timelineWidth);

  const fractionalFrame = pixelToUse / framePixelWidth;

  // Rounded, and then clamped (just to be safe)
  return clamp(0, Math.round(fractionalFrame), timelineConfig.totalFrameCount);
}

export function frameAtPixel({ timelineConfig, normalizedZoom, pixel }) {
  const framePixelWidth = getFramePixelWidth({
    timelineConfig,
    normalizedZoom,
  });

  const fullTimelineWidth = getTimelineWidth({
    timelineConfig,
    normalizedZoom,
    fractional: true,
  });

  const pixelToUse = clamp(0, pixel, fullTimelineWidth);

  const fractionalFrame = pixelToUse / framePixelWidth;
  const clampedFractionalFrame = clamp(
    0,
    fractionalFrame,
    timelineConfig.totalFrameCount
  );

  return Math.floor(clampedFractionalFrame);
}
