import Vue from 'vue';
import { pointToPercent } from '../utils/maths';

import './Fader.scss';

Vue.component('x-fader', {
  mounted() {
    let refs = this.$refs;

    this.rangeRect = refs.faderRange.getBoundingClientRect();
    this.knobRect = refs.faderKnob.getBoundingClientRect();
    this.maxTop = this.rangeRect.height - this.knobRect.height;
    this.setTop();
  },
  beforeUpdate() {
    this.setTop();
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
    mousedown(e) {
      let refs = this.$refs;

      refs.faderInput.dispatchEvent(new Event('focus'));
      refs.faderKnob.style.transition = 'none';
      const currentValue = parseInt(refs.faderInput.value);

      const boundMousemove = this.mousemove.bind(e, this, e.clientX, e.clientY, currentValue);
      document.addEventListener('mousemove', boundMousemove);
      document.addEventListener('mouseup', () => {
        refs.faderKnob.style.transition = '';
        document.removeEventListener('mousemove', boundMousemove);
      });
    },
    mousemove (_this, x, y, oldValue, e) {
      let refs = _this.$refs;

      const yDiff = (e.clientY - parseInt(y));
      const range = _this.max - _this.min;
      const changeInterval = range / _this.rangeRect.height;
  
      let value = oldValue - (changeInterval * yDiff);
      if (value > _this.max) { 
        value = _this.max; 
      }
      if (value < _this.min) { 
        value = _this.min; 
      }
  
      refs.faderInput.value = value;
      this.$emit('update:value', value);
    },
    onInput (e) {
      let value = Number(e.target.value);
      this.$emit('update:value', value);
    },
    setTop(value = this.value) {
      const inputMax = parseInt(this.max);
      const inputMin = parseInt(this.min); 
      
      const percent = pointToPercent(inputMin, inputMax, value);
      const top = this.maxTop * (1 - percent);

      let refs = this.$refs;
      refs.faderKnob.style.top = `${top}px`;
    },
    label (value) {
      if (this.valueFmt && typeof this.valueFmt == 'function') {
        return this.valueFmt(value);
      }
      return parseInt(value).toFixed(0);
    },
  },
  template: `
    <label ref="fader" for="fader__input" class="fader" id="fader">
      <input
        ref="faderInput"
        class="fader__input"
        id="fader__input"
        type="range"
        :min="min"
        :max="max"
        :step="step"
        :value="value"
        v-on:input="onInput"
      />
      <div ref="faderControl" v-on:mousedown="this.mousedown" class="fader__control" id="fader__control">
        <div ref="faderRange" class="fader__range" id="fader__range" />
        <div ref="faderKnob" class="fader__knob" id="fader__knob" />
      </div>
      <div class="fader__name" id="fader__name">
        {{ name }}
      </div>
      <div ref="faderValue" class="fader__value" id="fader__value">{{ this.label(value) }}</div>
    </label>
  `
});
