import { Observable } from './Observe'
import { knobToSeconds } from './utils/maths'

class Envelope extends Observable {
    constructor(context, audioParam) {
      super()

      this.context = context
      this.audioParam = audioParam
      // the following should work, but we need to convert that scientific notation to a value somehow
      // this.maxValue = audioParam.maxValue
      this.maxValue = 1
      this.minValue = 0
      this._attack = 0
      this._sustain = 63
      this._decay = 0
      this._release = 63
    }

    schedule() {
      const sustainPercent = this._sustain * (100 / 127) * .01 // how far to drop down for the sustain
      this.audioParam.setValueAtTime(0, this.context.currentTime)
      this.audioParam.linearRampToValueAtTime(this.maxValue, this.context.currentTime + knobToSeconds(this._attack))
      this.audioParam.linearRampToValueAtTime(this.maxValue * sustainPercent, this.context.currentTime + knobToSeconds(this._attack + this._decay))
    }

    reset() {
      this.audioParam.cancelScheduledValues(this.context.currentTime)
      this.audioParam.setValueAtTime(this.audioParam.value, this.context.currentTime)
      this.audioParam.linearRampToValueAtTime(this.minValue, this.context.currentTime + knobToSeconds(this._release))
    }

    set attack(value) {
      this._attack = value
    }

    get attack() {
      return this._attack
    }

    set sustain(value) {
      this._sustain = value
    }

    get sustain() {
      return this._sustain
    }

    set decay(value) {
      this._decay = value
    }

    get decay() {
      return this._decay
    }

    set release(value) {
      this._release = value
    }

    get release() {
      return this._release
    }
}

export { Envelope }
