import clamp from './clamp';
import linearScale from './linear-scale';
import { getTimelineWidth } from './timeline';
import { frameToPixel, pixelToFrame } from './conversions';
import { TimelineConstants, ViewportFrameEndpoints } from './types';

// These utilities are all about the viewport. The viewport is the
// visible section of the timeline. The `viewportWidth` in
// `timelineConstants` represents the physical size of the viewport.

export interface GetMaxViewportOffsetOptions {
  timelineConstants: TimelineConstants;
  normalizedZoom: number;
}

// This is the furthest to the left that the viewport can scroll.
export function getMaxViewportOffset({
  timelineConstants,
  normalizedZoom,
}: GetMaxViewportOffsetOptions): number {
  const { viewportWidth } = timelineConstants;
  const fullTimelineWidth = getTimelineWidth({
    timelineConstants,
    normalizedZoom,
  });

  return fullTimelineWidth - viewportWidth;
}

export interface ClampViewportOffsetOptions {
  timelineConstants: TimelineConstants;
  normalizedZoom: number;
  viewportOffset: number;
}

export function clampViewportOffset({
  timelineConstants,
  normalizedZoom,
  viewportOffset,
}: ClampViewportOffsetOptions): number {
  const maxViewportOffset = getMaxViewportOffset({
    timelineConstants,
    normalizedZoom,
  });

  return clamp(0, viewportOffset, maxViewportOffset);
}

export interface GetViewportOffsetOptions {
  timelineConstants: TimelineConstants;
  normalizedZoom: number;
  focusedFractionalFrame: number;
}

export function getViewportOffset({
  timelineConstants,
  normalizedZoom,
  focusedFractionalFrame,
}: GetViewportOffsetOptions): number {
  const { viewportWidth } = timelineConstants;

  const framePixelOffset = frameToPixel({
    timelineConstants,
    normalizedZoom,
    frame: focusedFractionalFrame,
    // We perform the rounding here. That way, the focused frame is as close as possible
    // to the nearest pixel.
    fractional: true,
  });

  // This ensures that the _offset_ of the pixel is constant. The intention here is to
  // prevent "wiggles" as the user zooms in. So long as the distance between the focused
  // pixel and the left viewport edge remain constant, there should not be wiggles.
  const halfViewportWidth = viewportWidth / 2;

  // Both of these values are integers, so this should always return a whole number
  const possibleViewportOffset = Math.round(
    framePixelOffset - halfViewportWidth
  );

  // Lastly, we clamp our offset so that it matches what is physically possible in the
  // browser. This helps to ensure that any local state that mirrors the viewport does not disagree with
  // what's in the DOM.
  return clampViewportOffset({
    timelineConstants,
    normalizedZoom,
    viewportOffset: possibleViewportOffset,
  });
}

export interface GetViewportFrameEndpointsOptions {
  timelineConstants: TimelineConstants;
  normalizedZoom: number;
  focusedFractionalFrame: number;
  fractional?: boolean;
}

// The frame endpoints refer to which frame bin the first and last pixel of the viewport fall into.
export function getViewportFrameEndpoints({
  timelineConstants,
  normalizedZoom,
  focusedFractionalFrame,
  fractional,
}: GetViewportFrameEndpointsOptions): ViewportFrameEndpoints {
  const { viewportWidth } = timelineConstants;

  const viewportOffset = getViewportOffset({
    timelineConstants,
    normalizedZoom,
    focusedFractionalFrame,
  });

  const startPixel = viewportOffset;
  // We can be certain at this point that, with proper use of this lib, this never jumps over the boundary
  const endPixel = startPixel + viewportWidth;

  const startFrame = pixelToFrame({
    timelineConstants,
    normalizedZoom,
    pixel: startPixel,
    fractional,
  });

  const endFrame = pixelToFrame({
    timelineConstants,
    normalizedZoom,
    pixel: endPixel,
    fractional,
  });

  return {
    startFrame,
    endFrame,
  };
}

export interface GetViewportFrameWidth {
  timelineConstants: TimelineConstants;
  normalizedZoom: number;
  fractional?: boolean;
}

// Note: non-fractional values round up.
export function getViewportFrameWidth({
  timelineConstants,
  normalizedZoom,
  fractional,
}: GetViewportFrameWidth): number {
  const fractionalSize = pixelToFrame({
    timelineConstants,
    normalizedZoom,
    pixel: timelineConstants.viewportWidth,
  });

  return fractional ? fractionalSize : Math.ceil(fractionalSize);
}

export interface GetNormalizedViewportOffsetOptions {
  timelineConstants: TimelineConstants;
  focusedFractionalFrame: number;
  normalizedZoom: number;
}

export function getNormalizedViewportOffset({
  timelineConstants,
  focusedFractionalFrame,
  normalizedZoom,
}: GetNormalizedViewportOffsetOptions): number {
  const viewportOffset = getViewportOffset({
    timelineConstants,
    normalizedZoom,
    focusedFractionalFrame,
  });

  const maxViewportOffset = getMaxViewportOffset({
    timelineConstants,
    normalizedZoom,
  });

  return linearScale({
    domain: [0, maxViewportOffset],
    range: [0, 1],
    value: viewportOffset,
  });
}
