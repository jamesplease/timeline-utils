import clamp from './clamp';
import { getZoomMagnitude } from './scroll-and-zoom';
import { getTimelineWidth } from './timeline';

// The size of a frame, in pixels, when normalizedZoom is 0
export function getFramePixelWidthAtMinZoom({ timelineConfig } = {}) {
  const { viewportWidth, totalFrameCount } = timelineConfig;

  return viewportWidth / totalFrameCount;
}

export function getFramePixelWidth({ timelineDescription } = {}) {
  const zoomMagnitude = getZoomMagnitude({ timelineDescription });
  const minFramePixelWidth = getFramePixelWidthAtMinZoom({
    timelineDescription,
  });

  return zoomMagnitude * minFramePixelWidth;
}

// Returns the nearest frame at the pixel. Always returns an entire
// pixel value. This can be useful for snapping interfaces.
export function nearestFrameToPixel({ timelineDescription, pixel }) {
  const framePixelWidth = getFramePixelWidth({ timelineDescription });
  const fullTimelineWidth = getTimelineWidth({
    timelineDescription,
    fractional: true,
  });

  const pixelToUse = clamp(0, pixel, fullTimelineWidth);

  const fractionalFrame = pixelToUse / framePixelWidth;

  return Math.round(fractionalFrame);
}
