import { Observable } from './Observe';
import { knobToAttack, knobToDecay, knobToRelease } from './utils/maths';

class Envelope extends Observable {
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
      this.audioParam.linearRampToValueAtTime(
        sustainTo, 
        // we have to add an imperceptible amount of time (.01) for this to work properly when decay is 0
        this.context.currentTime + knobToAttack(this.attack) + .01 + knobToDecay(this.decay)
      );
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
      this.audioParam.linearRampToValueAtTime(this.startValue, this.context.currentTime + knobToRelease(this._release));
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

export { Envelope };
