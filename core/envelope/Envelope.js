import { Observable } from '../observable';
import { knobToAttack, knobToDecay, knobToRelease } from '../utils/maths';

// some web audio api params fail if you try to modulate them to zero.
const NO_ZERO = 0.00001;

export default class Envelope extends Observable {
    constructor(context, audioParam) {
      super();

      this.context = context;
      this.audioParam = audioParam;
      this.startValue = audioParam.value;
      this._maxValue = 1;
      this._minValue = 0;
      this._attack = 0;
      this._decay = 40;
      this._sustain = 0;
      this._release = 40;
      this._amount = 127;
    }

    // schedule handles the ADS of the ADSR envelope
    //
    schedule() {
      const baseValue = this.startValue;
      
      const amount = (this.amount / 127);
      const sustainAmount = this.sustain * (100 / 127) * .01;
      
      const rampTo = baseValue + ((this.maxValue - baseValue) * amount);
      const sustainTo = baseValue + ((this.maxValue - baseValue) * sustainAmount);

      // start at the current value
      this.audioParam.setValueAtTime(this.startValue, this.context.currentTime);

      // ramp up
      this.audioParam.linearRampToValueAtTime(
        rampTo, 
        this.context.currentTime + knobToAttack(this.attack)
      );

      // ramp down to sustain value
      this.audioParam.exponentialRampToValueAtTime(
        sustainTo + NO_ZERO, 
        this.context.currentTime + knobToAttack(this.attack) + knobToDecay(this.decay)
      );

      if (sustainTo === 0) {
        this.audioParam.setValueAtTime(sustainTo, this.context.currentTime + knobToAttack(this.attack) + knobToDecay(this.decay)); 
      }
    }

    // reset handles the R of the ADSR envelope
    //
    // in Firefox, this does not current work properly because cancelAndHoldAtTime is not available yet
    // 
    reset() {
      // cancelAndHoldAtTime is not available in Firefox yet
      if (this.audioParam.cancelAndHoldAtTime) {
        this.audioParam.cancelAndHoldAtTime(this.context.currentTime);
      }

      // start decay from current value to min
      this.audioParam.exponentialRampToValueAtTime(this.startValue + NO_ZERO, this.context.currentTime + knobToRelease(this._release));
      if (this.startValue === 0) {
        this.audioParam.setValueAtTime(this.startValue, this.context.currentTime + knobToRelease(this._release)); 
      }
    }

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

    set amount(value) {
      this._amount = value;
      this.notifyObservers();
    }

    get amount() {
      return this._amount;
    }

    set minValue(value) {
      this._minValue = value;
    }

    get minValue() {
      return this._minValue;
    }

    set maxValue(value) {
      this._maxValue = value;
    }

    get maxValue() {
      return this._maxValue;
    }
}
