import {
  getZoomMagnitude,
  getMaxZoomMagnitude,
} from '../../../src/scroll-and-zoom';

describe('getZoomMagnitude', () => {
  it('is a function', () => {
    expect(typeof getZoomMagnitude).toBe('function');
  });

  it('returns 1 when normalizedZoom is 0', () => {
    const timelineConfig = {
      viewportWidth: 1000,
      totalFrameCount: 500,
      minFramePixelWidth: 20,
    };

    const result = getZoomMagnitude({ timelineConfig, normalizedZoom: 0 });
    expect(result).toEqual(1);
  });

  it('returns the expected value when normalizedZoom is 1', () => {
    const timelineConfig = {
      viewportWidth: 1000,
      totalFrameCount: 500,
      minFramePixelWidth: 20,
    };

    const maxZoomMagnitude = getMaxZoomMagnitude({ timelineConfig });

    const result = getZoomMagnitude({ timelineConfig, normalizedZoom: 1 });
    expect(result).toEqual(10);
    expect(result).toEqual(maxZoomMagnitude);
  });

  // Due to the way that math works, 0.5 normalizedZoom typically does not equal x2
  // zoom. The easiest way to understand why this is is to imagine a timeline
  // where the highest zoom is actually just 2x.
  // In that situation, a normalizedZoom of 1 represents 2x zoom, so obviously
  // 0.5 cannot _also_ represent 2x!
  // Believe it or not, the math works out that the more frames you have, the closer
  // to x2 you get!
  //
  // The equation for the zoomMagnitude at 0.5 is:
  //
  // 2x / ( x + 1 )
  //
  // where:
  //
  // inverseMax = 1 / maxZoom
  //
  // Note that the value does eventually go above 2, but it increases very, very slowly
  // at large numbers.
  //
  // To see a visualization of this equation, visit:
  //
  // http://www.wolframalpha.com/input/?i=plot+1+%2F+(+(1+-+(1%2Fx))+%2F+2+%2B+(1%2Fx)+)+from+100+to+100000
  describe('0.5 normalizedZoom should be around 2', () => {
    it('applies to shorter videos in a 1000px viewport', () => {
      const timelineConfig = {
        viewportWidth: 1000,
        // 3.5 minutes of footage @ 24 fps, yielding a max zoom of...
        totalFrameCount: 5000,
        // 100x max zoom
        minFramePixelWidth: 20,
      };

      const result = getZoomMagnitude({ timelineConfig, normalizedZoom: 0.5 });
      expect(result).toBeCloseTo(2, 1);
      expect(result).not.toEqual(2);
    });

    it('applies to long videos in a 1000px viewport', () => {
      const timelineConfig = {
        viewportWidth: 1000,
        // 57 hours of footage @ 24 fps, yielding a max zoom of...
        totalFrameCount: 5000000,
        // 10000x max zoom
        minFramePixelWidth: 20,
      };

      const result = getZoomMagnitude({ timelineConfig, normalizedZoom: 0.5 });
      // We can increase the precision because it gets closer to 2 as the number grows
      expect(result).toBeCloseTo(2, 3);
      expect(result).not.toEqual(2);
    });
  });

  it('returns the expected value when normalizedZoom is 1', () => {
    const timelineConfig = {
      viewportWidth: 1000,
      totalFrameCount: 500,
      minFramePixelWidth: 20,
    };

    const maxZoomMagnitude = getMaxZoomMagnitude({ timelineConfig });

    const result = getZoomMagnitude({ timelineConfig, normalizedZoom: 1 });
    expect(result).toEqual(10);
    expect(result).toEqual(maxZoomMagnitude);
  });

  it('returns the expected value when normalizedZoom is 0.5', () => {
    const timelineConfig = {
      viewportWidth: 1000,
      totalFrameCount: 500,
      minFramePixelWidth: 20,
    };

    const result = getZoomMagnitude({ timelineConfig, normalizedZoom: 0.5 });
    // Using the equation above, we get:
    //
    // = ( 2 * 10 ) / ( 21 )
    // = 20 / 11
    // = 1.8181818181...
    //
    expect(result).toBeCloseTo(1.8181, 3);
  });
});
