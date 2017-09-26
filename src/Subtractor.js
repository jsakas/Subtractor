import * as Presets from './presets'

import { Osc } from './Osc'
import { Filter } from './Filter'
import { Oscilloscope } from './Oscilloscope'
import { Observable } from './Observe'


class Subtractor extends Observable {
  constructor() {
    super()
    this.context    = new AudioContext()
    this.osc1       = new Osc(this.context, true)
    this.osc2       = new Osc(this.context, false)
    this.filter1    = new Filter(this.context)

    this.name = ''
    this.description = ''
    this.author = ''

    // octave value is used only for the qwerty controls, this value should not be used
    // when MIDI is integrated. 
    this._octave = 4

    // here polyphony refers to the number of oscs started for each key press,
    // detune refers to the spread of frequencies across the poly notes
    this._polyphony = 1
    this._detune = 0

    this.masterGain = this.context.createGain()
    this.filter1.filter.connect(this.masterGain)
    this.masterGain.connect(this.context.destination)

    // only perform certain tasks once the DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
      this.startOscilloscope()
      this.loadPreset(Presets.Init)
    })
  }

  set octave(value) {
    this._octave = value
    this.notifyObservers()
  }

  get octave() {
    return this._octave
  }

  set polyphony(value) {
    this._polyphony = value
    this.notifyObservers()
  }

  get polyphony() {
    return this._polyphony
  }

  set detune(value) {
    this._detune = value * .01
    this.notifyObservers()
  }

  get detune() {
    return this._detune * 100
  }

  set gain(value) {
    this.masterGain.gain.value = value * .01
    this.notifyObservers()
  }

  get gain() {
    return this.masterGain.gain.value * 100
  }

  startPolyNote(note) {
    let returnOscs = [this.osc1, this.osc2].map((osc) => {
      if (!osc.enabled) { 
        return []
      }
      return osc.start(note, this._polyphony, this._detune)
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
  loadPreset({
    name = 'init',
    author = '',
    description = '',
    master = {
      gain: 50,
      polyphony: 1,
      detune: 0
    },
    osc1 = {
      enabled: 1,
      waveform: 1,
      octave: 0,
      semi: 0,
      detune: 0
    },
    osc2 = {
      enabled: 0,
      waveform: 1,
      octave: 0,
      semi: 0,
      detune: 0
    },
    filter1 = {
      type: 1,
      freq: 22050,
      q: 0.10,
      gain: 0
    }
  }) {
    this.name = name
    this.author = author
    this.description = description
    this.gain = master.gain
    this.polyphony = master.polyphony
    this.detune = master.detune
    this.osc1.enabled = osc1.enabled
    this.osc1.waveform = osc1.waveform
    this.osc1.octave = osc1.octave
    this.osc1.semi = osc1.semi
    this.osc1.detune = osc1.detune
    this.osc2.enabled = osc2.enabled
    this.osc2.waveform = osc2.waveform
    this.osc2.octave = osc2.octave
    this.osc2.semi = osc2.semi
    this.osc2.detune = osc2.detune
    this.filter1.type = filter1.type
    this.filter1.freq = filter1.freq
    this.filter1.q = filter1.q
    this.filter1.gain = filter1.gain
  }

  // take the current synth settings and return an object
  //
  getPreset() {
    return {
      'name': this.name,
      'author': this.author,
      'description': this.description,
      'master': {
        'gain': this.gain,
        'polyphony': this.polyphony,
        'detune': this.detune,
      },
      'osc1': {
        'enabled': this.osc1.enabled,
        'waveform': this.osc1.waveform,
        'octave': this.osc1.octave,
        'semi': this.osc1.semi,
        'detune': this.osc1.detune
      },
      'osc2': {
        'enabled': this.osc2.enabled,
        'waveform': this.osc2.waveform,
        'octave': this.osc2.octave,
        'semi': this.osc2.semi,
        'detune': this.osc2.detune
      },
      'filter1': {
        'type': this.filter1.type,
        'freq': this.filter1.freq,
        'q': this.filter1.q,
        'gain': this.filter1.gain
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
