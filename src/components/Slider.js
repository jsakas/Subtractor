class Slider extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' })

    this.id = this.getAttribute('id')
    this.name = this.getAttribute('name')
    this.min = this.getAttribute('min')
    this.max = this.getAttribute('max')
    this.value = this.getAttribute('value')
    this.oninput = new Function('value', this.getAttribute('oninput'))

    this.div = document.createElement('div')

    this.label = document.createElement('label')
    this.label.for = this.id
    this.label.innerText = this.name

    this.range = document.createElement('input')
    this.range.type = 'range'
    this.range.id = this.id
    this.range.min = this.min
    this.range.max = this.max
    this.range.value = this.value
    this.range.addEventListener('input', (e) => { 
      this.setAttribute('value', e.target.value)
      this.value = e.target.value
      this.oninput(this.value)
    })

    this.span = document.createElement('span')
    this.span.innerText = this.value

    this.div.appendChild(this.label)
    this.div.appendChild(this.range)
    this.div.appendChild(this.span)
    shadow.appendChild(this.div)
  }

  static get observedAttributes() {
    return [
      'id',
      'name',
      'min',
      'max',
      'value'
    ]
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr == 'value' && this.span) {
      this.span.innerText = newValue
    }
  }

}

window.customElements.define('x-slider', Slider)
