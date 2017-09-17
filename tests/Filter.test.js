import 'web-audio-test-api'
import { Filter } from '../src/Filter'

test('Filter default type is lowpass', () => {
  const context = new AudioContext() 
  const filter = new Filter(context)
  expect(filter.getType()).toBe('lowpass')
})

test('Filter.setType() does not set invalid types', () => {
  const context = new AudioContext() 
  const filter = new Filter(context)

  function setType() {
    filter.setType(-1)
  }

  expect(setType).toThrowError(Error)
})
