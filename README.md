# Timeline Utils

[![Travis build status](http://img.shields.io/travis/jamesplease/timeline-utils.svg?style=flat)](https://travis-ci.org/jamesplease/timeline-utils)
[![npm version](https://img.shields.io/npm/v/timeline-utils.svg)](https://www.npmjs.com/package/timeline-utils)
[![Test Coverage](https://coveralls.io/repos/github/jamesplease/timeline-utils/badge.svg?branch=master)](https://coveralls.io/github/jamesplease/timeline-utils?branch=master)

Utilities for working with timelines.

> Heads up! Timeline Utils has a best friend, [Framerate Utils](https://github.com/Netflix-Skunkworks/framerate-utils).
> If you are working with videos in JavaScript, you will also want to check that library out as well.

## Table of Contents

- [**Guides**](./docs/guides/index.md)
  - [Concepts](./docs/guides/concepts.md)
- [**API Reference**](./docs/api-reference/index.md)
  - [Conversions](./docs/api-reference/conversions.md)
  - [Viewport](./docs/api-reference/viewport.md)
  - [Timeline](./docs/api-reference/timeline.md)
  - [Scroll and Zoom](./docs/api-reference/scroll-and-zoom.md)
  - [Zoom Bar](./docs/api-reference/zoom-bar.md)
  - [`clamp()`](./docs/api-reference/clamp.md)
  - [`linear-scale()`](./docs/api-reference/linear-scale.md)

## API Arguments

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

## API Categories

Timeline Utilities are organized in categories.

| Category Name   | Functions related to...                                                       |
| --------------- | ----------------------------------------------------------------------------- |
| Conversions     | moving between pixels and frames                                              |
| Viewport        | the piece of the timeline that is currently onscreen                          |
| Timeline        | the _full_ timeline; all of the frames that are rendered                      |
| Scroll and Zoom | scrolling and zooming the timeline                                            |
| Zoom Bar        | an interface element that allows a user to use their mouse to zoom and scroll |
