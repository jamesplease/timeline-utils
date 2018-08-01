# Scroll and Zoom

### `getMaxZoomMagnitude({ timelineConstants })`

Returns the _maximum_ zoom magnitude given `timelineConstants`. The maximum zoom magnitude is the number
that elements on the timeline are scaled by when the normalized zoom is 1.

### `getZoomMagnitude({ timelineConstants, normalizedZoom })`

Returns the magnitude of the zoom, given `timelineConstants` and `normalizedZoom`. The zoom magnitude is
the number that elements on the timeline are scaled by at a given normalized zoom level.

### `getFocusableEndpoints({ timelineConstants, normalizedZoom })`

Returns the focusable endpoints, given `timelineConstants` and `normalizedZoom`. Focusable endpoints
are the earliest and latest frames that can be focused without the viewport extending beyond the
timeline.

Remember, the focused frame is the centerpoint of the viewport. So if you viewport is 100 frames long, and
you tried to focus on frame 0, then half of the viewport would extend to the left of frame 0. That
wouldn't be good.

This method can be used, along with [`clamp()`](./clamp.md), to ensure that you never focus on an out-of-bounds frame.

### `getPositionFromFrame({ timelineConstants, startFrame, endFrame })`

The word "position" in this function refers to the _location_ of the viewport. It is an object with two properties:

- `normalizedZoom`
- `focusedFractionalFrame`

When you pass in a `startFrame` and an `endFrame`, this will return to you the focused frame and zoom that you need
to make those frames the first and last frame of the viewport.

This can be useful if your interface allows a user to zoom in on a specific element on the timeline.
