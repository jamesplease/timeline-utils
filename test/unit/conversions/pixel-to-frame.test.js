import { pixelToFrame } from '../../../src/conversions';

// TODO: fractional tests
describe('pixelToFrame', () => {
  it('is a function', () => {
    expect(typeof pixelToFrame).toBe('function');
  });

  describe('normalizedZoom: 0', () => {
    it('returns the right value at 0', () => {
      const timelineConfig = {
        viewportWidth: 997,
        totalFrameCount: 514127,
        minFramePixelWidth: 19,
      };

      const result = pixelToFrame({
        timelineConfig,
        normalizedZoom: 0,
        pixel: 0,
      });

      expect(result).toEqual(0);
    });

    it('returns the right value at the middle pixel', () => {
      const timelineConfig = {
        viewportWidth: 997,
        totalFrameCount: 514127,
        minFramePixelWidth: 19,
      };

      const middlePixel = pixelToFrame({
        timelineConfig,
        normalizedZoom: 0,
        pixel: 498.5,
      });

      expect(middlePixel).toEqual(257063);
    });

    it('returns the right value at the last pixel', () => {
      const timelineConfig = {
        viewportWidth: 997,
        totalFrameCount: 514127,
        minFramePixelWidth: 19,
      };

      const result = pixelToFrame({
        timelineConfig,
        normalizedZoom: 0,
        pixel: 997,
      });

      expect(result).toEqual(514127);
    });
  });

  describe('normalizedZoom: 1', () => {
    it('returns the right value at 0', () => {
      const timelineConfig = {
        viewportWidth: 997,
        totalFrameCount: 514127,
        minFramePixelWidth: 19,
      };

      const result = pixelToFrame({
        timelineConfig,
        normalizedZoom: 1,
        pixel: 0,
      });

      expect(result).toEqual(0);
    });

    it('returns the right value at the middle pixel', () => {
      // maxZoomMagnitude: 9797.8064192578
      const timelineConfig = {
        viewportWidth: 997,
        totalFrameCount: 514127,
        minFramePixelWidth: 19,
      };

      const result = pixelToFrame({
        timelineConfig,
        normalizedZoom: 1,
        pixel: 4884206.5,
      });

      expect(result).toEqual(257063);
    });

    it('returns the right value at the last pixel', () => {
      // maxZoomMagnitude: 9797.8064192578
      const timelineConfig = {
        viewportWidth: 997,
        totalFrameCount: 514127,
        minFramePixelWidth: 19,
      };

      const result = pixelToFrame({
        timelineConfig,
        normalizedZoom: 1,
        pixel: 9768413,
      });

      expect(result).toEqual(514127);
    });
  });
});
