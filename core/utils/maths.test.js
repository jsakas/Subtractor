import { 
  getFrequencySpread,
  percentToPoint, 
  pointToPercent, 
  getDetuneSpread,
  shiftNote
} from '../../src/utils/maths';

describe('shiftNote', () => {
  test('shifts notes by octave and semi', () => {
    expect(shiftNote(30)).toEqual(30);
    expect(shiftNote(30, 1)).toEqual(42);
    expect(shiftNote(30, -1)).toEqual(18);
    expect(shiftNote(30, 1, -5)).toEqual(37);
    expect(shiftNote(30, -1, 5)).toEqual(23);
  });
});

describe('getDetuneSpread', () => {
  test('returns detune by default', () => {
    expect(getDetuneSpread(1, 100)).toEqual([100]);
  });

  test('returns a proper spread for 2 voices', () => {
    expect(getDetuneSpread(2, 100)).toEqual([100, -100]);
  });

  test('returns a proper spread for 3 voices', () => {
    expect(getDetuneSpread(3, 100)).toEqual([100, 0, -100]);
  });
});

describe('getFrequencySpread', () => {
  test('returns frequency by default', () => {
    expect(getFrequencySpread(1000)).toEqual([1000]);
  });

  test('returns a proper spread for poly 3, detune 0', () => {
    const a = getFrequencySpread(1000, 3);
    expect(a).toEqual([1000, 1000, 1000]);
  });

  test('returns a proper spread for poly 3', () => {
    const a = getFrequencySpread(1000, 3, 10);
    expect(a[1]).toEqual(1000);
    expect(a[0] < a[1]).toBe(true);
    expect(a[1] < a[2]).toBe(true);
  });
});

describe('percentToPoint', () => {
  test('returns 127 for 1 in range [-127, 127]', () => {
    expect(percentToPoint(-127, 127, 1)).toBe(127);
  });

  test('returns 0 for .5 in range [-127, 127]', () => {
    expect(percentToPoint(-127, 127, .5)).toBe(0);
  });

  test('returns -127 for 0 in range [-127, 127]', () => {
    expect(percentToPoint(-127, 127, 0)).toBe(-127);
  });

  test('returns 127 for 1 in range [0, 127]', () => {
    expect(percentToPoint(0, 127, 1)).toBe(127);
  });

  test('returns 63.5 for .5 in range [0, 127]', () => {
    expect(percentToPoint(0, 127, .5)).toBe(63.5);
  });

  test('returns 0 for 0 in range [0, 127]', () => {
    expect(percentToPoint(0, 127, 0)).toBe(0);
  });

  test('returns 10 for 0 in range [10, 110]', () => {
    expect(percentToPoint(10, 100, 0)).toBe(10);
  });

  test('returns 110 for 1 in range [10, 110]', () => {
    expect(percentToPoint(10, 110, 1)).toBe(110);
  });

  test('returns 60 for .5 in range [10, 110]', () => {
    expect(percentToPoint(10, 110, .5)).toBe(60);
  });
});

describe('pointToPercent', () => {
  test('returns 100 for 127 in range [-127, 127]', () => {
    expect(pointToPercent(-127, 127, 127)).toBe(1);
  });

  test('returns .5 for 0 in range [-127, 127]', () => {
    expect(pointToPercent(-127, 127, 0)).toBe(.5);
  });

  test('returns 0 for -127 in range [-127, 127]', () => {
    expect(pointToPercent(-127, -127, -127)).toBe(0);
  });

  test('returns 100 for 127 in range [0, 127]', () => {
    expect(pointToPercent(0, 127, 127)).toBe(1);
  });

  test('returns .5 for 63.5 in range [0, 127]', () => {
    expect(pointToPercent(0, 127, 63.5)).toBe(.5);
  });

  test('returns 0 for 0 in range [0, 127]', () => {
    expect(pointToPercent(0, 127, 0)).toBe(0);
  });

  test('returns 0 for 10 in range [10, 110]', () => {
    expect(pointToPercent(10, 100, 10)).toBe(0);
  });

  test('returns 1 for 110 in range [10, 110]', () => {
    expect(pointToPercent(10, 110, 110)).toBe(1);
  });

  test('returns .5 for 60 in range [10, 110]', () => {
    expect(pointToPercent(10, 110, 60)).toBe(.5);
  });
});

