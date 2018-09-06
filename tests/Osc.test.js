import 'web-audio-test-api'
import * as maths from '../src/utils/maths'
import { Osc } from '../src/Osc'


describe('Osc', () => {
  describe('start', () => {
    const audioContext = new AudioContext()

    beforeEach(() => {
      jest.spyOn(maths, 'getNoteFreq').mockImplementation(() => 440)
    })

    afterEach(() => {
      maths.getNoteFreq.mockReset()
    })

    test('calls maths.getNoteFreq with 43 when note is 36, octave is 0, and semi is 7', () => {
      const osc = new Osc(audioContext)
      osc.octave = 0
      osc.semi = 7
      osc.start(36)
      expect(maths.getNoteFreq.mock.calls[0][0]).toEqual(43)
    })

    test('calls maths.getNoteFreq with 55 when note is 36, octave is 1, and semi is 7', () => {
      const osc = new Osc(audioContext)
      osc.octave = 1
      osc.semi = 7
      osc.start(36)
      expect(maths.getNoteFreq.mock.calls[0][0]).toEqual(55)
    })

    test('calls maths.getNoteFreq with 60 when note is 36, octave is 2, and semi is 0', () => {
      const osc = new Osc(audioContext)
      osc.octave = 2
      osc.start(36)
      expect(maths.getNoteFreq.mock.calls[0][0]).toEqual(60)
    })

    test('calls maths.getNoteFreq with 0 when note is 36, octave is -3, and semi is 0', () => {
      const osc = new Osc(audioContext)
      osc.octave = -3
      osc.start(36)
      expect(maths.getNoteFreq.mock.calls[0][0]).toEqual(0)
    })
  })
})
