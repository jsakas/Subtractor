import Vue from 'vue';
import { BLACK, WHITE, WHITE_KEY_WIDTH, keyboardFactory } from '../utils/keyboard';

import './Keyboard.scss';

let mouseIsDown = false;

Vue.component('x-keyboard', {
  props: {
    componentKey: Number,
    octave: Number,
    noteOn: Function,
    noteOff: Function,
    subtractor: Object,
    activeNotes: Array,
    octaves: {
      type: Number,
      required: false,
      default: 7,
    }
  },
  computed: {
    keyboard () {
      return keyboardFactory(this.octaves);
    },
    viewBox() {
      return `0 0 ${this.keyboard.width} 24`;
    },
    oiPosition () {
      let x = (this.octave - 1) * 7 * WHITE_KEY_WIDTH;
      let width = 11 * WHITE_KEY_WIDTH;

      if (x < 0) {
        width += x;
        x = 0;
      }

      if (x + width > this.keyboard.width) {
        width -= ((x + width) - this.keyboard.width); 
      }

      return { 
        x,
        width 
      };
    },
    oiWidth () {
      return this.oiPosition.width;
    },
    oiX () {
      return this.oiPosition.x;
    },

  },
  methods: {
    mousedown(e) {
      mouseIsDown = true;
      let note = Number(e.target.id.replace('key-', ''));
      if (!this.activeNotes.includes(note)) {
        this.subtractor.noteOn(note);
      }
    },
    mouseup(e) {
      mouseIsDown = false;
      let note = Number(e.target.id.replace('key-', ''));
      this.subtractor.noteOff(note);
    },
    mouseover(e) {
      let note = Number(e.target.id.replace('key-', ''));
      if (mouseIsDown && !this.activeNotes.includes(note)) {
        this.subtractor.noteOn(note);
      }
    },
    mouseout(e) {
      let note = Number(e.target.id.replace('key-', ''));
      this.subtractor.noteOff(note);
    },
    keyClass(key) {
      let classList = [];
      if (key.type === BLACK) {
        classList.push('keyboard__key-black');
      }

      if (key.type === WHITE) {
        classList.push('keyboard__key-white');
      }

      if (this.activeNotes.includes(key.id)) {
        classList.push('keyboard__key--active');
      }

      return classList.join(' ');
    },
    keyId(key) {
      return `key-${key.id}`;
    },
  },
  template: `
    <svg id="keyboard" class="keyboard" :viewBox="viewBox">
      <rect
        v-for="(key, index) in keyboard.keyboard"
        v-on:mousedown="mousedown"
        v-on:mouseup="mouseup"
        v-on:mouseover="mouseover"
        v-on:mouseout="mouseout"
        :id="keyId(key)" 
        :x="key.x"
        :y="key.y"
        :width="key.width"
        :height="key.height"
        :class="keyClass(key)"
        ref="keys" 
      />

      <rect id="octave" y="22" :x="this.oiX" :width="this.oiWidth" height="1" class="keyboard__octave-indicator" />     
    </svg>
  `
});
