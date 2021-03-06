import 'web-audio-test-api';
import Subtractor from './Subtractor';


describe('Subtractor', () => {

  describe('loadPreset', () => {
    test('can set a preset that is missing values', () => {
      const mockPreset = { 'description': 'This is a preset with no values :(' };
      const subtractor = new Subtractor();

      subtractor.loadPreset(mockPreset);
    });
  });

  describe('loadPreset', () => {
    const mockPreset = {
      'name': 'Rando Syntho',
      'author': 'Jon Sakas',
      'description': 'A bunch of random non-default values',
      'master': { 
        'gain': 75,
        'polyphony': 3,
        'detune': 1,
        'voices': 3,
        'glide': 42,
      },
      'osc1': {
        'enabled': 0,
        'waveform': 3,
        'octave': -2,
        'semi': 3,
        'detune': 27,
        'voices': 2,
      },
      'osc2': {
        'enabled': 1,
        'waveform': 2,
        'octave': -1,
        'semi': 5,
        'detune': 23,
        'voices': 3,
      },
      'filter1': {
        'type': 2,
        'freq': 127,
        'q': 0.15,
        'gain': -3
      }
    };
    const subtractor = new Subtractor();
    subtractor.loadPreset(mockPreset);
    
    // meta
    test('sets name', () => {
      expect(subtractor.name).toBe('Rando Syntho');
    });

    test('sets author', () => {
      expect(subtractor.author).toBe('Jon Sakas');
    });

    test('sets description', () => {
      expect(subtractor.description).toBe('A bunch of random non-default values');
    });

    // master
    test('sets master gain', () => {
      expect(subtractor.gain).toBe(75);
    });

    // super
    test('sets master voices', () => {
      expect(subtractor.voices).toBe(3);
    });

    test('sets master glide', () => {
      expect(subtractor.glide).toBe(42);
    });

    // osc 1
    test('sets osc1->enabled', () => {
      expect(subtractor.osc1.enabled).toBe(0);
    });

    test('sets osc1->waveform', () => {
      expect(subtractor.osc1.waveform).toBe(3);
    });

    test('sets osc1->octave', () => {
      expect(subtractor.osc1.octave).toBe(-2);
    });

    test('sets osc1->semi', () => {
      expect(subtractor.osc1.semi).toBe(3);
    });

    test('sets osc1->detune', () => {
      expect(subtractor.osc1.detune).toBe(27);
    });

    test('sets osc1->voices', () => {
      expect(subtractor.osc1.voices).toBe(2);
    });

    // osc 2
    test('sets osc2->enabled', () => {
      expect(subtractor.osc2.enabled).toBe(1);
    });

    test('sets osc2->waveform', () => {
      expect(subtractor.osc2.waveform).toBe(2);
    });

    test('sets osc2->octave', () => {
      expect(subtractor.osc2.octave).toBe(-1);
    });

    test('sets osc2->semi', () => {
      expect(subtractor.osc2.semi).toBe(5);
    });

    test('sets osc2->detune', () => {
      expect(subtractor.osc2.detune).toBe(23);
    });

    test('sets osc2->voices', () => {
      expect(subtractor.osc2.voices).toBe(3);
    });

    // filter
    test('sets filter1->type', () => {
      expect(subtractor.filter1.filter.type).toBe('highpass');
    });

    test('sets filter1->frequency', () => {
      expect(subtractor.filter1.filter.frequency.value).toBe(Math.pow(127, 2));
    });

    test('sets filter1->Q', () => {
      expect(subtractor.filter1.filter.Q.value).toBe(0.015);
    });

    test('sets filter1->gain', () => {
      expect(subtractor.filter1.filter.gain.value).toBe(-3);
    });
  });
});
