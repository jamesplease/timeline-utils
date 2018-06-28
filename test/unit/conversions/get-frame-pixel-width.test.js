import { getFramePixelWidth } from '../../../src/conversions';

describe('getFramePixelWidth', () => {
  it('is a function', () => {
    expect(typeof getFramePixelWidth).toBe('function');
  });

  // it('returns the expected value when frame count is smaller than viewport width', () => {
  //   const timelineConfig = {
  //     viewportWidth: 1000,
  //     totalFrameCount: 500,
  //     minFramePixelWidth: 20,
  //   };

  //   const result = getFramePixelWidth({ timelineConfig });
  //   expect(result).toEqual(2);
  // });

  // it('returns the expected value when frame count is larger than viewport width', () => {
  //   const timelineConfig = {
  //     viewportWidth: 1000,
  //     totalFrameCount: 5000,
  //     minFramePixelWidth: 20,
  //   };

  //   const result = getFramePixelWidth({ timelineConfig });
  //   expect(result).toEqual(0.2);
  // });
});
