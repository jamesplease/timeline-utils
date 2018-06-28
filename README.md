# Timeline Utils

Utilities for working with timelines.

## Concepts

### Normalized Value

A **normalized value** is a number between 0 and 1 that maps [linearly](https://en.wikipedia.org/wiki/Linear_function) to some other value.

Normalized values are best understood with an example. Consider a particular DOM element on a webpage that has a width of 600px. You could define
a `normalizedWidth` for this node that goes from 0 to 1, where 0 represents "0px" and 1 represents "600px".

This can be useful if you want to, say, draw a line at the end of the DOM element. You could say: "draw a line at `normalizedWidth: 1`".
This allows you to draw a line even in situations where you don't know, or don't care to know, the _actual_ width of the element.

What's more, the code that you write will work for all other elements, independent of their widths. In this example, `normalizedWidth: 1`
will _always_ represent the right border of any given element.

Normalized values are useful any time that the "upper limit" of a range varies. In Timeline Utils, normalized values are mostly used when it comes
to zooming.

> Note: the name "normalized value" is borrowed from the concept of [normalized vectors](https://en.wikipedia.org/wiki/Normalized_vector) from
> mathematics.

### Fractional Values

Some values only exist as integers (they are [discrete](https://en.wikipedia.org/wiki/Discrete_mathematics)). For instance, frames in a video.
If a video has 2 frames, then there are only two possible values that the selected frame can be: frame 0, or frame 1.

However, when you represent a value like frames _visually_, you typically give each frame a width. This permits
a place onscreen, some pixel, that can represent a value _between_ 0 and 1.

In this way, a visualization of a discrete value can be considered continuous.

In this library, these values are called _fractional values_. Fractional values are useful when it comes
to visualizations, but do note that you should _never_ mistake a fractional value for a real value.

Using a fractional value outside of the timeline will open you up to errors. This is because you are handing
off the responsibility of rounding the value to the consumer of that value, and this can cause considerable
problems when visualizing a timeline.

> Note: a visualization of frames is never actually continuous.

### Dead Space

In the above section, we described how a visualization of a discrete value like frames can turn it from a discrete value to
a continuous one.

This is not quite true. The reason is that any visualization is drawn to a screen, which is itself a discrete series of pixels.

A visualization, then, is a set of two discrete spaces that are laid on top of one another, and that do not necessarily line up
beyond the initial frame/pixel.

An emergent phenomenon from a system like this is _dead space_. Dead space arises from the constraint that the visual timeline
should _never_ cut off of a frame. Every frame should be visualized.

## API Concepts

### `timelineConfig`

The timeline configuration are data points about the timeline. They are considered "config" as they are
unrelated to the current position of the viewport. In other words, as the user zooms and pans the
timeline, these values will not change.

| Key                | Default Value | Description                                                   |
| ------------------ | ------------- | ------------------------------------------------------------- |
| viewportWidth      |               | The width, in pixels, of the viewport                         |
| totalFrameCount    |               | The total number of frames in the timeline                    |
| minFramePixelWidth | 18            | The size, in pixels, of an individual frame when zoomed 100%. |

### `normalizedZoom`

A value from 0 to 1 that represents how far the timeline is zoomed. 0 means no zoom, 1 means maximally zoomed.

### `focusedFractionalFrame`

The currently-focused fractional frame.
