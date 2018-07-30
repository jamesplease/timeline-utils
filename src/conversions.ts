import clamp from './clamp';
import { getZoomMagnitude } from './scroll-and-zoom';
import { getTimelineWidth } from './timeline';
import { getViewportOffset } from './viewport';
import { timelineConstants } from './types';

interface GetFramePixelWidthAtMinZoomOptions {
  timelineConstants?: timelineConstants;
}

// The size of a frame, in pixels, when normalizedZoom is 0
export function getFramePixelWidthAtMinZoom({
  timelineConstants,
}: GetFramePixelWidthAtMinZoomOptions = {}): number {
  const { viewportWidth, totalFrameCount } = timelineConstants;

  return viewportWidth / totalFrameCount;
}

export function getFramePixelWidth({ timelineConstants, normalizedZoom } = {}) {
  const zoomMagnitude = getZoomMagnitude({
    timelineConstants,
    normalizedZoom,
  });

  const minFramePixelWidth = getFramePixelWidthAtMinZoom({
    timelineConstants,
  });

  return zoomMagnitude * minFramePixelWidth;
}

export function frameToPixel({
  timelineConstants,
  normalizedZoom,
  frame,
  fractional = false,
}) {
  const framePixelWidth = getFramePixelWidth({
    timelineConstants,
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
export function nearestFrameToPixel({
  timelineConstants,
  normalizedZoom,
  pixel,
}) {
  const framePixelWidth = getFramePixelWidth({
    timelineConstants,
    normalizedZoom,
  });

  const timelineWidth = getTimelineWidth({
    timelineConstants,
    normalizedZoom,
    fractional: true,
  });

  const pixelToUse = clamp(0, pixel, timelineWidth);

  const fractionalFrame = pixelToUse / framePixelWidth;

  // Rounded, and then clamped (just to be safe)
  return clamp(
    0,
    Math.round(fractionalFrame),
    timelineConstants.totalFrameCount - 1
  );
}

export function pixelToFrame({
  timelineConstants,
  normalizedZoom,
  pixel,
  fractional = false,
}) {
  const framePixelWidth = getFramePixelWidth({
    timelineConstants,
    normalizedZoom,
  });

  const fullTimelineWidth = getTimelineWidth({
    timelineConstants,
    normalizedZoom,
    fractional: true,
  });

  const pixelToUse = clamp(0, pixel, fullTimelineWidth);

  const fractionalFrame = pixelToUse / framePixelWidth;
  const clampedFractionalFrame = clamp(
    0,
    fractionalFrame,
    timelineConstants.totalFrameCount - 1
  );

  return fractional
    ? clampedFractionalFrame
    : Math.floor(clampedFractionalFrame);
}

export function viewportPixelToFrame({
  timelineConstants,
  normalizedZoom,
  pixel,
  fractional = false,
  focusedFractionalFrame,
}) {
  const viewportOffset = getViewportOffset({
    timelineConstants,
    normalizedZoom,
    focusedFractionalFrame,
  });

  return pixelToFrame({
    timelineConstants,
    normalizedZoom,
    pixel: pixel + viewportOffset,
    fractional,
  });
}

export function nearestFrameToViewportPixel({
  timelineConstants,
  normalizedZoom,
  pixel,
  focusedFractionalFrame,
}) {
  const viewportOffset = getViewportOffset({
    timelineConstants,
    normalizedZoom,
    focusedFractionalFrame,
  });

  return nearestFrameToPixel({
    timelineConstants,
    normalizedZoom,
    pixel: pixel + viewportOffset,
  });
}
