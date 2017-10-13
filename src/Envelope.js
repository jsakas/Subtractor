import { Observable } from './Observe'
import { knobToSeconds } from './utils/maths'

class Envelope extends Observable {
    constructor(context, audioParam) {
      super()

      this.context = context
      this.audioParam = audioParam
      // the following should work, but we need to convert that scientific notation to a value somehow
      // this.maxValue = audioParam.maxValue
      // this.minValue = audioParam.minValue
      this.startValue = audioParam.value
      this.maxValue = 1
      this.minValue = 0
      this._attack = 0
      this._decay = 40
      this._sustain = 0
      this._release = 40
      this._amount = 127
    }

    // schedule handles the ADS of the ADSR envelope
    //
    schedule() {
      const baseValue = this.startValue

      const amount = (this._amount / 127)
      const sustainAmount = this._sustain * (100 / 127) * .01

      const rampTo = baseValue + ((this.maxValue - baseValue) * amount)
      const sustainTo = baseValue + ((this.maxValue - baseValue) * sustainAmount)

      // start at the current value
      this.audioParam.setValueAtTime(this.startValue, this.context.currentTime)

      // ramp up
      this.audioParam.linearRampToValueAtTime(
        rampTo, 
        this.context.currentTime + knobToSeconds(this._attack)
      )

      // ramp down to sustain value
      this.audioParam.linearRampToValueAtTime(
        sustainTo, 
        this.context.currentTime + knobToSeconds(this._attack + this._decay)
      )
    }

    // reset handles the R of the ADSR envelope
    //
    reset() {
      // kill all current scheduled values and reset to current value
      this.audioParam.cancelScheduledValues(this.context.currentTime)

      // start decay from current value to min
      this.audioParam.linearRampToValueAtTime(this.startValue, this.context.currentTime + knobToSeconds(this._release))
    }

    set attack(value) {
      this._attack = value
      this.notifyObservers()
    }

    get attack() {
      return this._attack
    }

    set decay(value) {
      this._decay = value
      this.notifyObservers()
    }

    get decay() {
      return this._decay
    }

    set sustain(value) {
      this._sustain = value
      this.notifyObservers()
    }

    get sustain() {
      return this._sustain
    }

    set release(value) {
      this._release = value
      this.notifyObservers()
    }

    get release() {
      return this._release
    }

    set amount(value) {
      this._amount = value
      this.notifyObservers()
    }

    get amount() {
      return this._amount
    }
}

export { Envelope }
