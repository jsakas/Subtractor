import { getNoteFreq } from './utils/maths'
import { intToWaveform, waveformToInt } from './utils/helpers'
import { Observable } from './Observe'

class Osc extends Observable {
    constructor(audioContext, enabled = true) {
      super()
      this.audioContext = audioContext
      this._enabled = enabled
      this._waveform = 'sine'
      this._octave = 0
      this._semi = 0
      this._detune = 0
    }

    // returns an array of oscillator nodes depending on the polyphony value
    start(note, polyphony = 1, detune = 0) {
      // number of intervals on the upper side of the root note
      const numIntervals = Math.floor(polyphony / 2)
      // width of interval based on the detune and polyphony measured in notes
      const interval = numIntervals == 0
        ? 0
        : detune / numIntervals
        // ternary gaurds interval being Infinity

      // shift the base note based on oscillator octave and semitone settings
      const shiftedNote = note + (this._octave * 12) + this._semi
      
      return Array(polyphony).fill()
        .map((_,i) => shiftedNote + (numIntervals - i) * interval)
        .reverse()
        .map(getNoteFreq)
        .map(this.startFreqOscillator.bind(this))
    }

    startFreqOscillator(f) {
      const osc = this.audioContext.createOscillator()
      osc.type = this._waveform
      osc.frequency.value = f
      osc.detune.value = this._detune
      return osc
    }

    set enabled(value) {
      this._enabled = value
      this.notifyObservers()
    }

    get enabled() {
      return this._enabled
    }

    set waveform(value) {
      if (typeof value == 'number') {
        this._waveform = intToWaveform(value)
      } else {
        this._waveform = value
      }
      
      this.notifyObservers()
    }

    get waveform() {
      return waveformToInt(this._waveform)
    }

    get frWaveform() {
      return this._waveform
    }

    set octave(value) {
      this._octave = value
      this.notifyObservers()
    }

    get octave() {
      return this._octave
    }

    set semi(value) {
      this._semi = value
      this.notifyObservers()
    }

    get semi() {
      return this._semi
    }

    set detune(value) {
      this._detune = value
      this.notifyObservers()
    }

    get detune() {
      return this._detune
    }
}

export { Osc }
