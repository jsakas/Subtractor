import { intToFilter, filterToInt } from './utils/helpers';
import { knobToFreq, freqToKnob } from './utils/maths';
import { Observable } from './Observe';

class Filter extends Observable {
    constructor(context) {
      super();
      this.context = context;
      this._filter = context.createBiquadFilter();
      this.freq = 127;
      this.type = 'lowpass';
    }

    get filter() {
      return this._filter;
    }

    set type(value) {
      if (typeof value == 'string') {
        this._filter.type = value;
      } else if (typeof value == 'number') {
        this._filter.type = intToFilter(value);
      }
      this.notifyObservers();
    }

    get type() {
      return filterToInt(this._filter.type);
    }

    get frType() {
      return this._filter.type;
    }

    set freq(value) {
      this._filter.frequency.value = knobToFreq(value);
      this.notifyObservers();
    }

    get freq() {
      return freqToKnob(this._filter.frequency.value);
    }

    get frFreq() {
      return this._filter.frequency.value;
    }

    set q(value) {
      this._filter.Q.value = value / 10;
      this.notifyObservers();
    }

    get q() {
      return this._filter.Q.value * 10;
    }

    set gain(value) {
      this._filter.gain.value = value;
      this.notifyObservers();
    }

    get gain() {
      return this._filter.gain.value;
    }
}

export { Filter };
