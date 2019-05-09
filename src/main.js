import Vue from 'vue';

import Subtractor from './Subtractor';
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

import './Subtractor.scss';

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
