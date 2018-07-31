import { getMaxZoomMagnitude } from '../../../src/scroll-and-zoom';

describe('getMaxZoomMagnitude', () => {
  it('is a function', () => {
    expect(typeof getMaxZoomMagnitude).toBe('function');
  });

  it('works', () => {
    const result = getMaxZoomMagnitude({
      timelineConstants: {
        viewportWidth: 1000,
        totalFrameCount: 1000,
        minFramePixelWidth: 10,
      },
    });

    expect(result).toEqual(10);
  });
});
