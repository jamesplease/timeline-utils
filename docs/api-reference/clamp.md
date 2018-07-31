### `clamp( min, number, max )`

Ensures that `number` is between `min` and `max`.

#### Example usage

```js
import { clamp } from 'timeline-utils';

clamp(0, 5, 10);
// => 5

clamp(0, -5, 10);
// => 0
```

#### Tips

Clamping is typically useful for ensuring that rounding errors don't push things over the edge. For instance,

1.  you never want to zoom too far
2.  you never want to scroll too far
3.  you never want to select a frame that is outside of the frame count of the video

and so on. Clamping is a quick operation that we encourage using anytime you'll be using a value to render
a timeline.
