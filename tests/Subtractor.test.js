import 'web-audio-test-api'
import { Subtractor } from '../src/Subtractor'


describe('Subtractor', () => {
  describe('qwerty keyboard', () => {

    test('key "a" triggers note 36 when octave is 4', () => {
      const subtractor = new Subtractor()
      subtractor.startPolyNote = jest.fn()
      subtractor.octave = 3
      window.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'a' }))
      expect(subtractor.startPolyNote.mock.calls[0]).toEqual([36])
    })

     test('key "k" triggers note 36 when octave is 4', () => {
      const subtractor = new Subtractor()
      subtractor.startPolyNote = jest.fn()
      subtractor.octave = 3
      window.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'k' }))
      expect(subtractor.startPolyNote.mock.calls[0]).toEqual([48])
    })

    test('key "a" triggers note 48 when octave is 4', () => {
      const subtractor = new Subtractor()
      subtractor.startPolyNote = jest.fn()
      subtractor.octave = 4
      window.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'a' }))
      expect(subtractor.startPolyNote.mock.calls[0]).toEqual([48])
    })

     test('key "k" triggers note 60 when octave is 4', () => {
      const subtractor = new Subtractor()
      subtractor.startPolyNote = jest.fn()
      subtractor.octave = 4
      window.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'k' }))
      expect(subtractor.startPolyNote.mock.calls[0]).toEqual([60])
    })
  })

  describe('loadPreset', () => {
    test('can set a preset that is missing values', () => {
      const mockPreset = { 'description': 'This is a preset with no values :(' }
      const subtractor = new Subtractor()

      subtractor.loadPreset(mockPreset)
    })
  })

  describe('loadPreset', () => {
    const mockPreset = {
      'name': 'Rando Syntho',
      'author': 'Jon Sakas',
      'description': 'A bunch of random non-default values',
      'master': { 
        'gain': 75,
        'polyphony': 3,
        'detune': 1
      },
      'osc1': {
        'enabled': 0,
        'waveform': 3,
        'octave': -2,
        'semi': 3,
        'detune': 27
      },
      'osc2': {
        'enabled': 1,
        'waveform': 2,
        'octave': -1,
        'semi': 5,
        'detune': 23
      },
      'filter1': {
        'type': 2,
        'freq': 10148,
        'q': 0.15,
        'gain': -3
      }
    }
    const subtractor = new Subtractor()
    subtractor.loadPreset(mockPreset)
    
    // meta
    test('sets name', () => {
      expect(subtractor.name).toBe('Rando Syntho')
    })

    test('sets author', () => {
      expect(subtractor.author).toBe('Jon Sakas')
    })

    test('sets description', () => {
      expect(subtractor.description).toBe('A bunch of random non-default values')
    })

    // master
    test('sets master gain', () => {
      expect(subtractor.gain).toBe(75)
    })

    // super
    test('sets polyphony', () => {
      expect(subtractor.polyphony).toBe(3)
    })

    test('sets detune', () => {
      expect(subtractor.detune).toBe(1)
    })

    // osc 1
    test('sets osc1->enabled', () => {
      expect(subtractor.osc1.enabled).toBe(0)
    })

    test('sets osc1->waveform', () => {
      expect(subtractor.osc1.waveform).toBe(3)
    })

    test('sets osc1->octave', () => {
      expect(subtractor.osc1.octave).toBe(-2)
    })

    test('sets osc1->semi', () => {
      expect(subtractor.osc1.semi).toBe(3)
    })

    test('sets osc1->detune', () => {
      expect(subtractor.osc1.detune).toBe(27)
    })

    // osc 2
    test('sets osc2->enabled', () => {
      expect(subtractor.osc2.enabled).toBe(1)
    })

    test('sets osc2->waveform', () => {
      expect(subtractor.osc2.waveform).toBe(2)
    })

    test('sets osc2->octave', () => {
      expect(subtractor.osc2.octave).toBe(-1)
    })

    test('sets osc2->semi', () => {
      expect(subtractor.osc2.semi).toBe(5)
    })

    test('sets osc2->detune', () => {
      expect(subtractor.osc2.detune).toBe(23)
    })

    // filter
    test('sets filter1->type', () => {
      expect(subtractor.filter1.filter.type).toBe('highpass')
    })

    test('sets filter1->frequency', () => {
      expect(subtractor.filter1.filter.frequency.value).toBe(10148)
    })

    test('sets filter1->Q', () => {
      expect(subtractor.filter1.filter.Q.value).toBe(0.15)
    })

    test('sets filter1->gain', () => {
      expect(subtractor.filter1.filter.gain.value).toBe(-3)
    })
  })
})
