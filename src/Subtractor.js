import * as Presets from './presets'
import './sass/subtractor.scss';

import { Osc } from './Osc'
import { Filter } from './Filter'
import { Envelope } from './Envelope'
import { Oscilloscope } from './Oscilloscope'
import { Observable } from './Observe'
import { knobToSeconds, knobToFreq } from './utils/maths'
import { intToFilter, renameObjectKey } from './utils/helpers'


class Subtractor extends Observable {
  constructor() {
    super()
    this.context    = new AudioContext()
    this.osc1       = new Observable();
    this.osc2       = new Observable();
    this.filter1    = new Filter(this.context)
    this.filter2    = new Filter(this.context)
    this.dynamicFilters = []

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

    this._voices = 4
    this._glide = 1

    this._activeNotes = {};

    this.masterGain = this.context.createGain()

    // static connections
    this.filter2.filter.connect(this.masterGain)
    this.masterGain.connect(this.context.destination)

    this.pipeline = this.pipeline.bind(this)

    // only perform certain tasks once the DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
      this.startOscilloscope()
      this.loadPreset(Presets.Reese)
    })
  }
  
  moveNote(n1, n2) {
    console.debug('moveNote', n1, n2)

    const voices = this._activeNotes[n1]

    Object.keys(voices)
      .filter(i => voices[i])
      .forEach((voice) => {
        Object.keys(voice).forEach((v) => {
          voices[voice[v]].move(
            n2, 
            this._polyphony, 
            this._detune, 
            this.context.currentTime + knobToSeconds(this._glide)
          )
        })
      })
      
    renameObjectKey(this._activeNotes, n1, n2);
  }

  noteOn(note) {
    console.debug('noteOn', note)

    const activeNoteKeys = Object.keys(this._activeNotes)

    if (activeNoteKeys.length >= this._voices) {
      this.moveNote(activeNoteKeys[0], note);
    } else { 
      this._activeNotes[note] = [
        new Osc(this.context, this.osc1),
        new Osc(this.context, this.osc2)
      ].map((osc) => {
        if (!osc.enabled) { 
          return null
        }
        osc.start(note, this._polyphony, this._detune).map(this.pipeline)
        return osc;
      }).reduce((acc, cur, i) => Object.assign(acc, { [i + 1]: cur }), {})
    }
  }

  noteOff(note) {
    console.debug('noteOff', note);
    
    if (this._activeNotes[note]) {
      const oscs = this._activeNotes[note];
      
      Object.keys(oscs)
        .filter(i => oscs[i])
        .forEach((oscKey) => {
          oscs[oscKey].oscs.forEach((o) => {
            o.oscEnvelope.reset();
            o.filterEnvelope.reset();
            o.stop(this.context.currentTime + knobToSeconds(this.release))
          })
        })
      
      delete this._activeNotes[note];
    } else {
      console.debug(`could not find active note ${note}, activeNotes are:`, this._activeNotes)
    }
  }

  // route an oscillator thru the pipeline of modifiers.
  // e.g. gains, filter, distortions etc.
  //
  pipeline(osc) {
    // create a gain node for the envelope
    const gainNode = this.context.createGain()
    gainNode.gain.value = 0

    // attach an envelope to the gain node
    const oscEnvelope = new Envelope(this.context, gainNode.gain)
    oscEnvelope.maxValue = 1
    oscEnvelope.minValue = 0
    oscEnvelope.attack = this.attack
    oscEnvelope.sustain = this.sustain
    oscEnvelope.decay = this.decay
    oscEnvelope.release = this.release
    oscEnvelope.schedule()

    // create a filter, base it on the global filter
    const filter = new Filter(this.context)
    filter.type = this.filter1.frType
    filter.freq = this.filter1.freq
    filter.q = this.filter1.q
    filter.gain = this.filter1.gain
    this.dynamicFilters.push(filter)

    // attach an envelope to the filter frequency
    const filterEnvelope = new Envelope(this.context, filter.filter.frequency)
    filterEnvelope.maxValue = knobToFreq(127)
    filterEnvelope.minValue = knobToFreq(0)
    filterEnvelope.attack = this.filterAttack
    filterEnvelope.sustain = this.filterSustain
    filterEnvelope.decay = this.filterDecay
    filterEnvelope.release = this.filterRelease
    filterEnvelope.amount = this.filterAmount
    filterEnvelope.schedule()

    // route the osc thru everything we just created 
    osc.connect(gainNode)
    gainNode.connect(filter.filter)
    filter.filter.connect(this.filter2.filter)

    // attach the envelopes to the osc the gain node so it can be reset on noteOff
    osc.oscEnvelope = oscEnvelope
    osc.filterEnvelope = filterEnvelope
    
    // start and return the osc
    osc.start()
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
      detune: 0,
      voices: 4,
      glide: 0
    },
    ampEnv = {
      attack: 0,
      decay: 100,
      sustain: 64,
      release: 10
    },
    filterEnv = {
      attack: 0,
      decay: 40,
      sustain: 0,
      release: 40,
      amount: 0
    },
    osc1 = {
      enabled: 1,
      waveform: 3,
      octave: 0,
      semi: 0,
      detune: 0
    },
    osc2 = {
      enabled: 0,
      waveform: 3,
      octave: 0,
      semi: 0,
      detune: 0
    },
    filter1 = {
      type: 1,
      freq: 64,
      q: 0.10,
      gain: 0
    },
    filter2 = {
      type: 1,
      freq: 127,
      q: 0.10,
      gain: 0
    }
  }) {
    this.name = name
    this.author = author
    this.description = description
    this.gain = master.gain
    this.polyphony = master.polyphony
    this.voices = master.voices
    this.glide = master.glide
    this.detune = master.detune
    this.attack = ampEnv.attack
    this.decay = ampEnv.decay
    this.sustain = ampEnv.sustain
    this.release = ampEnv.release
    this.filterAttack = filterEnv.attack
    this.filterDecay = filterEnv.decay
    this.filterSustain = filterEnv.sustain
    this.filterRelease = filterEnv.release
    this.filterAmount = filterEnv.amount
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
    this.filter1Type = filter1.type
    this.filter1Freq = filter1.freq
    this.filter1Q = filter1.q
    this.filter1Gain = filter1.gain
    this.filter2.type = filter2.type
    this.filter2.freq = filter2.freq
    this.filter2.q = filter2.q
    this.filter2.gain = filter2.gain
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
        'voices': this.voices,
        'glide': this.glide,
      },
      'ampEnv': {
        'attack': this.attack,
        'decay': this.decay,
        'sustain': this.sustain,
        'release': this.release
      },
      'filterEnv': {
        'attack': this.filterAttack,
        'decay': this.filterDecay,
        'sustain': this.filterSustain,
        'release': this.filterRelease,
        'amount': this.filterAmount
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
        'type': this.filter1Type,
        'freq': this.filter1Freq,
        'q': this.filter1Q,
        'gain': this.filter1Gain
      },
      'filter2': {
        'type': this.filter2.type,
        'freq': this.filter2.freq,
        'q': this.filter2.q,
        'gain': this.filter2.gain
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

  // amp envelope getter and setters
  set attack(value) {
    this._attack = value
    this.notifyObservers()
  }

  get attack() {
    return this._attack
  }

  set decay(value) {
    this._decay = value
    this.notifyObservers()
  }

  get decay() {
    return this._decay
  }

  set sustain(value) {
    this._sustain = value
    this.notifyObservers()
  }

  get sustain() {
    return this._sustain
  }

  set release(value) {
    this._release = value
    this.notifyObservers()
  }

  get release() {
    return this._release
  }

  // filter 1
  set filter1Type(value) {
    this.filter1.type = intToFilter(value)
    this.dynamicFilters.forEach((filter) => { 
      filter.type = intToFilter(value) 
    })
    this.notifyObservers()
  }

  get filter1Type() {
    return this.filter1.type
  }

  get filter1FrType() {
    return this.filter1.frType
  }

  set filter1Freq(value) {
    this.filter1.freq = value
    this.dynamicFilters.forEach((filter) => { 
      filter.freq = value 
    })
    this.notifyObservers()
  }

  get filter1Freq() {
    return this.filter1.freq
  }

  get filter1FrFreq() {
    return this.filter1.frFreq
  }

  set filter1Q(value) {
    this.filter1.q = value
    this.dynamicFilters.forEach((filter) => { 
      filter.q = value 
    })
    this.notifyObservers()
  }

  get filter1Q() {
    return this.filter1.q
  }

  set filter1Gain(value) {
    this.filter1.gain = value
    this.dynamicFilters.forEach((filter) => { 
      filter.gain = value 
    })
    this.notifyObservers()
  }

  get filter1Gain() {
    return this.filter1.gain
  }

  // filter envelope getters and setters
  set filterAttack(value) {
    this._filterAttack = value
    this.notifyObservers()
  }

  get filterAttack() {
    return this._filterAttack
  }

  set filterDecay(value) {
    this._filterDecay = value
    this.notifyObservers()
  }

  get filterDecay() {
    return this._filterDecay
  }

  set filterSustain(value) {
    this._filterSustain = value
    this.notifyObservers()
  }

  get filterSustain() {
    return this._filterSustain
  }

  set filterRelease(value) {
    this._filterRelease = value
    this.notifyObservers()
  }
  
  get filterRelease() {
    return this._filterRelease
  }

  set filterAmount(value) {
    this._filterAmount = value
    this.notifyObservers()
  }

  get filterAmount() {
    return this._filterAmount
  }

  get voices() {
    return this._voices;
  }

  set voices(value) {
    this._voices = value;
  }

  get glide() {
    return this._glide;
  }

  set glide(value) {
    this._glide = value;
  }
}

export { Subtractor }
window.Subtractor = Subtractor
