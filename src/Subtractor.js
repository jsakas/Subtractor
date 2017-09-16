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


    this.octave = 6
    this.polyphony = 3 // between 1 and 10
    this.detune = .5 // between 0 and 1

    window.addEventListener('keydown', (e) => {
      if (octaveKeys.has(e.key)) {
        const note = octaveKeys.get(e.key) + (this.octave * 12)
        
        this.playNote(note, e.key)
      }

      if (e.key == 'z' && this.octave > 0) {
        this.octave--;
      }
      if (e.key == 'x' && this.octave < 12) {
        this.octave++;
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

  playNote(note, key) {
    const noteOffset = Math.floor((this.polyphony - 1) / 2) * -1
    const numIntervals = Math.floor(this.polyphony / 2)
    let interval = this.detune / numIntervals

    if (interval == Infinity) {
      interval = 0
    }

    let notes = []
    for (var i = 0; i < this.polyphony; i++) {
       notes.push(note + (i + noteOffset) * interval)
    }
    let freqs = notes.map(this.getNoteFreq)
    let oscs = freqs.map(this.playFreq.bind(this))

    const fn = function(e) {
      if (e.key === key) {
        oscs.forEach(osc => osc.stop())
        window.removeEventListener('keyup', fn)
      }
    }

    window.addEventListener('keyup', fn)
  }

  playFreq(freq) {
    var oscillator = this.context.createOscillator()
    oscillator.type = 'sawtooth';
    oscillator.frequency.value = freq;
    oscillator.connect(this.context.destination);
    oscillator.start();
    return oscillator
  }

  getNoteFreq(note) {
    // http://subsynth.sourceforge.net/midinote2freq.html
    const tune = 440
    return (tune / 32) * Math.pow(2, ((note - 9) / 12))
  }
}

window.Subtractor = Subtractor
