# Conversions

Conversions are a set of functions that involve converting from one unit to another unit.

### `getFramePixelWidthAtMinZoom({ timelineConstants })`

This returns the width, in pixels, of a single frame when the timeline is not zoomed at all. In other
words, when the `normalizedZoom` is 0.

```js
import { getFramePixelWidthAtMinZoom } from 'timeline-utils';
import { timelineConstants } from './my-timeline-data';

// Assuming that:
//
// timelineConstants = {
//   viewportWidth: 1000,
//   totalFrameCount: 500,
// }
getFramePixelWidthAtMinZoom({
  timelineConstants,
});
// => 2
```

### `getFramePixelWidth({ timelineConstants, normalizedZoom })`

### `frameToPixel({ timelineConstants, normalizedZoom, frame, fractional })`

### `nearestFrameToPixel({ timelineConstants, normalizedZoom, frame, fractional })`

### `pixelToFrame({ timelineConstants, normalizedZoom, pixel, fractional })`

### `viewportPixelToFrame({ timelineConstants, normalizedZoom, pixel, focusedFractionalFrame, fractional })`

### `nearestFrameToViewportPixel({ timelineConstants, normalizedZoom, pixel, focusedFractionalFrame })`
