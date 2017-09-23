import { keyboardKeys } from '../../src/utils/keyboard'

describe('keyboard', () => {
  test('returns 0 for a', () => {
    expect(keyboardKeys.get('a')).toBe(0)
  })
})
