# Zoom Bar

A zoom bar is an interface element that allows a user to zoom and scroll a timeline. These functions help
with the positioning and functionality of a zoom bar.

### `getNormalizedZoomFromMouseMoveDelta({ timelineConstants, normalizedZoom, mouseMoveDelta, zoomContainerWidth, totalZoomDistance, isPositive })`

Some interfaces support clicking and dragging an element, such as the endpoint of a zoom bar, to zoom
the timeline.

This method can help with that calculation by providing you with the new zoom based on the current change in
the mouse position.

- `mouseMoveDelta` - the distance that the user has moved the mouse in this click-and-drag action
- `totalZoomDistance` - optional. How far (in pixels) the user must drag the mouse to go from a normalized zoom of 0 to 1.
  Defaults to half of the width of the timeline.
- `isPositive` - Pass `true` if mouse movement in the positive direction zooms you in, and `false` otherwise
- `zoomContainerWidth` - optional. Pass this in if your zoom bar container differs in width from the `viewportWidth` within `timelineConstants`.

```js
import { getNormalizedZoomFromMouseMoveDelta } from 'timeline-utils';

myElement.addEventListener('mousemove');
```

### `getZoomBarDimensions({ timelineConstants, normalizedZoom, focusedFractionalFrame, minZoomBarWidth, zoomContainerWidth })`

Calculates the dimensions to render the zoom bar with. The return value is an object with two properties:

- `left`
- `width`

The arguments are:

- `timelineConstants`: refer to [the API Arguments Guide](../guides/api-arguments.md) for more information.
- `normalizedZoom`: refer to [the API Arguments Guide](../guides/api-arguments.md) for more information.
- `focusedFractionalFrame`: refer to [the API Arguments Guide](../guides/api-arguments.md) for more information.
- `minZoomBarWidth`: optional. The minimum width, in pixels, that you want to render the zoom bar as. Defaults to `40`.
- `zoomContainerWidth`: optional. The size of the zoom bar's container. Defaults to the width of the timeline as specified in
  `timelineConstants`.
