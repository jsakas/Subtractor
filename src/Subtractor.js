import { Filter } from './Filter'
import { keyboardKeys } from './utils/keyboard'
import { Oscilloscope } from './Oscilloscope'

class Subtractor {
  constructor() {
    console.log('Subtractor constructed')

    const presets = {
      'full': [
        4.5,
        'sawtooth', 5, .2,
        'lowpass', 1000, 5, 0,
        'triangle', 4,
      ],
      'harmonic': [
        5.1,
        'sawtooth', 3, 2,
        'lowpass', 1000, 5, 0,
        'triangle', 1,
      ],
      'simple': [
        5,
        'sawtooth', 1, 0,
        'lowpass', 1200, 5, 0,
        'sine', 0,
      ],
    }
    this.selectedPreset = presets.full

    this.octave    = this.selectedPreset[0]
    
    this.waveform  = this.selectedPreset[1]
    this.polyphony = this.selectedPreset[2]
    this.detune    = this.selectedPreset[3]

    this.context = new AudioContext()
    this.masterGain = this.context.createGain()

    this.filter1 = new Filter(this.context)

    this.filter1.filter.type = this.selectedPreset[4]
    this.filter1.filter.frequency.value = this.selectedPreset[5]
    this.filter1.filter.Q.value = this.selectedPreset[6]
    this.filter1.filter.gain.value = this.selectedPreset[7]

    this.filter1.filter.connect(this.masterGain)
    this.masterGain.connect(this.context.destination)

    // only start the oscilloscope once the DOM is ready
    document.addEventListener('DOMContentLoaded', () => this.startOscilloscope())
    
    this.handleKeys()
  }

  // route an oscillator thru the pipeline of modifiers.
  // e.g. gains, filter, distortions etc.
  pipeline(osc) {
    osc.connect(this.filter1.filter)
  }
  
  intToWaveform(i) {
    return ['sine','square','sawtooth','triangle'][i - 1] || 'sine'
  }

  waveformToInt(w) {
    return ['sine','square','sawtooth','triangle'].indexOf(w) + 1
  }

  setOctave(value) {
    this.octave = value
  }

  setWaveform(value) {
    this.waveform = this.intToWaveform(parseInt(value))
  }

  setPolyphony(value) {
    this.polyphony = value
  }

  setDetune(value) {
    this.detune = value / 100
  }

  setMasterGain(value) {
    this.masterGain.gain.value = value * .01
  }

  handleKeys() {
    let keyWasPressed = []
    window.addEventListener('keydown', (eKeyDown) => {
      if (keyboardKeys.has(eKeyDown.key) && !keyWasPressed[eKeyDown.key]) {
        const note = keyboardKeys.get(eKeyDown.key) + (this.octave * 12)
        const polyNoteOscillators = this.startPolyNote(note)

        // on note-keyup, stop the oscillators
        const stopThisPolyNote = function(eNoteKeyUp) {
          if (eKeyDown.key === eNoteKeyUp.key) {
            polyNoteOscillators.forEach(osc => osc.stop())
            window.removeEventListener('keyup', stopThisPolyNote)
          }
        }
        window.addEventListener('keyup', stopThisPolyNote)
      }

      if (eKeyDown.key == 'z' && this.octave > 0) {
        this.octave--
      }
      if (eKeyDown.key == 'x' && this.octave < 12) {
        this.octave++
      }

      keyWasPressed[eKeyDown.key] = true
    })
    window.addEventListener('keyup', (eKeyUp) => {
      keyWasPressed[eKeyUp.key] = false
    })
  }

  startOscilloscope() {
    try {
      const canvas = document.getElementById('oscilloscope')
      const oscilloscope = new Oscilloscope(
        this.context, 
        canvas
      )
      this.masterGain.connect(oscilloscope.analyzer)
      oscilloscope.start()
    } catch (e) {
      console.log('Failed to start Oscilloscope')
    }
  }

  startPolyNote(note) {
    // number of intervals on the upper side of the root note
    const numIntervals = Math.floor(this.polyphony / 2)
    // width of interval based on the detune and polyphony measured in notes
    const interval = numIntervals == 0
      ? 0
      : this.detune / numIntervals
      // ternary gaurds interval being Infinity

    // create n=polyphony oscillators
    return Array(this.polyphony).fill()
      .map((_,i) => note + (numIntervals - i) * interval)
      .reverse()
      .map(this.getNoteFreq)
      .map(this.startFreqOscillator.bind(this))
  }
  
  startFreqOscillator(freq) {
    const oscillator = this.context.createOscillator()
    oscillator.type = this.waveform
    oscillator.frequency.value = freq
    this.pipeline(oscillator)
    oscillator.start()
    return oscillator
  }

  getNoteFreq(note) {
    // http://subsynth.sourceforge.net/midinote2freq.html
    const tune = 440
    return (tune / 32) * Math.pow(2, ((note - 9) / 12))
  }
}

export { Subtractor }
window.Subtractor = Subtractor
