import { intToFilter, filterToInt } from './utils/helpers'
import { Observable } from './Observe'

class Filter extends Observable {
    constructor(context) {
      super()
      this.context = context
      this.filter = context.createBiquadFilter()
      this.freq = 22050
      this.type = 'lowpass'
    }

    set type(value) {
      if (typeof value == 'string') {
        this.filter.type = value
      } else if (typeof value == 'number') {
        this.filter.type = intToFilter(value)
      }
      this.notifyObservers()
    }

    get type() {
      return filterToInt(this.filter.type)
    }

    get frType() {
      return this.filter.type
    }

    set freq(value) {
      this.filter.frequency.value = value
      this.notifyObservers()
    }

    get freq() {
      return this.filter.frequency.value
    }

    set q(value) {
      this.filter.Q.value = value
      this.notifyObservers()
    }

    get q() {
      return this.filter.Q.value
    }

    set gain(value) {
      this.filter.gain.value = value
      this.notifyObservers()
    }

    get gain() {
      return this.filter.gain.value
    }
}

export { Filter }
