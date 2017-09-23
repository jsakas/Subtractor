import { Osc } from './Osc'
import { Filter } from './Filter'
import { Oscilloscope } from './Oscilloscope'

import { getNoteFreq } from './utils/maths'
import { keyboardKeys } from './utils/keyboard'


class Subtractor {
  constructor() {
    this.context    = new AudioContext()
    this.osc1       = new Osc(this.context, true)
    this.osc2       = new Osc(this.context, false)
    this.filter1    = new Filter(this.context)

    // octave value is used only for the qwerty controls, this value should not be used
    // when MIDI is integrated. 
    this.octave = 4

    this.masterGain = this.context.createGain()
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
    return osc
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
        const note = keyboardKeys.get(eKeyDown.key)
        const polyNoteOscillators = this.startPolyNote(note + this.octave * 12)

        // on note-keyup, stop the oscillators
        const stopThisPolyNote = (eNoteKeyUp) => {
          if (eKeyDown.key === eNoteKeyUp.key) {
            polyNoteOscillators.forEach((osc) => {
              try { 
                osc.stop() 
              } catch (e) {
                // osc was never started
              }
            })
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

  startPolyNote(note) {
    // number of intervals on the upper side of the root note
    const numIntervals = Math.floor(this.polyphony / 2)
    // width of interval based on the detune and polyphony measured in notes
    const interval = numIntervals == 0
      ? 0
      : this.detune / numIntervals
      // ternary gaurds interval being Infinity

    return [this.osc1, this.osc2].map((osc) => {
      if (!osc.enabled) { 
        return
      }
      return this.pipeline(osc.start(note))
    })

    // create n=polyphony oscillators
    // return Array(this.polyphony).fill()
    //   .map((_,i) => note + (numIntervals - i) * interval)
    //   .reverse()
    //   .map(this.getNoteFreq)
    //   .map(this.startFreqOscillator.bind(this))
  }
  
  startFreqOscillator(freq) {
    const oscillator = this.context.createOscillator()
    oscillator.type = this.waveform
    oscillator.frequency.value = freq
    this.pipeline(oscillator)
    oscillator.start()
    return oscillator
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
}

export { Subtractor }
window.Subtractor = Subtractor
