jest.mock('../src//utils/maths')

import 'web-audio-test-api'
import { getNoteFreq } from '../src/utils/maths'
import { Osc } from '../src/Osc'


describe('Osc', () => {
  describe('start', () => {
    const audioContext = new AudioContext()

    beforeEach(() => {
      getNoteFreq.mockReset()
      getNoteFreq.mockImplementation(() => 440)
    })

    test('calls getNoteFreq with 43 when note is 36, octave is 10, and semi is 7', () => {
      const osc = new Osc(audioContext)
      osc.setOctave(0)
      osc.setSemi(7)
      osc.start(36)
      expect(getNoteFreq.mock.calls[0][0]).toEqual(43)
    })

    test('calls getNoteFreq with 55 when note is 36, octave is 10, and semi is 7', () => {
      const osc = new Osc(audioContext)
      osc.setOctave(1)
      osc.setSemi(7)
      osc.start(36)
      expect(getNoteFreq.mock.calls[0][0]).toEqual(55)
    })

    test('calls getNoteFreq with 60 when note is 36, octave is 2, and semi is 0', () => {
      const osc = new Osc(audioContext)
      osc.setOctave(2)
      osc.start(36)
      expect(getNoteFreq.mock.calls[0][0]).toEqual(60)
    })

    test('calls getNoteFreq with 0 when note is 36, octave is -3, and semi is 0', () => {
      const osc = new Osc(audioContext)
      osc.setOctave(-3)
      osc.start(36)
      expect(getNoteFreq.mock.calls[0][0]).toEqual(0)
    })
  })
})
