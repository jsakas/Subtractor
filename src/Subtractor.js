import { Osc } from './Osc'
import key_to_freq from './utils/key_to_freq'

class Subtractor {
  constructor() {
    console.log('Subtractor constructed')
    const osc1 = new Osc()
    this.context = new AudioContext()

    this.oscillator = this.context.createOscillator();

    const octaveKeys = new Map([
      ['a', 0],
      ['w', 1],
      ['s', 2],
      ['e', 3],
      ['d', 4],
      ['f', 5],
      ['t', 6],
      ['g', 7],
      ['y', 8],
      ['h', 9],
      ['u', 10],
      ['j', 11],
      ['k', 0]
    ])


    let octave = 6

    window.addEventListener('keydown', (e) => {
      if (octaveKeys.has(e.key)) {
        const note = octaveKeys.get(e.key) + (octave * 12)
        const freq = this.getNoteFreq(note)
        this.playFreq(freq, e.key)
      }

      if (e.key == 'z' && octave > 0) {
        octave--;
      }
      if (e.key == 'x' && octave < 12) {
        octave++;
      }
    })

    window.addEventListener('keyup', (e) => {
      try {
        this.oscillator.stop();
      } catch(e) {
        // do nothing
      }
    })

  }

  playFreq(freq, key) {
    var oscillator = this.context.createOscillator()
    oscillator.type = 'sawtooth';
    oscillator.frequency.value = freq;
    oscillator.connect(this.context.destination);
    oscillator.start();

    const fn = function(e) {
      if (e.key === key) {
        oscillator.stop();
        window.removeEventListener('keyup', fn)
      }
    }

    window.addEventListener('keyup', fn)
  }

  getNoteFreq(note) {
    // http://subsynth.sourceforge.net/midinote2freq.html
    const tune = 440
    return (tune / 32) * Math.pow(2, ((note - 9) / 12))
  }
}

window.Subtractor = Subtractor
