import 'web-audio-test-api';
import Envelope from './Envelope';


describe('Envelope', () => {
  describe('setters & getters', () => {

    const audioContext = new AudioContext();
    const gainNode = audioContext.createGain();
    const envelope = new Envelope(audioContext, gainNode.gain);

    test('attack', () => {
      envelope.attack = 13;
      expect(envelope.attack).toEqual(13);
    });

    test('decay', () => {
      envelope.attack = 15;
      expect(envelope.attack).toEqual(15);
    });

    test('sustain', () => {
      envelope.attack = 17;
      expect(envelope.attack).toEqual(17);
    });

    test('release', () => {
      envelope.attack = 19;
      expect(envelope.attack).toEqual(19);
    });

    test('amount', () => {
      envelope.amount = 127;
      expect(envelope.amount).toEqual(127);
    });

    test('minValue', () => {
      envelope.minValue = -3;
      expect(envelope.minValue).toEqual(-3);
    });

    test('maxValue', () => {
      envelope.maxValue = 3;
      expect(envelope.maxValue).toEqual(3);
    });
  });
});
