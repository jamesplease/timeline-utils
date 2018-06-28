import { nearestFrameToPixel } from '../../../src/conversions';

describe('nearestFrameToPixel', () => {
  it('is a function', () => {
    expect(typeof nearestFrameToPixel).toBe('function');
  });

  describe('normalizedZoom: 0', () => {
    describe('evenly divided frames/pixels', () => {
      it('returns the right value at the first pixel', () => {
        const timelineConfig = {
          viewportWidth: 1000,
          totalFrameCount: 500,
          minFramePixelWidth: 20,
        };

        const result = nearestFrameToPixel({
          timelineConfig,
          normalizedZoom: 0,
          pixel: 0,
        });

        expect(result).toBe(0);
      });

      it('returns the right value at the last pixel', () => {
        const timelineConfig = {
          viewportWidth: 1000,
          totalFrameCount: 500,
          minFramePixelWidth: 20,
        };

        const result = nearestFrameToPixel({
          timelineConfig,
          normalizedZoom: 0,
          pixel: 1000,
        });

        expect(result).toBe(500);
      });

      it('returns the right value at the middle pixel', () => {
        const timelineConfig = {
          viewportWidth: 1000,
          totalFrameCount: 500,
          minFramePixelWidth: 20,
        };

        const result = nearestFrameToPixel({
          timelineConfig,
          normalizedZoom: 0,
          pixel: 500,
        });

        expect(result).toBe(250);
      });
    });

    describe('unevenly divided frames/pixels', () => {
      it('returns the right value at the first pixel', () => {
        const timelineConfig = {
          viewportWidth: 999,
          totalFrameCount: 314124,
          minFramePixelWidth: 20,
        };

        const result = nearestFrameToPixel({
          timelineConfig,
          normalizedZoom: 0,
          pixel: 0,
        });

        expect(result).toBe(0);
      });

      it('returns the right value at the last pixel', () => {
        const timelineConfig = {
          viewportWidth: 999,
          totalFrameCount: 314124,
          minFramePixelWidth: 20,
        };

        const result = nearestFrameToPixel({
          timelineConfig,
          normalizedZoom: 0,
          pixel: 999,
        });

        expect(result).toBe(314124);
      });

      it('returns the right value at the middle pixel', () => {
        const timelineConfig = {
          viewportWidth: 999,
          totalFrameCount: 314124,
          minFramePixelWidth: 20,
        };

        const trueMiddle = nearestFrameToPixel({
          timelineConfig,
          normalizedZoom: 0,
          pixel: 499.5,
        });

        // The true middle is exactly halfway between the frames
        expect(trueMiddle).toBe(157062);

        // The middle pixel is odd, so we test both integer "middle" pixels.
        // To test these, we get the size of one frame: (999 / 314124).
        // Then, see how many of those fit in 1 pixel: 1 / (999 / 314124) .
        // Lastly, divide by 2, as each of these "middles" is 1/2 pixel
        // away from the true center. This is 157.2192192192
        // This value is then added or subtracted from the true middle value above.
        const upperMiddle = nearestFrameToPixel({
          timelineConfig,
          normalizedZoom: 0,
          pixel: 500,
        });

        // Actually 157219.219, but rounded.
        expect(upperMiddle).toBe(157219);

        const lowerMiddle = nearestFrameToPixel({
          timelineConfig,
          normalizedZoom: 0,
          pixel: 499,
        });

        // Actually 156904.781, but rounded.
        expect(lowerMiddle).toBe(156905);
      });
    });
  });

  describe('normalizedZoom: 1', () => {
    it('returns the right value at the first pixel', () => {
      const timelineConfig = {
        viewportWidth: 999,
        totalFrameCount: 314124,
        minFramePixelWidth: 20,
      };

      const result = nearestFrameToPixel({
        timelineConfig,
        normalizedZoom: 1,
        pixel: 0,
      });

      expect(result).toBe(0);
    });

    it('returns the right value at the last pixel', () => {
      // maxZoomMagnitude: 6288.7687687688...
      const timelineConfig = {
        viewportWidth: 999,
        totalFrameCount: 314124,
        minFramePixelWidth: 20,
      };

      const result = nearestFrameToPixel({
        timelineConfig,
        normalizedZoom: 1,
        pixel: 6282480,
      });

      expect(result).toBe(314124);
    });
  });

  describe('normalizedZoom: 0.5', () => {
    it('returns the right value at the first pixel', () => {
      const timelineConfig = {
        viewportWidth: 999,
        totalFrameCount: 314124,
        minFramePixelWidth: 20,
      };

      // zoomMagnitude: 1.9996820233
      const result = nearestFrameToPixel({
        timelineConfig,
        normalizedZoom: 0.5,
        pixel: 0,
      });

      expect(result).toBe(0);
    });

    it('returns the right value at the last pixel', () => {
      const timelineConfig = {
        viewportWidth: 999,
        totalFrameCount: 314124,
        minFramePixelWidth: 20,
      };

      // zoomMagnitude: 1.9996820233
      const result = nearestFrameToPixel({
        timelineConfig,
        normalizedZoom: 0.5,
        pixel: 1998,
      });

      expect(result).toBe(314124);
    });

    // This is a test that ensure that our dead space is only 1 pixel big.
    it('does not return the last value one pixel before the end', () => {
      const timelineConfig = {
        viewportWidth: 999,
        totalFrameCount: 314124,
        minFramePixelWidth: 20,
      };

      // zoomMagnitude: 1.9996820233
      const result = nearestFrameToPixel({
        timelineConfig,
        normalizedZoom: 0.5,
        pixel: 1997,
      });

      expect(result).not.toBe(314124);
      expect(result).toBeLessThan(314124);
    });
  });
});
