class Slider extends HTMLElement {
  constructor() {
    super()

    var shadow = this.attachShadow({mode: 'open'})

    var span = document.createElement('span')
    span.innerText = "I'm a slider!"

    shadow.appendChild(span)
  }  
}

window.customElements.define('x-slider', Slider)
