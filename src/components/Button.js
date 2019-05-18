import Vue from 'vue';

import './Button.scss';

Vue.component('x-button', {
  props: {
    on: {
      type: [Boolean, Number],
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
  },
  methods: {
    click() {
      this.$emit('update:on', !this.on);
    }
  },
  computed: {
    className() {
      let cl = ['button__button'];
      if (this.on) {
        cl.push('button__button--on');
      } else {
        cl.push('button__button--off');
      }
      return cl;
    }
  },
  template: `
    <div class="button">
        <span class="button__name">{{ label }}</span>
        <button
            v-bind:class="this.className"
            v-on:click="this.click">
        </button>
    </div>
  `
});
