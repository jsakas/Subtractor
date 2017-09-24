import 'web-audio-test-api'
import { Subtractor } from '../src/Subtractor'


describe('Subtractor', () => {
  describe('qwerty keyboard', () => {

    test('key "a" triggers note 39 when octave is 4', () => {
      const subtractor = new Subtractor()
      subtractor.startPolyNote = jest.fn()
      subtractor.setOctave(3)
      window.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'a' }))
      expect(subtractor.startPolyNote.mock.calls[0]).toEqual([36])
    })

     test('key "k" triggers note 39 when octave is 4', () => {
      const subtractor = new Subtractor()
      subtractor.startPolyNote = jest.fn()
      subtractor.setOctave(3)
      window.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'k' }))
      expect(subtractor.startPolyNote.mock.calls[0]).toEqual([48])
    })

    test('key "a" triggers note 48 when octave is 4', () => {
      const subtractor = new Subtractor()
      subtractor.startPolyNote = jest.fn()
      subtractor.setOctave(4)
      window.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'a' }))
      expect(subtractor.startPolyNote.mock.calls[0]).toEqual([48])
    })

     test('key "k" triggers note 60 when octave is 4', () => {
      const subtractor = new Subtractor()
      subtractor.startPolyNote = jest.fn()
      subtractor.setOctave(4)
      window.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'k' }))
      expect(subtractor.startPolyNote.mock.calls[0]).toEqual([60])
    })
  })
})
