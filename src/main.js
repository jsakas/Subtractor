import Vue from 'vue';

import Subtractor from './Subtractor';
import initOscilloscope from './Oscilloscope';
import initQuertyController from './core/QwertyController';
import initMidiController from './core/MidiController';
import { loadPresetFile, savePresetFile } from './core/PresetFileController';

import defaultPreset from './presets/Init';

import './components/Fader';
import './components/Knob';
import './components/Keyboard';

import './Subtractor.scss';

let subtractor = window.Subtractor = new Subtractor();

new Vue({ 
  el: '#subtractor',
  mounted() {
    initQuertyController(subtractor);
    initMidiController(subtractor);
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
    setPresetFromSelect(e) {
      subtractor.setPresetFromSelect(e.target.value);
      e.target.blur();
    }
  },
  data() {
    return {
      subtractor,
      componentKey: 0,
      activeNotes: [],
    };
  },
});

