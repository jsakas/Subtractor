import { getFrequencySpread, getNoteFreq } from './utils/maths'
import { intToWaveform, waveformToInt } from './utils/helpers'
import { Observable } from './Observe'

class Osc extends Observable {
    constructor(audioContext, options) {
      super()
      console.debug('Constructing new Oscillator with options', options)
      this.audioContext = audioContext
      this._enabled = options.enabled || false
      this._waveform = intToWaveform(options.waveform) || 'sine'
      this._octave = options.octave || 0
      this._semi = options.semi || 0
      this._detune = options.detune || 0
      this._oscs = [];
    }

    start(note, polyphony = 1, detune = 0) {
      const shiftedNote = note + (this._octave * 12) + this._semi
      const baseFreq = getNoteFreq(shiftedNote)
      const freqs = getFrequencySpread(baseFreq, polyphony, detune * 10);

      this._oscs = freqs.map(this.startFreqOscillator.bind(this))
      return this._oscs;
    }

    move(note, polyphony = 1, detune = 0, time = 0) {
      const shiftedNote = note + (this._octave * 12) + this._semi
      const baseFreq = getNoteFreq(shiftedNote)
      const freqs = getFrequencySpread(baseFreq, polyphony, detune * 10);

      this._oscs.forEach((osc, i) => {
        osc.frequency.linearRampToValueAtTime(
          freqs[i],
          time
        )
      })
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

    get oscs() {
      return this._oscs
    }
}

export { Osc }
