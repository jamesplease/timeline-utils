# Timeline

These utilities help calculate values related to the rendered length of the timeline.

### `getTimelineWidth({ timelineConstants, normalizedZoom, fractional })`

Returns the width of the timeline, in pixels. As `normalizedZoom` increases, so does the width.

By default, `fractional` is false, which means that you will always receive an integer width. Pass `fractional: true` to
receive a fractional pixel value.

```js
import { getTimelineWidth } from 'timeline-utils';
import { timelineConstants, normalizedZoom } from './my-timeline-data';

getTimelineWidth({
  timelineConstants,
  normalizedZoom,
});
```

### `getTimelineDeadSpaceInPixels({ timelineConstants, normalizedZoom })`

This method returns to you the amount of dead space in pixels. To learn what dead space is, refer to the
[Concepts Guide](../guides/concepts.md).
