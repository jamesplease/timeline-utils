import { getMaxZoomMagnitude } from '../../../src/scroll-and-zoom';

describe('getMaxZoomMagnitude', () => {
  it('is a function', () => {
    expect(typeof getMaxZoomMagnitude).toBe('function');
  });

  it('returns the expected value when frame count is smaller than viewport width', () => {
    const timelineConfig = {
      viewportWidth: 1000,
      totalFrameCount: 500,
      minFramePixelWidth: 20,
    };

    const result = getMaxZoomMagnitude({ timelineConfig });
    expect(result).toEqual(10);
  });

  it('returns the expected value when frame count is higher than viewport width', () => {
    const timelineConfig = {
      viewportWidth: 1000,
      totalFrameCount: 5000,
      minFramePixelWidth: 20,
    };

    const result = getMaxZoomMagnitude({ timelineConfig });
    expect(result).toEqual(100);
  });
});
