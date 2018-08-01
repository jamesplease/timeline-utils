# Viewport

The viewport is the section of your webpage that is displaying the timeline. Frequently, it is
scrollable along one or both axes to accomodate different zoom levels.

### `getMaxViewportOffset({ timelineConstants, normalizedZoom })`

Returns the furthest value, in pixels, that the viewport can be scrolled at this zoom level.

### `clampViewportOffset({ timelineConstants, normalizedZoom, viewportOffset })`

Ensures that the viewport is not scrolled too far to the left, or to the right. Anytime that you programmatically set the
scrollbar's position, it is wise to use this method to ensure that your calculation doesn't go beyond these boundaries.

### `getViewportOffset({ timelineConstants, normalizedZoom, focusedFractionalFrame })`

Computes the viewport offset given a focused fractional frame.

### `getNormalizedViewportOffset({ timelineConstants, focusedFractionalFrame, normalizedZoom })`

Returns the [normalized](../guides/concepts.md) viewport offset.

### `getViewportFrameEndpoints({ timelineConstants, normalizedZoom, focusedFractionalFrame, fractional })`

The frame endpoints refer to which [frame bin](../guides/concepts.md#frame-bin) the first and last pixel of the
viewport fall into.

### `getViewportFrameWidth({ timelineConstants, normalizedZoom, fractional })`

Returns the width of the viewport in frames. `fractional` is optional, and defaults to `false`.
