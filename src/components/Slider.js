class Slider extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' })

    this.name = this.getAttribute('name')
    this.min = this.getAttribute('min')
    this.max = this.getAttribute('max')
    this.value = this.getAttribute('value')
    this.fn = new Function(this.getAttribute('fn'))

    const range = document.createElement('input')
    range.type = 'range'
    range.min = this.min
    range.max = this.max
    range.value = this.value

    range.addEventListener('input', (e) => { 
      this.value = e.target.value
      this.fn()
    })
    shadow.appendChild(range)
  }
}

window.customElements.define('x-slider', Slider)
