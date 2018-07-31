import clamp from './clamp';
import linearScale from './linear-scale';
import { getViewportOffsetMeasure } from './viewport';
import { TimelineConstants, ZoomBarDimensions } from './types';

export interface GetNormalizedZoomFromMouseMoveDeltaOptions {
  timelineConstants: TimelineConstants;
  normalizedZoom: number;
  mouseMoveDelta: number;
  zoomContainerWidth?: number;
  totalZoomDistance?: number;
  isPositive?: boolean;
}

// This allows you to change the zoom measure based on the
export function getNormalizedZoomFromMouseMoveDelta({
  timelineConstants,
  normalizedZoom,
  mouseMoveDelta,
  // Optional. Pass this in if the zoom container differs from the `viewportWidth`
  zoomContainerWidth,
  // Optional. This is how far the user needs to move their mouse to zoom from 0% to 100%.
  // Defaults to 1/2 of the width used in the calculation
  totalZoomDistance,
  // `true` if a mouse move in the positive direction zooms you in, `false` otherwise
  isPositive,
}: GetNormalizedZoomFromMouseMoveDeltaOptions): number {
  const { viewportWidth } = timelineConstants;

  const widthToUse =
    typeof zoomContainerWidth === 'number' ? zoomContainerWidth : viewportWidth;
  const zoomDistanceToUse =
    typeof totalZoomDistance === 'number'
      ? totalZoomDistance
      : Math.max(widthToUse / 2, 100);

  const direction = mouseMoveDelta >= 0 ? 1 : -1;
  const deltaDirection = isPositive ? 1 : -1;

  const absoluteDelta = Math.abs(mouseMoveDelta);

  const clampedDelta = clamp(0, absoluteDelta, zoomDistanceToUse);

  const absoluteChange = linearScale({
    domain: [0, zoomDistanceToUse],
    range: [0, 1],
    value: clampedDelta,
  });

  const possibleNormalizedZoom =
    normalizedZoom + direction * deltaDirection * absoluteChange;

  return clamp(0, possibleNormalizedZoom, 1);
}

export interface GetZoomBarDimensionsOptions {
  timelineConstants: TimelineConstants;
  normalizedZoom: number;
  focusedFractionalFrame: number;
  minZoomBarWidth?: number;
  zoomContainerWidth?: number;
}

export function getZoomBarDimensions({
  timelineConstants,
  normalizedZoom,
  focusedFractionalFrame,
  minZoomBarWidth = 40,
  // Optional. Pass this when the max width of the zoom bar differs from the timeline's `viewportWidth`
  zoomContainerWidth,
}: GetZoomBarDimensionsOptions): ZoomBarDimensions {
  const { viewportWidth } = timelineConstants;

  const widthToUse =
    typeof zoomContainerWidth === 'number' ? zoomContainerWidth : viewportWidth;

  const viewportOffsetMeasure = getViewportOffsetMeasure({
    timelineConstants,
    normalizedZoom,
    focusedFractionalFrame,
  });

  const width = linearScale({
    domain: [0, 1],
    range: [widthToUse, minZoomBarWidth],
    value: normalizedZoom,
  });

  const maxZoomBarLeft = widthToUse - width;

  const left = linearScale({
    domain: [0, 1],
    range: [0, maxZoomBarLeft],
    value: viewportOffsetMeasure,
  });

  return {
    left,
    width,
  };
}
