import { keyboardKeys } from '../utils/keyboard'
import styles from '../sass/keyboard.scss';

class Keyboard extends HTMLElement {
  connectedCallback() {
    // if observable and bind attributes are preset, register this element as an observer
    this.observable = eval(this.getAttribute('observe'))
    this.bind = this.getAttribute('bind')

    if (this.observable && this.bind) {
      this.observable.registerObserver(this)
    }

    this.id = this.getAttribute('id')
    this.name = this.getAttribute('name')
    
    this.template = `
      <svg id="keyboard" class="keyboard" viewBox="0, 0, 44, 12" >
        <rect id="key-0" x="0" width="4" height="10" class="keyboard__white_key" />
        <rect id="key-2" x="4" width="4" height="10" class="keyboard__white_key" />
        <rect id="key-4" x="8" width="4" height="10" class="keyboard__white_key" />

        <rect id="key-1" x="3" width="2" height="6" class="keyboard__black_key" />
        <rect id="key-3" x="7" width="2" height="6" class="keyboard__black_key" />

        <rect id="key-5" x="12" width="4" height="10" class="keyboard__white_key" />
        <rect id="key-7" x="16" width="4" height="10" class="keyboard__white_key" />
        <rect id="key-9" x="20" width="4" height="10" class="keyboard__white_key" />
        <rect id="key-11" x="24" width="4" height="10" class="keyboard__white_key" />

        <rect id="key-6" x="15" width="2" height="6" class="keyboard__black_key" />
        <rect id="key-8" x="19" width="2" height="6" class="keyboard__black_key" />
        <rect id="key-10" x="23" width="2" height="6" class="keyboard__black_key" />

        <rect id="key-12" x="28" width="4" height="10" class="keyboard__white_key" />
        <rect id="key-14" x="32" width="4" height="10" class="keyboard__white_key" />
        <rect id="key-16" x="36" width="4" height="10" class="keyboard__white_key" />

        <rect id="key-13" x="31" width="2" height="6" class="keyboard__black_key" />
        <rect id="key-15" x="35" width="2" height="6" class="keyboard__black_key" />

        <rect id="key-17" x="40" width="4" height="10" class="keyboard__white_key" />

        <rect id="octave" y="11" width="8" height="1" class="keyboard__octave_indicator" />        
      </svg>
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

    this.keys = [...new Array(keyboardKeys.size)]
      .map((_,i) => this.shadow.getElementById(`key-${i}`))
    this.octaveIndicator = this.shadow.getElementById('octave')

    this.handleInput()
  }

  handleInput() {
    let keyWasPressed = []
    let noteWasPressed = []
    
    this.keys.forEach((key) => {
      key.addEventListener('mousedown', (eMouseDown) => {
        const note = parseInt(eMouseDown.target.id.replace('key-', ''))
        if (note >= 0 && !noteWasPressed[note]) {
          this.keys[note].classList.add('keyboard__pressed');

          const n = note + this.observable.octave * 12;

          const releaseThisKey = () => {
            this.keys[note].classList.remove('keyboard__pressed')
            this.observable.noteOff(n);
            window.removeEventListener('mouseup', releaseThisKey)
            noteWasPressed[note] = false
          }
          window.addEventListener('mouseup', releaseThisKey)
          noteWasPressed[note] = true
        }
      })
    })
    
    window.addEventListener('keydown', (eKeyDown) => {
      const key = eKeyDown.key.toLowerCase()
      const note = keyboardKeys.get(key)
      if (note >= 0 && !noteWasPressed[note]) {
        this.keys[note].classList.add('keyboard__pressed')
        const n = note + this.observable.octave * 12;

        this.observable.noteOn(n)

        const unPressThisKey = (eNoteKeyUp) => {
          if (note === keyboardKeys.get(eNoteKeyUp.key.toLowerCase())) {
            this.keys[note].classList.remove('keyboard__pressed')
            this.observable.noteOff(n);
            window.removeEventListener('keyup', unPressThisKey)
          }
        }
        window.addEventListener('keyup', unPressThisKey)
      }

      if (key == 'z' && this.observable.octave > 0) {
        this.observable.octave--
      }
      if (key == 'x' && this.observable.octave < 12) {
        this.observable.octave++
      }

      noteWasPressed[note] = true
      keyWasPressed[key] = true
    })

    window.addEventListener('keyup', (eKeyUp) => {
      const key = eKeyUp.key.toLowerCase()
      const note = keyboardKeys.get(key)
      noteWasPressed[note] = false
      keyWasPressed[key] = false
    })
  }

  notify(observable) {
    this.setOctaveIndicator(observable.octave)
  }

  setOctaveIndicator() {
    // this should be calculated better
    this.octaveIndicator.setAttribute('x', this.observable.octave * 3)
  }

}

window.customElements.define('x-keyboard', Keyboard)
