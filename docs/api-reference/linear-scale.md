# `linearScale({ domain, range, value })`

Linearly maps a `value` from `domain` onto `range`.

### Example usage

```js
import { linearScale } from 'timeline-utils';

linearScale({
  domain: [0, 1],
  range: [0, 100],
  value: 0.75,
});
// => 75
```

### Tips

Linear scales are useful when working with normalized values. For instance, in Timeline Utils you will
frequently work with a _normalized zoom_ value, which goes from 0 to 1. Frequently, it is convenient
to know the _magnitude_ of the zoom (how much to scale UI elements by). You can convert between a normalized
value and its magnitude using `linearScale`:

```js
import { linearScale, getMaxZoomMagnitude } from 'timeline-utils';
import { timelineConstants, normalizedZoom } from './my-timeline-data';

linearScale({
  domain: [0, 1],
  range: [1, getMaxZoomMagnitude({ timelineConstants })],
  value: normalizedZoom,
});
```

Because of the nature of timelines, linear scales are frequently useful. Keep an eye out for situations where
using a linear scale could simplify your code.
