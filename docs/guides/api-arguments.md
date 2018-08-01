# API Arguments

Timeline Utils is a collection of functions that can be useful for working with visualizations. Many of the functions
accept one or more of the same arguments. These arguments are described below:

### `timelineConstants`

The timeline constants are pieces of information about the timeline. They are considered "constant" due to the fact that they are
unrelated to the user's position within the viewport. As the user zooms and pans the timeline, these values do not change.

| Key                | Default Value | Description                                                   |
| ------------------ | ------------- | ------------------------------------------------------------- |
| viewportWidth      |               | The width, in pixels, of the viewport                         |
| totalFrameCount    |               | The total number of frames in the timeline                    |
| minFramePixelWidth | 18            | The size, in pixels, of an individual frame when zoomed 100%. |

### `normalizedZoom`

A value from 0 to 1 that represents how far the timeline is zoomed. 0 means no zoom, 1 means maximally zoomed.

### `focusedFractionalFrame`

The currently-focused fractional frame.

### `fractional`

Whether or not to return a _fractional_ value. For instance, sometimes a frame may fall in the middle of a pixel. Sometimes, you may
want to know that fractional pixel value so that you don't lose accuracy too early in a calculation. However, when it comes to actually
rendering out a value, you do not want to pass a fractional pixel to the browser, because we want to be in control of the rounding.
