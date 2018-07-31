import { getTimelineWidth } from '../../../src/timeline';

describe('getTimelineWidth', () => {
  it('is a function', () => {
    expect(typeof getTimelineWidth).toBe('function');
  });

  describe('frames that divide into the viewport', () => {
    it('returns the expected value at normalizedZoom: 0', () => {
      const timelineConstants = {
        viewportWidth: 1000,
        totalFrameCount: 500,
        minFramePixelWidth: 20,
      };

      const result = getTimelineWidth({ timelineConstants, normalizedZoom: 0 });
      expect(result).toEqual(1000);
    });

    it('returns the expected value at normalizedZoom: 1', () => {
      const timelineConstants = {
        viewportWidth: 1000,
        totalFrameCount: 500,
        minFramePixelWidth: 20,
      };

      const result = getTimelineWidth({ timelineConstants, normalizedZoom: 1 });
      expect(result).toEqual(10000);
    });

    it('returns the expected value at normalizedZoom: 0.5', () => {
      const timelineConstants = {
        viewportWidth: 1000,
        totalFrameCount: 500,
        minFramePixelWidth: 20,
      };

      // zoomMagnitude => 1.8181818181...
      const result = getTimelineWidth({
        timelineConstants,
        normalizedZoom: 0.5,
      });
      // NOTE: this value has some dead space in it!
      expect(result).toEqual(1819);
    });

    it('returns the expected value at normalizedZoom: 0.5, fractional: true', () => {
      const timelineConstants = {
        viewportWidth: 1000,
        totalFrameCount: 500,
        minFramePixelWidth: 20,
      };

      // zoomMagnitude => 1.8181818181...
      const result = getTimelineWidth({
        timelineConstants,
        normalizedZoom: 0.5,
        fractional: true,
      });
      expect(result).toBeCloseTo(1818.1818, 3);
    });
  });

  describe('frames that do not divide evenly into the viewport', () => {
    it('returns the expected value at normalizedZoom: 0', () => {
      // I am intentionally picking nasty values here!
      const timelineConstants = {
        viewportWidth: 999,
        totalFrameCount: 31142,
        minFramePixelWidth: 17,
      };

      const result = getTimelineWidth({ timelineConstants, normalizedZoom: 0 });
      expect(result).toEqual(999);
    });

    it('returns the expected value at normalizedZoom: 1', () => {
      // I am intentionally picking nasty values here!
      const timelineConstants = {
        viewportWidth: 999,
        totalFrameCount: 31142,
        minFramePixelWidth: 17,
      };

      const result = getTimelineWidth({ timelineConstants, normalizedZoom: 1 });
      // Strangely, the math seems to always work out that the max zoom is an even pixel width.
      expect(result).toEqual(529414);
    });

    it('returns the expected value at normalizedZoom: 0.5', () => {
      // I am intentionally picking nasty values here!
      const timelineConstants = {
        viewportWidth: 999,
        totalFrameCount: 31142,
        minFramePixelWidth: 17,
      };

      // Heads up: the maxZoomMagnitude is 529.9439439439
      // and the zoomMagnitude at this normalizedZoom is 1.996233124.
      const result = getTimelineWidth({
        timelineConstants,
        normalizedZoom: 0.5,
      });
      // Heads up: there is dead space!
      expect(result).toEqual(1995);
    });

    it('returns the expected value at normalizedZoom: 0.5, fractional: true', () => {
      // I am intentionally picking nasty values here!
      const timelineConstants = {
        viewportWidth: 999,
        totalFrameCount: 31142,
        minFramePixelWidth: 17,
      };

      // Heads up: the maxZoomMagnitude is 529.9439439439
      // and the zoomMagnitude at this normalizedZoom is 1.996233124.
      const result = getTimelineWidth({
        timelineConstants,
        normalizedZoom: 0.5,
        fractional: true,
      });
      expect(result).toBeCloseTo(1994.2368, 3);
    });
  });
});
