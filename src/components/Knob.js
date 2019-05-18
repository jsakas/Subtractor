import Vue from 'vue';
import { percentToPoint, pointToPercent } from '../utils/maths';

import './Knob.scss';

Vue.component('x-knob', {
  mounted() {
    let refs = this.$refs;
    this.knobRect = refs.knobKnob.getBoundingClientRect();
    this.setRotation();
  },
  beforeUpdate() {
    this.setRotation();
  },
  props: {
    name: {
      type: String,
      required: true,
      default: '',
    },
    min: { 
      type: Number,
      required: true,
      default: 0,
    },
    max: { 
      type: Number,
      required: true,
      default: 127, 
    },
    step: {
      type: Number,
      required: false,
      default: 1,
    },
    value: { 
      type: Number,
      required: true,
      default: 0,
    },
    valueFmt: {
      type: Function,
      required: false,
    }
  },
  methods: {
    mousedown (e) {
      e.preventDefault();
      
      let refs = this.$refs;

      // refs.knobInput.focus();
      refs.knobKnob.style.transition = 'none';
      const currentValue = parseInt(refs.knobInput.value);
      const boundMousemove = this.mousemove.bind(e, this, e.clientX, e.clientY, currentValue);
      document.addEventListener('mousemove', boundMousemove);
      document.addEventListener('mouseup', () => {
        refs.knobKnob.style.transition = '';
        document.removeEventListener('mousemove', boundMousemove);
      });
    },
    mousemove (_this, x, y, oldValue, e) {
      let refs = _this.$refs;

      const yDiff = (e.clientY - parseInt(y));
      const range = _this.max - _this.min;
      const changeInterval = range / 100;
  
      let value = oldValue - (changeInterval * yDiff);
      if (value > _this.max) { 
        value = _this.max; 
      }
      if (value < _this.min) { 
        value = _this.min; 
      }

      refs.knobInput.value = value;
      this.$emit('update:value', value);
    },
    onInput (e) {
      let value = Number(e.target.value);
      this.$emit('update:value', value);
    },
    setRotation(value = this.value) {
      let refs = this.$refs;

      const inputMax = parseInt(this.max);
      const inputMin = parseInt(this.min);
  
      const percent = pointToPercent(inputMin, inputMax, value);
      const degree = percentToPoint(-150, 150, percent);
  
      refs.knobKnob.style.transform = `rotateZ(${parseInt(degree)}deg)`;
    },
    label (value) {
      if (this.valueFmt && typeof this.valueFmt == 'function') {
        return this.valueFmt(value);
      }
      return parseInt(value).toFixed(0);
    },
  },
  template: `
    <label for="knob__input" class="knob" id="knob">
      <input 
        class="knob__input"
        id="knob__input"
        ref="knobInput"
        type="range" 
        :min="min"
        :max="max"
        :step="step"
        :value="value"
        v-on:input="onInput"
      />
      <div class="knob__control" id="knob__control" ref="knobControl">
        <div class="knob__knob" id="knob__knob" v-on:mousedown="this.mousedown" ref="knobKnob"></div>
      </div>
      <div class="knob__name" id="knob__name">{{ name }}</div>
      <div class="knob__value" id="knob__value" ref="knobValue">{{ this.label(value) }}</div>
    </label>
  `
});
