import { pointToPercent } from '../utils/maths'
import styles from '../sass/fader.scss';

class Fader extends HTMLElement {
  connectedCallback() {
    // if observable and bind attributes are preset, register this element as an observer
    this.observable = eval(this.getAttribute('observe'))
    this.bind = this.getAttribute('bind')
    this.label = this.getAttribute('label')

    if (this.observable && this.bind) {
      this.observable.registerObserver(this)
    }
    
    this.id = this.getAttribute('id')
    this.name = this.getAttribute('name')
    this.min = this.getAttribute('min')
    this.max = this.getAttribute('max')
    this.value = this.getAttribute('value')
    this.template = `
      <label for="fader__input" class="fader" id="fader">
        <input class="fader__input" id="fader__input" type="range" 
          min="${this.min}" max="${this.max}" value="${this.value}" 
        />
        <div class="fader__control" id="fader__control">
          <div class="fader__range" id="fader__range"></div>
          <div class="fader__knob" id="fader__knob"></div>
        </div>
        <div class="fader__name" id="fader__name">${this.name}</div>
        <div class="fader__value" id="fader__value"></div>
      </label>
    `

    // create shadow dom
    this.shadow = this.attachShadow({ 'mode': 'open' })
    
    // create style sheet node
    this.stylesheet = document.createElement('style')
    this.stylesheet.type = 'text/css'
    this.stylesheet.textContent = styles.toString()

    // create dom nodes from template
    this.templateDOM = document.createRange().createContextualFragment(this.template)

    // inject nodes into shadow dom
    this.shadow.appendChild(this.stylesheet)
    this.shadow.appendChild(this.templateDOM)
    // ^^ DOM is now constructed

    this.fader = this.shadow.getElementById('fader')
    this.faderControl = this.shadow.getElementById('fader__control')
    this.faderKnob = this.shadow.getElementById('fader__knob')
    this.faderRange = this.shadow.getElementById('fader__range')
    this.faderInput = this.shadow.getElementById('fader__input')
    this.faderValue = this.shadow.getElementById('fader__value')

    this.rangeRect = this.faderRange.getBoundingClientRect()
    this.knobRect = this.faderKnob.getBoundingClientRect()
    this.maxTop = this.rangeRect.height - this.knobRect.height 

    this.setupEvents()
  }

  setupEvents() {
    this.faderKnob.addEventListener('mousedown', (e) => {
      this.faderInput.dispatchEvent(new Event('focus'))
      this.faderKnob.style.transition = 'none'
      const currentValue = parseInt(this.faderInput.value)
      const boundMousemove = this.mousemove.bind(e, this, e.clientX, e.clientY, currentValue)
      document.addEventListener('mousemove', boundMousemove)
      document.addEventListener('mouseup', () => {
        this.faderKnob.style.transition = ''
        document.removeEventListener('mousemove', boundMousemove)
      })
    })

    this.faderInput.addEventListener('input', (e) => {
      const inputValue = parseInt(e.target.value)
      this.setTop(inputValue)
      this.faderValue.innerText = parseInt(inputValue)
      this.observable[this.bind] = parseInt(inputValue)
    })
  }

  notify(observable) {
    this.faderInput.value = this.observable[this.bind]
    this.faderValue.innerText = this.observable[this.label] || parseInt(this.observable[this.bind])
    this.setTop(this.observable[this.bind])
  }

  setTop(inputValue) {
    const inputMax = parseInt(this.faderInput.max)
    const inputMin = parseInt(this.faderInput.min) 
    
    const percent = pointToPercent(inputMin, inputMax, inputValue)
    const top = this.maxTop * (1 - percent)
    
    this.faderKnob.style.top = `${parseInt(top)}px`
  }

  mousemove (_this, x, y, oldValue, e) {
    const yDiff = (e.clientY - parseInt(y))
    const range = _this.max - _this.min
    const changeInterval = range / _this.rangeRect.height

    let newValue = oldValue - (changeInterval * yDiff)
    if (newValue > _this.max) { 
      newValue = _this.max 
    }
    if (newValue < _this.min) { 
      newValue = _this.min 
    }

    _this.faderInput.value = newValue
    _this.faderInput.dispatchEvent(new Event('input'))
  }
}

window.customElements.define('x-fader', Fader)
