import linearScale, { LinearScaleOptions } from '../../src/linear-scale';

interface TestObject extends LinearScaleOptions {
  result: number;
}

const tests: TestObject[] = [
  {
    domain: [0, 1],
    range: [0, 1],
    value: 0.5,
    result: 0.5,
  },
  {
    domain: [0, 1],
    range: [0, 100],
    value: 0.5,
    result: 50,
  },
  {
    domain: [0, 1],
    range: [100, 200],
    value: 0,
    result: 100,
  },
  {
    domain: [0, 1],
    range: [100, 200],
    value: 1,
    result: 200,
  },
  {
    domain: [0, 1],
    range: [0, 0.5],
    value: 0.5,
    result: 0.25,
  },
];

describe('linearScale', () => {
  it('is a function', () => {
    expect(typeof linearScale).toBe('function');
  });

  it('works', () => {
    tests.forEach(test => {
      const result = linearScale({
        domain: test.domain,
        range: test.range,
        value: test.value,
      });

      expect(result).toEqual(test.result);
    });
  });
});
