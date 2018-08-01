# Timeline Utils

[![Travis build status](http://img.shields.io/travis/jamesplease/timeline-utils.svg?style=flat)](https://travis-ci.org/jamesplease/timeline-utils)
[![npm version](https://img.shields.io/npm/v/timeline-utils.svg)](https://www.npmjs.com/package/timeline-utils)
[![Test Coverage](https://coveralls.io/repos/github/jamesplease/timeline-utils/badge.svg?branch=master)](https://coveralls.io/github/jamesplease/timeline-utils?branch=master)

Utilities for working with timelines.

> Heads up! Timeline Utils has a best friend, [Framerate Utils](https://github.com/Netflix-Skunkworks/framerate-utils).
> If you are working with videos in JavaScript, you will also want to check that library out as well.

## Motivation

A timeline is a visual representation of information related to video. For instance, you may want to render an element that represents
how long a video is. And maybe you want to display markers on that element to represent a user's selection within that video.

This interface would be a _timeline_. The math behind timelines can be complicated, and this library exists to help you with that math.

## Installation

Install using [npm](https://www.npmjs.com):

```
npm install timeline-utils
```

or [yarn](https://yarnpkg.com/):

```
yarn add timeline-utils
```

## Table of Contents

- [**Guides**](./docs/guides/README.md)
  - [Concepts](./docs/guides/concepts.md)
  - [API Arguments](./docs/guides/api-arguments.md)
- [**API Reference**](./docs/api-reference/README.md)
  - [Conversions](./docs/api-reference/conversions.md)
  - [Viewport](./docs/api-reference/viewport.md)
  - [Timeline](./docs/api-reference/timeline.md)
  - [Scroll and Zoom](./docs/api-reference/scroll-and-zoom.md)
  - [Zoom Bar](./docs/api-reference/zoom-bar.md)
  - [`clamp()`](./docs/api-reference/clamp.md)
  - [`linear-scale()`](./docs/api-reference/linear-scale.md)

## Contributing

Are you interested in helping out with this project? That's awesome – thank you! Head on over to
[the contributing guide](./CONTRIBUTING.md) to get started.
