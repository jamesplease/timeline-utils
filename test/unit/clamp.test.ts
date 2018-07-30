import clamp from '../../src/clamp';
// const clamp = require('../../src/clamp');

const tests = [
  // These arrays are in the order of:
  // [lowerBound, valueToClamp, upperBound, expectedResult]

  // These test values within and on the boundaries
  [0, 0, 10, 0],
  [0, 10, 10, 10],
  [0, 5, 10, 5],

  // These test values outside of the bounds
  [0, -5, 10, 0],
  [0, 15, 10, 10],

  // Test some negative boundaries as well
  [-5, 0, 5, 0],
  [-5, -10, 5, -5],
  [-5, 150, 5, 5],
];

describe('clamp', () => {
  it('is a function', () => {
    expect(typeof clamp).toBe('function');
  });

  it('works', () => {
    tests.forEach(test => {
      const result = clamp(test[0], test[1], test[2]);
      expect(result).toEqual(test[3]);
    });
  });
});
