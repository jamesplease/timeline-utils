import { getTimelineDeadSpaceInPixels } from '../../../src/timeline';

describe('getTimelineDeadSpaceInPixels', () => {
  it('is a function', () => {
    expect(typeof getTimelineDeadSpaceInPixels).toBe('function');
  });

  it('returns the expected value when the frames fit evenly into the viewport', () => {
    const timelineConstants = {
      viewportWidth: 1000,
      totalFrameCount: 500,
      minFramePixelWidth: 20,
    };

    const result = getTimelineDeadSpaceInPixels({
      timelineConstants,
      normalizedZoom: 0,
    });

    expect(result).toEqual(0);
  });

  it('returns the expected value when the frames do not fit evenly into the viewport', () => {
    const timelineConstants = {
      viewportWidth: 1000,
      totalFrameCount: 500,
      minFramePixelWidth: 20,
    };

    const result = getTimelineDeadSpaceInPixels({
      timelineConstants,
      normalizedZoom: 0.5,
    });

    expect(result).toBeCloseTo(0.8181818, 3);
  });
});
