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

  set gain(value) {
    this.masterGain.gain.value = value * .01
  }

  get gain() {
    return this.masterGain.gain.value * 100
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
  // in order to make this safe we define maps of how to set each preset 
  // from the supplied preset object.
  //
  // there is a map of class attributes, e.g. `this.name`,
  // and a map of functions to call, e.g. `this.osc1.setEnabled()`
  //
  // this is done to provide a safe mapping, where we can loop through
  // and attempt to set each value without failing the entire operation
  // with a global try block. If a preset value is missing, the outputs 
  // a warning message.
  //
  loadPreset(preset) {
    const presetValueMap = [
      ['name', 'preset.name'],
      ['author', 'preset.author'],
      ['description', 'preset.description'],
      ['gain', 'preset.settings.master.gain'],
      ['polyphony', 'preset.settings.master.polyphony'],
      ['detune', 'preset.settings.master.detune'],
    ]
    const presetFunctionMap = [
      [this.osc1.setEnabled, this.osc1, 'preset.settings.osc1.enabled'],
      [this.osc1.setWaveform, this.osc1, 'preset.settings.osc1.waveform'],
      [this.osc1.setOctave, this.osc1, 'preset.settings.osc1.octave'],
      [this.osc1.setSemi, this.osc1, 'preset.settings.osc1.semi'],
      [this.osc1.setDetune, this.osc1, 'preset.settings.osc1.cent'],
      [this.osc2.setEnabled, this.osc2, 'preset.settings.osc2.enabled'],
      [this.osc2.setWaveform, this.osc2, 'preset.settings.osc2.waveform'],
      [this.osc2.setOctave, this.osc2, 'preset.settings.osc2.octave'],
      [this.osc2.setSemi, this.osc2, 'preset.settings.osc2.semi'],
      [this.osc2.setDetune, this.osc2, 'preset.settings.osc2.cent'],
      [this.filter1.setType, this.filter1, 'preset.settings.filter1.type'],
      [this.filter1.setFreq, this.filter1, 'preset.settings.filter1.frequency'],
      [this.filter1.setQ, this.filter1, 'preset.settings.filter1.q'],
      [this.filter1.setGain, this.filter1, 'preset.settings.filter1.gain'],
    ]

    presetValueMap.forEach((value) => {
      try {
        this[value[0]] = eval(value[1])
      } catch (e) {
        console.warn(`Warning: ${value[1]} is missing from preset`)
      }
    })
    presetFunctionMap.forEach((value) => {
      try {
        value[0].call(value[1], eval(value[2]))
      } catch (e) {
        console.warn(`Warning: ${value[2]} is missing from preset`)
      }
    })
  }

  // take the current synth settings and return an object
  //
  getPreset() {
    return {
      'name': this.name,
      'author': this.author,
      'description': this.description,
      'settings': { 
        'master': { 'gain': this.gain },
        'super': {
          'polyphony': this.polyphony,
          'detune': this.detune,
        },
        'osc1': {
          'enabled': this.osc1.getEnabled(),
          'waveform': this.osc1.getWaveform(),
          'octave': this.osc1.getOctave(),
          'semi': this.osc1.getSemi(),
          'cent': this.osc1.getDetune()
        },
        'osc2': {
          'enabled': this.osc2.getEnabled(),
          'waveform': this.osc2.getWaveform(),
          'octave': this.osc2.getOctave(),
          'semi': this.osc2.getSemi(),
          'cent': this.osc2.getDetune()
        },
        'filter1': {
          'type': this.filter1.getType(),
          'frequency': this.filter1.getFreq(),
          'q': this.filter1.getQ(),
          'gain': this.filter1.getGain()
        }
      }
    }
  }

  // trigger an upload dialog load the file contents as a preset
  //
  loadPresetFile() {
    const fileReader = new FileReader()
    fileReader.addEventListener('load', () => {
      const fileContents = fileReader.result
      const preset = JSON.parse(fileContents)
      this.loadPreset(preset)
    })

    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'application/json'
    input.addEventListener('change', () => {
      fileReader.readAsText(input.files[0])
    })

    input.click()
  }

  // download the current preset as JSON file
  //
  savePresetFile() {
    const preset = this.getPreset()
    const json = JSON.stringify(preset, null, ' ')
    const blob = new Blob([json], { 'type': 'application/json' })
    const objectURL = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.download = `${preset.name || 'Untitled'}.json`
    a.href = objectURL

    a.click()
  }
}

export { Subtractor }
window.Subtractor = Subtractor
