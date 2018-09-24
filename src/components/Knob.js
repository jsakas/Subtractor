import { percentToPoint, pointToPercent } from '../utils/maths';
import styles from '../sass/knob.scss';

class Knob extends HTMLElement {
  connectedCallback() {
    // if observable and bind attributes are preset, register this element as an observer
    this.observable = eval(this.getAttribute('observe'));
    this.bind = this.getAttribute('bind');
    this.label = this.getAttribute('label');

    if (this.observable && this.bind) {
      this.observable.registerObserver(this);
    }

    this.id = this.getAttribute('id');
    this.name = this.getAttribute('name');
    this.min = this.getAttribute('min');
    this.max = this.getAttribute('max');
    this.value = this.getAttribute('value');
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
    `;

    // create shadow dom
    this.shadow = this.attachShadow({ 'mode': 'open' });
    
    // create style sheet node
    this.stylesheet = document.createElement('style');
    this.stylesheet.type = 'text/css';
    this.stylesheet.textContent = styles.toString();

    // create dom nodes from template
    this.templateDOM = document.createRange().createContextualFragment(this.template);

    // inject nodes into shadow dom
    this.shadow.appendChild(this.stylesheet);
    this.shadow.appendChild(this.templateDOM);
    // ^^ DOM is now constructed

    this.knob = this.shadow.getElementById('knob');
    this.knobControl = this.shadow.getElementById('knob__control');
    this.knobKnob = this.shadow.getElementById('knob__knob');
    this.knobInput = this.shadow.getElementById('knob__input');
    this.knobValue = this.shadow.getElementById('knob__value');

    this.knobRect = this.knobKnob.getBoundingClientRect();

    this.setupEvents();
  }

  setupEvents() {
    this.knobKnob.addEventListener('mousedown', (e) => {
      this.knobInput.dispatchEvent(new Event('focus'));
      this.knobKnob.style.transition = 'none';
      const currentValue = parseInt(this.knobInput.value);
      const boundMousemove = this.mousemove.bind(e, this, e.clientX, e.clientY, currentValue);
      document.addEventListener('mousemove', boundMousemove);
      document.addEventListener('mouseup', () => {
        this.knobKnob.style.transition = '';
        document.removeEventListener('mousemove', boundMousemove);
      });
    });

    this.knobInput.addEventListener('input', (e) => {
      const inputValue = parseInt(e.target.value);
      this.setRotation(inputValue);
      this.knobValue.innerText = this.observable[this.label] || parseInt(inputValue);
      this.observable[this.bind] = parseInt(inputValue);
    });
  }

  notify() {
    this.knobInput.value = this.observable[this.bind];
    this.knobValue.innerText = this.observable[this.label] || parseInt(this.observable[this.bind]);
    this.setRotation(this.observable[this.bind]);
  }

  setRotation(inputValue) {
    const inputMax = parseInt(this.knobInput.max);
    const inputMin = parseInt(this.knobInput.min);

    const percent = pointToPercent(inputMin, inputMax, inputValue);
    const degree = percentToPoint(-150, 150, percent);

    this.knobKnob.style.transform = `rotateZ(${parseInt(degree)}deg)`;
  }

  mousemove (_this, x, y, oldValue, e) {
    const yDiff = (e.clientY - parseInt(y));
    const range = _this.max - _this.min;
    const changeInterval = range / 100;

    let newValue = oldValue - (changeInterval * yDiff);
    if (newValue > _this.max) { 
      newValue = _this.max; 
    }
    if (newValue < _this.min) { 
      newValue = _this.min; 
    }

    _this.knobInput.value = newValue;
    _this.knobInput.dispatchEvent(new Event('input'));
  }
}

window.customElements.define('x-knob', Knob);
