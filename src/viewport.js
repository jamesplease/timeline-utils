import clamp from './clamp';
import linearScale from './linear-scale';
import { getTimelineWidth } from './timeline';
import { framesToPixels, frameAtPixel } from './conversions';

// These utilities are all about the viewport. The viewport is the
// visible section of the timeline. The `viewportWidth` in
// `timelineConfig` represents the physical size of the viewport.

// This is the furthest to the left that the viewport can scroll.
export function getMaxViewportOffset({ timelineConfig, normalizedZoom } = {}) {
  const { viewportWidth } = timelineConfig;
  const fullTimelineWidth = getTimelineWidth({
    timelineConfig,
    normalizedZoom
  });

  return fullTimelineWidth - viewportWidth;
}

export function clampViewportOffset({
  timelineConfig,
  viewportOffset,
} = {}) {
  const maxViewportOffset = getMaxViewportOffset({ timelineConfig });

  return clamp(0, viewportOffset, maxViewportOffset);
}

export function getViewportOffset({ timelineConfig } = {}) {
  const { viewportWidth } = timelineConfig;

  const frameOffset = framesToPixels({
    timelineConfig,
    frames: timelineConfig.frame,
  });

  // The offset of a viewport MUST be an integer value. You cannot scroll
  // to, say, 1.5px. This is an effort to ensure that our library's math,
  // and what the browser renders, never disagree.
  const possibleViewportOffset = Math.round(frameOffset - viewportWidth / 2);

  return clampViewportOffset({
    timelineConfig,
    viewportOffset: possibleViewportOffset,
  });
}

export function getViewportFrameEndpoints({ timelineConfig, normalizedZoom }) {
  const { viewportWidth } = timelineConfig;

  const viewportOffset = getViewportOffset({ timelineConfig, normalizedZoom });

  const startPixel = viewportOffset;
  // We can be 100% certain that this never jumps over the boundaries
  const endPixel = startPixel + viewportWidth;

  const startFrame = frameAtPixel({
    timelineConfig,
    pixel: startPixel,
    fractional: true,
  });
  const endFrame = frameAtPixel({
    timelineConfig,
    pixel: endPixel,
    fractional: true,
  });

  return {
    startFrame,
    endFrame,
  };
}

export function getViewportFrameWidth({ timelineConfig, normalizedZoom, roundUp }) {
  const { viewportWidth, totalFrameCount } = timelineConfig;
  const fullTimelineWidth = getTimelineWidth({
    timelineConfig,
    normalizedZoom,
    fractional: true,
  });

  const fractionalFrame = linearScale({
    domain: [0, fullTimelineWidth],
    range: [0, totalFrameCount],
    value: viewportWidth,
  });

  return roundUp ? Math.ceil(fractionalFrame) : Math.floor(fractionalFrame);
}

export function getViewportOffsetMeasure({
  timelineConfig,
  viewportOffset,
} = {}) {
  const maxViewportOffset = getMaxViewportOffset({ timelineConfig });

  return linearScale({
    domain: [0, maxViewportOffset],
    range: [0, 1],
    value: viewportOffset,
  });
}

