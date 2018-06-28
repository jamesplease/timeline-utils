import { getFramePixelWidth } from '../../../src/conversions';

describe('getFramePixelWidth', () => {
  it('is a function', () => {
    expect(typeof getFramePixelWidth).toBe('function');
  });

  it('returns the right value at normalizedZoom: 0', () => {
    const timelineConfig = {
      viewportWidth: 1000,
      totalFrameCount: 500,
      minFramePixelWidth: 20,
    };

    const result = getFramePixelWidth({
      timelineConfig,
      normalizedZoom: 0,
    });

    expect(result).toEqual(2);
  });

  it('returns the right value at normalizedZoom: 1', () => {
    const timelineConfig = {
      viewportWidth: 1000,
      totalFrameCount: 500,
      minFramePixelWidth: 20,
    };

    const result = getFramePixelWidth({
      timelineConfig,
      normalizedZoom: 1,
    });

    expect(result).toEqual(20);
  });

  it('returns the right value at normalizedZoom: 0.5', () => {
    const timelineConfig = {
      viewportWidth: 1000,
      totalFrameCount: 500,
      minFramePixelWidth: 20,
    };

    // zoomMagnitude = 1.8181818181...
    const result = getFramePixelWidth({
      timelineConfig,
      normalizedZoom: 0.5,
    });

    expect(result).toBeCloseTo(3.63636, 3);
  });
});
