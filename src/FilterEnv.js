import { Observable } from './Observe'


class FilterEnv extends Observable {
    constructor() {
      super()

      this._attack = 0
      this._sustain = 40
      this._decay = 0
      this._release = 40
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

export { FilterEnv }
