import { getNoteFreq } from './utils/maths'
import { intToWaveform } from './utils/helpers'

class Osc {
    constructor(audioContext, enabled = true) {
      this.audioContext = audioContext
      this.enabled = enabled
      this.waveform = 'sine'
      this.octave = 0
      this.semi = 0
      this.detune = 0
      this.freq = 0
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
      this.freq = getNoteFreq(shiftedNote)
      
      return Array(polyphony).fill()
        .map((_,i) => note + (numIntervals - i) * interval)
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
}

export { Osc }
