import { getFramePixelWidthAtMinZoom } from '../../../src/conversions';

describe('getFramePixelWidthAtMinZoom', () => {
  it('is a function', () => {
    expect(typeof getFramePixelWidthAtMinZoom).toBe('function');
  });

  it('works when 1:1', () => {
    const result = getFramePixelWidthAtMinZoom({
      timelineConstants: {
        viewportWidth: 1000,
        totalFrameCount: 1000,
      },
    });

    expect(result).toEqual(1);
  });

  it('works when 2:1', () => {
    const result = getFramePixelWidthAtMinZoom({
      timelineConstants: {
        viewportWidth: 2000,
        totalFrameCount: 1000,
      },
    });

    expect(result).toEqual(2);
  });

  it('works when 1:2', () => {
    const result = getFramePixelWidthAtMinZoom({
      timelineConstants: {
        viewportWidth: 1000,
        totalFrameCount: 2000,
      },
    });

    expect(result).toEqual(0.5);
  });
});
