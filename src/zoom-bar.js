import clamp from './clamp';
import linearScale from './linear-scale';
import { getViewportOffsetMeasure } from './viewport';

// This allows you to change the zoom measure based on the
export function getNormalizedZoomFromMouseMoveDelta({
  timelineConfig,
  normalizedZoom,
  mouseMoveDelta,
  // Optional. Pass this in if the zoom container differs from the `viewportWidth`
  zoomContainerWidth,
  // Optional. This is how far the user needs to move their mouse to zoom from 0% to 100%.
  // Defaults to 1/2 of the width used in the calculation
  totalZoomDistance,
  // `true` if a mouse move in the positive direction zooms you in, `false` otherwise
  isPositive,
}) {
  const { viewportWidth } = timelineConfig;

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

export function getZoomBarDimensions({
  timelineConfig,
  normalizedZoom,
  focusedFractionalFrame,
  minZoomBarWidth = 40,
  // Optional. Pass this when the max width of the zoom bar differs from the timeline's `viewportWidth`
  zoomContainerWidth,
} = {}) {
  const { viewportWidth } = timelineConfig;

  const widthToUse =
    typeof zoomContainerWidth === 'number' ? zoomContainerWidth : viewportWidth;

  const viewportOffsetMeasure = getViewportOffsetMeasure({
    timelineConfig,
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
