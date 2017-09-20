import { percentToPoint, pointToPercent } from '../utils/maths'
import styles from '../sass/slider.scss';

class Slider extends HTMLElement {
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
      <label for="slider__input" class="slider" id="slider">
        <input class="slider__input" id="slider__input" type="range" 
          min="${this.min}" max="${this.max}" value="${this.value}" 
        />
        <div class="slider__control" id="slider__control">
          <div class="slider__range" id="slider__range"></div>
          <div class="slider__knob" id="slider__knob"></div>
        </div>
        <div class="slider__name" id="slider__name">${this.name}</div>
        <div class="slider__value" id="slider__value"></div>
      </label>
    `

    // create shadow dom
    this.shadow = this.attachShadow({ 'mode': 'open', })
    
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

    this.slider = this.shadow.getElementById('slider')
    this.sliderControl = this.shadow.getElementById('slider__control')
    this.sliderKnob = this.shadow.getElementById('slider__knob')
    this.sliderRange = this.shadow.getElementById('slider__range')
    this.sliderInput = this.shadow.getElementById('slider__input')
    this.sliderValue = this.shadow.getElementById('slider__value')

    this.rangeRect = this.sliderRange.getBoundingClientRect()
    this.knobRect = this.sliderKnob.getBoundingClientRect()
    this.maxTop = this.rangeRect.height - this.knobRect.height 

    this.setupEvents()

  }

  setupEvents() {
    this.sliderKnob.addEventListener('mousedown', (e) => {
      this.sliderInput.dispatchEvent(new Event('focus'))
      const currentValue = parseInt(this.sliderInput.value)
      const currentTop = parseInt(this.sliderKnob.style.top)
      const boundMousemove = this.mousemove.bind(e, this, e.clientX, e.clientY, currentTop, currentValue)
      this.shadow.addEventListener('mousemove', boundMousemove)
      this.shadow.addEventListener('mouseup', () => {
        this.shadow.removeEventListener('mousemove', boundMousemove)
      })
    })

    this.sliderInput.addEventListener('input', (e) => {
      const inputValue = parseInt(e.target.value)
      const inputMax = parseInt(e.target.max)
      const inputMin = parseInt(e.target.min) 
      
      const percent = pointToPercent(inputMin, inputMax, inputValue)
      const top = this.maxTop * (1 - percent)
      
      this.sliderKnob.style.top = `${parseInt(top)}px`
      this.sliderValue.innerText = inputValue

      // call the oninput function passed in as an HTML attribute
      this.oninput(parseInt(inputValue))
    })

    this.sliderInput.addEventListener('change', (e) => {
      const inputValue = parseInt(e.target.value)
      this.sliderValue.innerText = inputValue
    })

    // trigger input event so `top` style is set in DOM
    this.sliderInput.dispatchEvent(new Event('input'))

  }

  calculateTop (currentTop, topMin, topMax, changeVal) {
    let newTop = currentTop + changeVal
    if (newTop < topMin) {
      newTop = topMin
    }
    if (newTop > topMax) {
      newTop = topMax
    }
    
    return newTop
  }

  mousemove (_this, x, y, oldTop, oldValue, e) {
    const yDiff = (e.clientY - parseInt(y))
    const top = _this.calculateTop(
      oldTop,
      0,
      _this.rangeRect.height - _this.knobRect.height,
      yDiff
    )

    _this.sliderKnob.style.top = `${top}px`
    
    const percentage = pointToPercent(0, _this.maxTop, top)
    const inputValue = percentToPoint(
      parseInt(_this.sliderInput.min), 
      parseInt(_this.sliderInput.max), 
      1 - percentage
    )
    _this.sliderInput.value = inputValue
    _this.sliderInput.dispatchEvent(new Event('input'))
  }
}

window.customElements.define('x-slider', Slider)
