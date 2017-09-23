import { getNoteFreq } from './utils/maths'
import { intToWaveform, waveformToInt } from './utils/helpers'

class Osc {
    constructor(audioContext, enabled = true) {
      this.audioContext = audioContext
      this.enabled = enabled
      this.waveform = 'sine'
      this.octave = 0
      this.semi = 0
      this.detune = 0
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
      const shiftedNote = note + (this.octave * 12) + this.semi
      
      return Array(polyphony).fill()
        .map((_,i) => shiftedNote + (numIntervals - i) * interval)
        .reverse()
        .map(getNoteFreq)
        .map(this.startFreqOscillator.bind(this))
    }

    startFreqOscillator(freq) {
      const osc = this.audioContext.createOscillator()
      osc.type = this.waveform
      osc.frequency.value = freq
      osc.detune.value = this.detune
      osc.start()
      return osc
    }

    setEnabled(value) {
      this.enabled = value
    }

    setWaveform(value) {
      this.waveform = intToWaveform(value)
    }

    setOctave(value) {
      this.octave = value
    }

    setSemi(value) {
      this.semi = value
    }

    setDetune(value) {
      this.detune = value
    }

    getEnabled(value) {
      return this.enabled
    }

    getWaveform(value) {
      return waveformToInt(this.waveform)
    }

    getOctave(value) {
      return this.octave
    }

    getSemi(value) {
      return this.semi
    }

    getDetune(value) {
      return this.detune
    }
}

export { Osc }
