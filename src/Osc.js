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

    start(note) {
      // shift the base note based on oscillator octave and semitone settings
      const shiftedNote = note + (this.octave * 12) + this.semi
      const osc = this.audioContext.createOscillator()
      this.freq = getNoteFreq(shiftedNote)
      osc.type = this.waveform
      osc.frequency.value = this.freq
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
