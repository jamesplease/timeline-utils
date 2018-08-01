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

Returns the width of a single frame, in pixels.

### `frameToPixel({ timelineConstants, normalizedZoom, frame, fractional })`

Returns the pixel that corresponds to a given frame. `fractional` is optional,
and defaults to `false`.

When `fractional` is `false`, the pixel will be determined by _rounding_.

### `nearestFrameToPixel({ timelineConstants, normalizedZoom, frame, fractional })`

Returns the frame that corresponds to a given pixel. `fractional` is optional,
and defaults to `false`.

When `fractional` is `false`, the frame will be determined by _rounding_.

### `pixelToFrame({ timelineConstants, normalizedZoom, pixel, fractional })`

Returns the frame at this pixel, determined by _flooring_ the pixel. `fractional` is optional,
and defaults to `false`.

### `viewportPixelToFrame({ timelineConstants, normalizedZoom, pixel, focusedFractionalFrame, fractional })`

Similar to `pixelToFrame`, but accepts a `pixel` that is relative to the viewport. `fractional` is optional,
and defaults to `false`.

### `nearestFrameToViewportPixel({ timelineConstants, normalizedZoom, pixel, focusedFractionalFrame })`

Similar to `nearestFrameToPixel`, but accepts a `pixel` that is relative to the viewport. `fractional` is optional,
and defaults to `false`.
