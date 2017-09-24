import * as Presets from './presets'

import { Osc } from './Osc'
import { Filter } from './Filter'
import { Oscilloscope } from './Oscilloscope'

import { keyboardKeys } from './utils/keyboard'


class Subtractor {
  constructor() {
    this.context    = new AudioContext()
    this.osc1       = new Osc(this.context, true)
    this.osc2       = new Osc(this.context, false)
    this.filter1    = new Filter(this.context)

    this.name = ''
    this.description = ''
    this.author = ''

    // octave value is used only for the qwerty controls, this value should not be used
    // when MIDI is integrated. 
    this.octave = 4

    // here polyphony refers to the number of oscs started for each key press,
    // detune refers to the spread of frequencies across the poly notes
    this.polyphony = 1
    this.detune = 0

    this.masterGain = this.context.createGain()
    this.filter1.filter.connect(this.masterGain)
    this.masterGain.connect(this.context.destination)

    // only start the oscilloscope once the DOM is ready
    document.addEventListener('DOMContentLoaded', () => this.startOscilloscope())
    
    this.handleKeys()
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
    let returnOscs = [this.osc1, this.osc2].map((osc) => {
      if (!osc.enabled) { 
        return []
      }
      return osc.start(note, this.polyphony, this.detune)
                .map(startedOsc => this.pipeline(startedOsc))
    })

    // osc.start returns an array of osc references, 
    return [].concat(...returnOscs)
  }

  // route an oscillator thru the pipeline of modifiers.
  // e.g. gains, filter, distortions etc.
  pipeline(osc) {
    osc.connect(this.filter1.filter)
    return osc
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

  setPresetFromSelect(preset) {
    this.loadPreset(Presets[preset])
  }

  // take a preset object and load it into the synth
  //
  loadPreset(preset) {
    // TODO - Need a way to safely `try` to set each thing
    //
    // globals
    this.name = preset.name
    this.author = preset.author
    this.description = preset.description
    this.masterGain.gain.value = preset.settings.master.gain
    this.polyphony = preset.settings.super.polyphony
    this.detune = preset.settings.super.detune

    // osc 1
    this.osc1.setEnabled(preset.settings.osc1.enabled)
    this.osc1.setWaveform(preset.settings.osc1.waveform)
    this.osc1.setOctave(preset.settings.osc1.octave)
    this.osc1.setSemi(preset.settings.osc1.semi)
    this.osc1.setDetune(preset.settings.osc1.cent)

    // osc 2
    this.osc2.setEnabled(preset.settings.osc2.enabled)
    this.osc2.setWaveform(preset.settings.osc2.waveform)
    this.osc2.setOctave(preset.settings.osc2.octave)
    this.osc2.setSemi(preset.settings.osc2.semi)
    this.osc2.setDetune(preset.settings.osc2.cent)

    // filter 1
    this.filter1.setType(preset.settings.filter1.type)
    this.filter1.setFreq(preset.settings.filter1.frequency)
    this.filter1.setQ(preset.settings.filter1.q)
    this.filter1.setGain(preset.settings.filter1.gain)
  }

  // take the current synth settings and return an object
  //
  getPreset() {
    return {
      "name": this.name,
      "author": this.author,
      "description": this.description,
      "settings" : {
        "master": {
          gain: this.masterGain.gain.value
        },
        "super": {
          "polyphony": this.polyphony,
          "detune": this.detune,
        },
        "osc1": {
          "enabled": this.osc1.getEnabled(),
          "waveform": this.osc1.getWaveform(),
          "octave": this.osc1.getOctave(),
          "semi": this.osc1.getSemi(),
          "cent": this.osc1.getDetune()
        },
        "osc2": {
          "enabled": this.osc1.getEnabled(),
          "waveform": this.osc1.getWaveform(),
          "octave": this.osc1.getOctave(),
          "semi": this.osc1.getSemi(),
          "cent": this.osc1.getDetune()
        },
        "filter1": {
          "type": this.filter1.getType(),
          "frequency": this.filter1.getFreq(),
          "q": this.filter1.getQ(),
          "gain": this.filter1.getGain()
        }
      }
    }
  }

  // take a preset object and save the file to your fs
  savePreset() {

  }
}

export { Subtractor }
window.Subtractor = Subtractor
