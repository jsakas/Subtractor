import { percentToPoint, pointToPercent, percentToDegree, degreeToPercent } from '../../src/utils/maths'

describe('percentToPoint', () => {
  test('returns 127 for 1 in range [-127, 127]', () => {
    expect(percentToPoint(-127, 127, 1)).toBe(127)
  })

  test('returns 0 for .5 in range [-127, 127]', () => {
    expect(percentToPoint(-127, 127, .5)).toBe(0)
  })

  test('returns -127 for 0 in range [-127, 127]', () => {
    expect(percentToPoint(-127, 127, 0)).toBe(-127)
  })

  test('returns 127 for 1 in range [0, 127]', () => {
    expect(percentToPoint(0, 127, 1)).toBe(127)
  })

  test('returns 63.5 for .5 in range [0, 127]', () => {
    expect(percentToPoint(0, 127, .5)).toBe(63.5)
  })

  test('returns 0 for 0 in range [0, 127]', () => {
    expect(percentToPoint(0, 127, 0)).toBe(0)
  })

  test('returns 10 for 0 in range [10, 110]', () => {
    expect(percentToPoint(10, 100, 0)).toBe(10)
  })

  test('returns 110 for 1 in range [10, 110]', () => {
    expect(percentToPoint(10, 110, 1)).toBe(110)
  })

  test('returns 60 for .5 in range [10, 110]', () => {
    expect(percentToPoint(10, 110, .5)).toBe(60)
  })
})

describe('pointToPercent', () => {
  test('returns 100 for 127 in range [-127, 127]', () => {
    expect(pointToPercent(-127, 127, 127)).toBe(1)
  })

  test('returns .5 for 0 in range [-127, 127]', () => {
    expect(pointToPercent(-127, 127, 0)).toBe(.5)
  })

  test('returns 0 for -127 in range [-127, 127]', () => {
    expect(pointToPercent(-127, -127, -127)).toBe(0)
  })

  test('returns 100 for 127 in range [0, 127]', () => {
    expect(pointToPercent(0, 127, 127)).toBe(1)
  })

  test('returns .5 for 63.5 in range [0, 127]', () => {
    expect(pointToPercent(0, 127, 63.5)).toBe(.5)
  })

  test('returns 0 for 0 in range [0, 127]', () => {
    expect(pointToPercent(0, 127, 0)).toBe(0)
  })

  test('returns 0 for 10 in range [10, 110]', () => {
    expect(pointToPercent(10, 100, 10)).toBe(0)
  })

  test('returns 1 for 110 in range [10, 110]', () => {
    expect(pointToPercent(10, 110, 110)).toBe(1)
  })

  test('returns .5 for 60 in range [10, 110]', () => {
    expect(pointToPercent(10, 110, 60)).toBe(.5)
  })
})

describe('percentToDegree', () => {
  test('returns 0 for 0 in range [0, 360]', () => {
    expect(percentToDegree(0, 360, 0)).toBe(0)
  })
  test('returns 1 for 360 in range [0, 360]', () => {
    expect(percentToDegree(0, 360, 360)).toBe(1)
  })
  test('returns .5 for 180 in range [0, 360]', () => {
    expect(percentToDegree(0, 360, 180)).toBe(.5)
  })
})

describe('degreeToPercent', () => {
  test('returns 0 for 0 in range [0, 360]', () => {
    expect(degreeToPercent(0, 360, 0)).toBe(0)
  })
  test('returns 360 for 1 in range [0, 360]', () => {
    expect(degreeToPercent(0, 360, 1)).toBe(360)
  })
  test('returns 180 for .5 in range [0, 360]', () => {
    expect(degreeToPercent(0, 360, .5)).toBe(180)
  })
})

