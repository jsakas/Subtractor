import { percentToPoint, pointToPercent } from '../utils/maths'
import styles from '../sass/knob.scss';

class Knob extends HTMLElement {
  static get observedAttributes() {
    return ['id', 'name', 'min', 'max', 'value',]
  }

  connectedCallback() {
    this.id = this.getAttribute('id')
    this.name = this.getAttribute('name')
    this.min = this.getAttribute('min')
    this.max = this.getAttribute('max')
    this.value = this.getAttribute('value')
    this.oninput = new Function('value', this.getAttribute('oninput'))
    this.template = `
      <label for="knob__input" class="knob" id="knob">
        <input class="knob__input" id="knob__input" type="range" 
          min="${this.min}" max="${this.max}" value="${this.value}" 
        />
        <div class="knob__control" id="knob__control">
          <div class="knob__knob" id="knob__knob"></div>
        </div>
        <div class="knob__name" id="knob__name">${this.name}</div>
        <div class="knob__value" id="knob__value"></div>
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

    this.knob = this.shadow.getElementById('knob')
    this.knobControl = this.shadow.getElementById('knob__control')
    this.knobKnob = this.shadow.getElementById('knob__knob')
    this.knobInput = this.shadow.getElementById('knob__input')
    this.knobValue = this.shadow.getElementById('knob__value')

    this.knobRect = this.knobKnob.getBoundingClientRect()
    // this.maxTop = this.rangeRect.height - this.knobRect.height 

    this.setupEvents()

  }

  setupEvents() {
    this.knobKnob.addEventListener('mousedown', (e) => {
      this.knobInput.dispatchEvent(new Event('focus'))
      this.knobKnob.style.transition = 'none'
      const currentValue = parseInt(this.knobInput.value)
      const boundMousemove = this.mousemove.bind(e, this, e.clientX, e.clientY, currentValue)
      document.addEventListener('mousemove', boundMousemove)
      document.addEventListener('mouseup', () => {
        this.knobKnob.style.transition = ''
        document.removeEventListener('mousemove', boundMousemove)
      })
    })

    this.knobInput.addEventListener('input', (e) => {
      const inputValue = parseInt(e.target.value)
      const inputMax = parseInt(e.target.max)
      const inputMin = parseInt(e.target.min) 
      
      const percent = pointToPercent(inputMin, inputMax, inputValue)
      const degree = percentToPoint(-150, 150, percent)

      this.knobKnob.style.transform = `rotateZ(${parseInt(degree)}deg)`
      this.knobValue.innerText = inputValue

      // call the oninput function passed in as an HTML attribute
      this.oninput(parseInt(inputValue))
    })

    this.knobInput.addEventListener('change', (e) => {
      const inputValue = parseInt(e.target.value)
      this.knobValue.innerText = inputValue
    })

    // trigger input event so `top` style is set in DOM
    this.knobInput.dispatchEvent(new Event('input'))
  }

  mousemove (_this, x, y, oldValue, e) {
    const yDiff = (e.clientY - parseInt(y))
    const range = _this.max - _this.min
    const changeInterval = range / 100

    let newValue = oldValue - (changeInterval * yDiff)
    if (newValue > _this.max) { 
      newValue = _this.max 
    }
    if (newValue < _this.min) { 
      newValue = _this.min 
    }

    _this.knobInput.value = newValue
    _this.knobInput.dispatchEvent(new Event('input'))
  }
}

window.customElements.define('x-knob', Knob)
