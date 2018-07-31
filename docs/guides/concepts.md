# Concepts

## Normalized Value

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

## Fractional Values

Some values only exist as integers (they are [discrete](https://en.wikipedia.org/wiki/Discrete_mathematics)). For instance, frames in a video.
If a video has 2 frames, then there are only two possible values that an active frame can be: frame 0, or frame 1. It's simply not
possible to be on, say, frame 1.5, because each frame is a particular image.

However, when you represent a value like frames _visually_, you typically display them as having a width. This permits
a place onscreen - some pixel – that can represent a value _between_ 0 and 1.

In this way, a visualization of a discrete value can be considered continuous.

Because it is important to know whether you are working with the discrete version of a value, or the continuous one,
Timeline Utils provides a name for the continuous versions of things: _fractional values_.

There are two important kinds of fractional values in Timeline Utils:

- fractional frames
- fractional pixels

The primary use of fractional values is to ensure accuracy when changing between frames and pixels. For instance, "frame 31"
is typically located at a fractional pixel, and "pixel 300" is typically pointing to a fractional frame.

Outside of unit conversions, you **should not** use fractional values. If you do, you open your timeline up to off-to-one
errors. Timeline Utils provides methods that round fractional values for you, and those are what you should use when
rendering pixels, or seeking the video to a frame.

## Dead Space

In the above section, it was eplained how a visualization of a discrete value like frames can transform it from a discrete space to
a continuous one.

This is not quite true. The reason is that these visualizations are drawn to a screen, which is itself a discrete series of pixels.

A visualization, then, is a set of two discrete spaces that are laid on top of one another. These two discrete spaces do not necessarily
line up beyond the first frame/pixel.

What this means is that there is no guarantee that the last frame in a video will line up with a pixel. In fact, most of the time
it will not. A constraint of Timeline Utils is that every frame _must_ be rendered onscreen, always. It never cuts off a title
short.

As a consequence, most of the time only part of the last pixel of a timeline represents actual frames in the video. The rest of that
last pixel is still rendered, but represents _dead space_: a value that is actually outside of the frame.

The size of the dead space, represented by the variable `d`, always satisfies the inequality `0 <= d < 1`.

It may seem silly to focus so much on a pixel value. But given that a single pixel can, at times, represent hundreds of frames,
the dead space can add up to being several seconds of time. It is important to understand and be conscious of the impact of
dead space on your visualization.

## Frame Bin

A frame bin is the space that an individual frame takes up on a timeline. At low zoom levels, bins have 0 width, as many
frames fit into a single pixel. Once you pass the point where a single frame is rendered at 1px, then individual frames
have a non-zero bin size.
