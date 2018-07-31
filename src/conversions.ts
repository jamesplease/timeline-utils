import clamp from './clamp';
import { getZoomMagnitude } from './scroll-and-zoom';
import { getTimelineWidth } from './timeline';
import { getViewportOffset } from './viewport';
import { TimelineConstants } from './types';

export interface GetFramePixelWidthAtMinZoomOptions {
  timelineConstants: TimelineConstants;
}

// The size of a frame, in pixels, when normalizedZoom is 0
export function getFramePixelWidthAtMinZoom({
  timelineConstants,
}: GetFramePixelWidthAtMinZoomOptions): number {
  const { viewportWidth, totalFrameCount } = timelineConstants;

  return viewportWidth / totalFrameCount;
}

export interface GetFramePixelWidthOptions {
  timelineConstants: TimelineConstants;
  normalizedZoom: number;
}

export function getFramePixelWidth({
  timelineConstants,
  normalizedZoom,
}: GetFramePixelWidthOptions): number {
  const zoomMagnitude = getZoomMagnitude({
    timelineConstants,
    normalizedZoom,
  });

  const minFramePixelWidth = getFramePixelWidthAtMinZoom({
    timelineConstants,
  });

  return zoomMagnitude * minFramePixelWidth;
}

export interface FrameToPixelOptions {
  timelineConstants: TimelineConstants;
  normalizedZoom: number;
  frame: number;
  fractional?: boolean;
}

export function frameToPixel({
  timelineConstants,
  normalizedZoom,
  frame,
  fractional = false,
}: FrameToPixelOptions): number {
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

export interface GetNearestFrameToPixelOptions {
  timelineConstants: TimelineConstants;
  normalizedZoom: number;
  pixel: number;
}

// Returns the _nearest_ frame to the pixel. Always returns an entire
// pixel value. This can be useful for snapping interfaces.
export function nearestFrameToPixel({
  timelineConstants,
  normalizedZoom,
  pixel,
}: GetNearestFrameToPixelOptions): number {
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

export interface PixelToFrameOptions {
  timelineConstants: TimelineConstants;
  normalizedZoom: number;
  pixel: number;
  fractional?: boolean;
}

export function pixelToFrame({
  timelineConstants,
  normalizedZoom,
  pixel,
  fractional = false,
}: PixelToFrameOptions): number {
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

export interface ViewportPixelToFrameOptions {
  timelineConstants: TimelineConstants;
  normalizedZoom: number;
  pixel: number;
  fractional?: boolean;
  focusedFractionalFrame: number;
}

export function viewportPixelToFrame({
  timelineConstants,
  normalizedZoom,
  pixel,
  focusedFractionalFrame,
  fractional = false,
}: ViewportPixelToFrameOptions): number {
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

export interface NearestFrameToViewportPixelOptions {
  timelineConstants: TimelineConstants;
  normalizedZoom: number;
  pixel: number;
  focusedFractionalFrame: number;
}

export function nearestFrameToViewportPixel({
  timelineConstants,
  normalizedZoom,
  pixel,
  focusedFractionalFrame,
}: NearestFrameToViewportPixelOptions): number {
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
