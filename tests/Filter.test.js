import 'web-audio-test-api'
import { Filter } from '../src/Filter'

test('Filter default type is lowpass', () => {
  const context = new AudioContext() 
  const filter = new Filter(context)
  expect(filter.type).toBe(1)
})

test('Filter type does not allow invalid types', () => {
  const context = new AudioContext() 
  const filter = new Filter(context)

  filter.type = -1
  expect(filter.type).toBe(1)
})
