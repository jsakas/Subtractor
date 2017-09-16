import { Osc } from './Osc'

class Subtractor {
  constructor() {
    console.log('Subtractor constructed')
    const osc1 = new Osc()  // unused atm
    this.context = new AudioContext()

    this.octave = 5.1   // floats work for this which is cool
    this.polyphony = 3  // integer between 1 and 10
    this.detune = 2     // float, between 0 and 1 is a half-step

    this.handleKeys()
  }

  handleKeys() {
    window.addEventListener('keydown', (eDown) => {
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
        ['k', 12]
      ])
      if (octaveKeys.has(eDown.key)) {
        const note = octaveKeys.get(eDown.key) + (this.octave * 12)
        const oscillators = this.startPolyNote(note)

        // on keyup, stop the oscillators
        const stopOscillators = function(eUp) {
          if (eDown.key === eUp.key) {
            oscillators.forEach(osc => osc.stop())
            window.removeEventListener('keyup', stopOscillators)
          }
        }
        window.addEventListener('keyup', stopOscillators)
      }

      if (eDown.key == 'z' && this.octave > 0) {
        this.octave--;
      }
      if (eDown.key == 'x' && this.octave < 12) {
        this.octave++;
      }
    })
  }

  startPolyNote(note, key) {
    // how far below the root note to start adding detuned notes
    const noteOffset = Math.floor((this.polyphony - 1) / 2) * -1
    // number of intervals on the upper side of the root note
    const numIntervals = Math.floor(this.polyphony / 2)
    // width of interval based on the detune and polyphony measured in notes
    const interval = numIntervals == 0
      ? 0
      : this.detune / numIntervals
      // ternary gaurds interval being Infinity

    // create n=polyphony oscillators
    return Array(this.polyphony).fill()
      // notes starting at the offset are spread by interval
      .map((_,i) => note + (noteOffset + i) * interval)
      .map(this.getNoteFreq)
      .map(this.startFreqOscillator.bind(this))
  }
  
  startFreqOscillator(freq) {
    let oscillator = this.context.createOscillator()
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
