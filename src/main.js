import Vue from 'vue';

import Subtractor from './Subtractor';
import { EnvelopeGraph } from './Envelope';
import initOscilloscope from './Oscilloscope';
import initQuertyController from './core/QwertyController';
import MidiController from './core/MidiController';
import { loadPresetFile, savePresetFile } from './core/PresetFileController';
import { intToWaveform, intToFilter } from './utils/helpers';
import { knobToFreq } from './utils/maths';

import presets from './presets';
import defaultPreset from './presets/default';

import './components/Fader';
import './components/Knob';
import './components/Keyboard';
import './components/Button';

import './style/base.scss';

let subtractor = new Subtractor();
let midi = new MidiController();

const handleMIDIMessage = (message) => {
  switch (message.command) {
    case 144:
    subtractor.noteOn(message.note, message.velocity);
    break;
    case 128:
    subtractor.noteOff(message.note, message.velocity);
    break;
    default:
    break;
  }
};

midi.handleMIDIMessage = handleMIDIMessage;

const vm = new Vue({ 
  el: '#subtractor',
  mounted() {
    initQuertyController(subtractor);
    initOscilloscope(subtractor, document.getElementById('oscilloscope'));
    subtractor.registerObserver(this);
    subtractor.osc1.registerObserver(this);
    subtractor.osc2.registerObserver(this);
    subtractor.filter1.registerObserver(this);
    subtractor.filter2.registerObserver(this);
    subtractor.loadPreset(defaultPreset);

    new EnvelopeGraph(() => ({
      attack: subtractor.filterAttack,
      decay: subtractor.filterDecay,
      sustain: subtractor.filterSustain,
      release: subtractor.filterRelease,
    }), document.getElementById('filterenv-graph'));

    new EnvelopeGraph(() => ({
      attack: subtractor.attack,
      decay: subtractor.decay,
      sustain: subtractor.sustain,
      release: subtractor.release,
    }), document.getElementById('ampenv-graph'));
  },
  methods: {
    forceUpdate() {
      this.componentKey += 1;
      this.activeNotes = Object.keys(subtractor.activeNotes).map(Number);
    },
    notify() {
      this.forceUpdate();
    },
    savePreset() {
      savePresetFile(subtractor);
    },
    loadPreset() {
      loadPresetFile(subtractor);
    },
    setPreset(e) {
      subtractor.loadPreset(this.preset);
      e.target.blur();
    },
    intToFilter,
    intToWaveform,
    knobToFreq,
  },
  data() {
    return {
      subtractor,
      presets,
      midi,
      defaultPreset,
      preset: defaultPreset,
      componentKey: 0,
      activeNotes: [],
    };
  },
});

midi.on('update', vm.forceUpdate);
