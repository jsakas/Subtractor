import Osc from './osc';
import Filter from './filter';
import Envelope from './envelope';
import { Observable } from './observable';
import { knobToSeconds, knobToFreq } from './utils/maths';
import { renameObjectKey, intToWaveform, waveformToInt } from './utils/helpers';

import merge from 'lodash.merge';

class Subtractor extends Observable {
  constructor() {
    super();
    this.context    = new AudioContext();
    this.osc1       = new Osc(this.context);
    this.osc2       = new Osc(this.context);
    this.osc3       = new Osc(this.context);
    this.filter1    = new Filter(this.context);
    this.filter2    = new Filter(this.context);
    this.dynamicFilters = [];

    // lFO 1 set up
    // currently connected to Filter 2 frequency
    this.lfo1Node = this.context.createOscillator();
    this.lfo1Node.frequency.value = 1;
    this.lfo1Node.start();

    this.lfo1GainNode = this.context.createGain();
    this.lfo1GainNode.gain.value = 1;
    this.lfo1Node.connect(this.lfo1GainNode);
    this.lfo1GainNode.connect(this.filter2.filter.frequency);

    this.name = '';
    this.description = '';
    this.author = '';

    // octave value is used only for the qwerty controls, this value should not be used
    // when MIDI is integrated. 
    this._octave = 4;

    // here polyphony refers to the number of oscs started for each key press,
    // detune refers to the spread of frequencies across the poly notes
    this._polyphony = 1;
    this._detune = 0;

    this._voices = 4;
    this._glide = 1;

    this._activeNotes = {};

    this.masterGain = this.context.createGain();

    // static connections
    this.filter2.filter.connect(this.masterGain);
    this.masterGain.connect(this.context.destination);

    this.pipeline = this.pipeline.bind(this);
  }
  
  moveNote(n1, n2) {
    const oscs = this._activeNotes[n1];

    oscs.forEach((osc) => {
      osc.move(
        n2, 
        this.context.currentTime + knobToSeconds(this._glide)
      );
    });

    renameObjectKey(this._activeNotes, n1, n2);
    this.notifyObservers();
  }

  noteOn(note, velocity = .7) {
    const activeNoteKeys = Object.keys(this._activeNotes);

    if (activeNoteKeys.length >= this._voices) {
      this.moveNote(activeNoteKeys[0], note);
    } else { 
      this._activeNotes[note] = 
        [
          this.osc1,
          this.osc2,
          this.osc3,
        ]
        .map(osc => new Osc(this.context, osc))
        .map(osc => osc.start(note))
        .map(osc => this.pipeline(osc, velocity, osc.voices));
    }

    this.notifyObservers();
  }

  noteOff(note) {
    if (this._activeNotes[note]) {
      const oscs = this._activeNotes[note];

      oscs.forEach((osc) => {
        osc.oscEnvelope.reset();
        osc.filterEnvelope.reset();
        osc.stop(this.context.currentTime + knobToSeconds(this.release));
      });
      
      delete this._activeNotes[note];

      this.notifyObservers();
    }
  }

  // route an oscillator thru the pipeline of modifiers.
  // e.g. gains, filter, distortions etc.
  //
  pipeline(osc, velocity = .7, voices = 1) {
    // create a velocity node
    const velocityGainNode = this.context.createGain();
    velocityGainNode.gain.value = velocity;

    // create a gain node to normalize output of oscillator voices
    const oscVoiceGainNode = this.context.createGain();
    oscVoiceGainNode.gain.value = 1 - ((voices ** .25) % 1);

    // create a gain node for the envelope
    const ampEnvelopeGainNode = this.context.createGain();
    ampEnvelopeGainNode.gain.value = 0;

    // attach an envelope to the gain node
    const oscEnvelope = new Envelope(this.context, ampEnvelopeGainNode.gain);
    oscEnvelope.maxValue = 1;
    oscEnvelope.minValue = 0;
    oscEnvelope.attack = this.attack;
    oscEnvelope.sustain = this.sustain;
    oscEnvelope.decay = this.decay;
    oscEnvelope.release = this.release;
    oscEnvelope.schedule();

    // create a filter, base it on the global filter
    const filter = new Filter(this.context);
    filter.type = this.filter1.type;
    filter.freq = this.filter1.freq;
    filter.q = this.filter1.q;
    filter.gain = this.filter1.gain;
    this.dynamicFilters.push(filter);

    // attach an envelope to the filter frequency
    const filterEnvelope = new Envelope(this.context, filter.filter.frequency);
    filterEnvelope.maxValue = knobToFreq(127);
    filterEnvelope.minValue = knobToFreq(0);
    filterEnvelope.attack = this.filterAttack;
    filterEnvelope.sustain = this.filterSustain;
    filterEnvelope.decay = this.filterDecay;
    filterEnvelope.release = this.filterRelease;
    filterEnvelope.amount = this.filterAmount;
    filterEnvelope.schedule();

    osc.output
      .connect(velocityGainNode)
      .connect(oscVoiceGainNode)
      .connect(ampEnvelopeGainNode)
      .connect(filter.filter)
      .connect(this.filter2.filter);

    // attach the envelopes to the osc so it can be reset on noteOff
    osc.oscEnvelope = oscEnvelope;
    osc.filterEnvelope = filterEnvelope;

    return osc;
  }

  // take a preset object and load it into the synth
  //
  loadPreset(preset = {}) {
    const defaults= {
      name: 'init',
      author: '',
      description: '',
      master: {
        gain: 50,
        voices: 4,
        glide: 0
      },
      ampEnv: {
        attack: 0,
        decay: 100,
        sustain: 64,
        release: 10
      },
      filterEnv: {
        attack: 0,
        decay: 40,
        sustain: 0,
        release: 40,
        amount: 0
      },
      osc1: {
        enabled: 1,
        waveform: 3,
        octave: 0,
        semi: 0,
        voices: 1,
        detune: 0,
        stereo: 100,
        gain: 75,
      },
      osc2: {
        enabled: 0,
        waveform: 1,
        octave: 0,
        semi: 0,
        voices: 1,
        detune: 0,
        stereo: 100,
        gain: 75,
      },
      osc3: {
        enabled: 0,
        waveform: 1,
        octave: 0,
        semi: 0,
        voices: 1,
        detune: 0,
        stereo: 100,
        gain: 75,
      },
      filter1: {
        type: 1,
        freq: 127,
        q: 0.10,
        gain: 0
      },
      filter2: {
        type: 1,
        freq: 127,
        q: 0.10,
        gain: 0
      },
      lfo1: {
        type: 1,
        freq: 1,
        amount: 0
      }
    };

    const p = merge(defaults, preset);

    this.name = p.name;
    this.author = p.author;
    this.description = p.description;
    this.gain = p.master.gain;
    this.voices = p.master.voices;
    this.glide = p.master.glide;
    this.attack = p.ampEnv.attack;
    this.decay = p.ampEnv.decay;
    this.sustain = p.ampEnv.sustain;
    this.release = p.ampEnv.release;
    this.filterAttack = p.filterEnv.attack;
    this.filterDecay = p.filterEnv.decay;
    this.filterSustain = p.filterEnv.sustain;
    this.filterRelease = p.filterEnv.release;
    this.filterAmount = p.filterEnv.amount;
    this.osc1.enabled = p.osc1.enabled;
    this.osc1.waveform = p.osc1.waveform;
    this.osc1.octave = p.osc1.octave;
    this.osc1.semi = p.osc1.semi;
    this.osc1.detune = p.osc1.detune;
    this.osc1.voices = p.osc1.voices;
    this.osc1.stereo = p.osc1.stereo;
    this.osc1.gain = p.osc1.gain;
    this.osc2.enabled = p.osc2.enabled;
    this.osc2.waveform = p.osc2.waveform;
    this.osc2.octave = p.osc2.octave;
    this.osc2.semi = p.osc2.semi;
    this.osc2.detune = p.osc2.detune;
    this.osc2.voices = p.osc2.voices;
    this.osc2.stereo = p.osc2.stereo;
    this.osc2.gain = p.osc2.gain;
    this.osc3.enabled = p.osc3.enabled;
    this.osc3.waveform = p.osc3.waveform;
    this.osc3.octave = p.osc3.octave;
    this.osc3.semi = p.osc3.semi;
    this.osc3.detune = p.osc3.detune;
    this.osc3.voices = p.osc3.voices;
    this.osc3.stereo = p.osc3.stereo;
    this.osc3.gain = p.osc3.gain;
    this.filter1Type = p.filter1.type;
    this.filter1Freq = p.filter1.freq;
    this.filter1Q = p.filter1.q;
    this.filter1Gain = p.filter1.gain;
    this.filter2.type = p.filter2.type;
    this.filter2.freq = p.filter2.freq;
    this.filter2.q = p.filter2.q;
    this.filter2.gain = p.filter2.gain;
    this.lfo1Type = p.lfo1.type;
    this.lfo1Freq = p.lfo1.freq;
    this.lfo1Amount = p.lfo1.amount;
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
        'voices': this.osc1.voices,
        'detune': this.osc1.detune,
        'stereo': this.osc1.stereo,
        'gain': this.osc1.gain,
      },
      'osc2': {
        'enabled': this.osc2.enabled,
        'waveform': this.osc2.waveform,
        'octave': this.osc2.octave,
        'semi': this.osc2.semi,
        'voices': this.osc2.voices,
        'detune': this.osc2.detune,
        'stereo': this.osc2.stereo,
        'gain': this.osc2.gain,
      },
      'osc3': {
        'enabled': this.osc3.enabled,
        'waveform': this.osc3.waveform,
        'octave': this.osc3.octave,
        'semi': this.osc3.semi,
        'voices': this.osc3.voices,
        'detune': this.osc3.detune,
        'stereo': this.osc3.stereo,
        'gain': this.osc3.gain,
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
      },
      'lfo1': {
        'type': this.lfo1Type,
        'freq': this.lfo1Freq,
        'amount': this.lfo1Amount
      }
    };
  }

  get activeNotes() {
    return this._activeNotes;
  }
  
  set octave(value) {
    this._octave = value;
    this.notifyObservers();
  }

  get octave() {
    return this._octave;
  }

  set gain(value) {
    this.masterGain.gain.value = value * .01;
    this.notifyObservers();
  }

  get gain() {
    return this.masterGain.gain.value * 100;
  }

  // amp envelope getter and setters
  set attack(value) {
    this._attack = value;
    this.notifyObservers();
  }

  get attack() {
    return this._attack;
  }

  set decay(value) {
    this._decay = value;
    this.notifyObservers();
  }

  get decay() {
    return this._decay;
  }

  set sustain(value) {
    this._sustain = value;
    this.notifyObservers();
  }

  get sustain() {
    return this._sustain;
  }

  set release(value) {
    this._release = value;
    this.notifyObservers();
  }

  get release() {
    return this._release;
  }

  // filter 1
  set filter1Type(value) {
    this.filter1.type = value;
    this.dynamicFilters.forEach((filter) => { 
      filter.type = value; 
    });
  }

  get filter1Type() {
    return this.filter1.type;
  }

  set filter1Freq(value) {
    this.filter1.freq = value;
    this.dynamicFilters.forEach((filter) => { 
      filter.freq = value; 
    });
  }

  get filter1Freq() {
    return this.filter1.freq;
  }

  set filter1Q(value) {
    this.filter1.q = value;
    this.dynamicFilters.forEach((filter) => { 
      filter.q = value; 
    });
  }

  get filter1Q() {
    return this.filter1.q;
  }

  set filter1Gain(value) {
    this.filter1.gain = value;
    this.dynamicFilters.forEach((filter) => { 
      filter.gain = value; 
    });
  }

  get filter1Gain() {
    return this.filter1.gain;
  }

  // filter envelope getters and setters
  set filterAttack(value) {
    this._filterAttack = value;
    this.notifyObservers();
  }

  get filterAttack() {
    return this._filterAttack;
  }

  set filterDecay(value) {
    this._filterDecay = value;
    this.notifyObservers();
  }

  get filterDecay() {
    return this._filterDecay;
  }

  set filterSustain(value) {
    this._filterSustain = value;
    this.notifyObservers();
  }

  get filterSustain() {
    return this._filterSustain;
  }

  set filterRelease(value) {
    this._filterRelease = value;
    this.notifyObservers();
  }
  
  get filterRelease() {
    return this._filterRelease;
  }

  set filterAmount(value) {
    this._filterAmount = value;
    this.notifyObservers();
  }

  get filterAmount() {
    return this._filterAmount;
  }

  get voices() {
    return this._voices;
  }

  set voices(value) {
    this._voices = Number(Number(value).toFixed());
  }

  get glide() {
    return this._glide;
  }

  set glide(value) {
    this._glide = Number(value);
  }
  
  get lfo1Type() {
    return waveformToInt(this.lfo1Node.type);
  }

  set lfo1Type(value) {
    this.lfo1Node.type = intToWaveform(Number(Number(value).toFixed()));
    this.notifyObservers();
  }

  get frlfo1Type() {
    return this.lfo1Node.type;
  }

  get lfo1Freq() {
    return this.lfo1Node.frequency.value * 100;
  }

  set lfo1Freq(value) {
    this.lfo1Node.frequency.value = value / 100;
    this.notifyObservers();
  }

  get lfo1Amount() {
    return this._lfo1Amount;
  }

  set lfo1Amount(value) {
    this.lfo1GainNode.gain.value = value;
    this._lfo1Amount = value;
    this.notifyObservers();
  }
}

export default Subtractor;
