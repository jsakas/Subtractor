import { Osc } from './Osc'
import { Filter } from './Filter'

class Subtractor {
  constructor() {
    console.log('Subtractor constructed')
    this.context = new AudioContext()

    this.octave = 5   // floats work for this which is cool
    this.polyphony = 1  // integer between 1 and 10
    this.detune = 0     // float, between 0 and 1 is a half-step
    this.waveform = 'sawtooth'

    this.handleKeys()
    this.setupControls()

    this.filter1 = new Filter(this.context, 1, 22050, 0)

    this.updateUI()
  }

  // route an oscillator thru the pipeline of modifiers.
  // e.g. gains, filter, distortions etc.
  pipeline(osc) {
    osc.connect(this.filter1.filter)
    this.filter1.filter.connect(this.context.destination);
  }

  intToWaveform(i) {
    switch(i) {
      case 1:
        return 'sine'
      case 2:
        return 'square'
      case 3:
        return 'sawtooth'
      case 4:
        return 'triangle'
      default:
        return 'sine'
    }
  }

  updateUI() {
    const waveform = document.getElementById('waveform-value')
    const polyphony = document.getElementById('polyphony-value')
    const detune = document.getElementById('detune-value')
    const filterType = document.getElementById('filter-type-value')
    const filterFreq = document.getElementById('filter-freq-value')
    const filterGain = document.getElementById('filter-gain-value')
    const filterQ = document.getElementById('filter-q-value')

    polyphony.innerText = this.polyphony
    detune.innerText = this.detune
    waveform.innerText = this.waveform
    filterType.innerText = this.filter1.getType()
    filterFreq.innerText = this.filter1.getFreq()
    filterGain.innerText = this.filter1.getGain()
    filterQ.innerText = this.filter1.getQ()
  }

  setupControls() {
    const waveform = document.getElementById('waveform')
    const polyphony = document.getElementById('polyphony')
    const detune = document.getElementById('detune')
    const filterType = document.getElementById('filterType')
    const filterFreq = document.getElementById('filterFreq')
    const filterGain = document.getElementById('filterGain')
    const filterQ = document.getElementById('filterQ')

    waveform.addEventListener('change', (e) => {
      this.waveform = this.intToWaveform(parseInt(e.target.value))
      this.updateUI()
    })

    polyphony.addEventListener('change', (e) => {
      this.polyphony = parseInt(e.target.value)
      this.updateUI()
    })

    detune.addEventListener('change', (e) => {
      this.detune = e.target.value / 100
      this.updateUI()
    })

    filterType.addEventListener('change', (e) => {
      this.filter1.setType(e.target.value)
      this.updateUI()
    })

    filterFreq.addEventListener('change', (e) => {
      this.filter1.setFreq(e.target.value)
      this.updateUI()
    })

    filterGain.addEventListener('change', (e) => {
      this.filter1.setGain(e.target.value)
      this.updateUI()
    })

    filterQ.addEventListener('change', (e) => {
      this.filter1.setQ(e.target.value)
      this.updateUI()
    })
  }

  handleKeys() {
    let keyWasPressed = []
    window.addEventListener('keydown', (eKeyDown) => {
      const octaveKeys = new Map([
        ['a', 0],
        ['w', 1],
        ['s', 2],
        ['e', 3],
        ['d', 4],
        ['f', 5],
        ['t', 6],
        ['g', 7],
        ['y', 8],
        ['h', 9],
        ['u', 10],
        ['j', 11],
        ['k', 12]
      ])
      if (octaveKeys.has(eKeyDown.key) && !keyWasPressed[eKeyDown.key]) {
        const note = octaveKeys.get(eKeyDown.key) + (this.octave * 12)
        const polyNoteOscillators = this.startPolyNote(note)

        // on note-keyup, stop the oscillators
        const stopThisPolyNote = function(eNoteKeyUp) {
          if (eKeyDown.key === eNoteKeyUp.key) {
            polyNoteOscillators.forEach(osc => osc.stop())
            window.removeEventListener('keyup', stopThisPolyNote)
          }
        }
        window.addEventListener('keyup', stopThisPolyNote)
      }

      if (eKeyDown.key == 'z' && this.octave > 0) {
        this.octave--;
      }
      if (eKeyDown.key == 'x' && this.octave < 12) {
        this.octave++;
      }

      keyWasPressed[eKeyDown.key] = true
    })
    window.addEventListener('keyup', (eKeyUp) => {
      keyWasPressed[eKeyUp.key] = false
    })
  }

  startPolyNote(note) {
    // number of intervals on the upper side of the root note
    const numIntervals = Math.floor(this.polyphony / 2)
    // width of interval based on the detune and polyphony measured in notes
    const interval = numIntervals == 0
      ? 0
      : this.detune / numIntervals
      // ternary gaurds interval being Infinity

    // create n=polyphony oscillators
    return Array(this.polyphony).fill()
      .map((_,i) => note + (numIntervals - i) * interval)
      .reverse()
      .map(this.getNoteFreq)
      .map(this.startFreqOscillator.bind(this))
  }
  
  startFreqOscillator(freq) {
    const oscillator = this.context.createOscillator()
    oscillator.type = this.waveform
    oscillator.frequency.value = freq
    this.pipeline(oscillator)
    oscillator.start()
    return oscillator
  }

  getNoteFreq(note) {
    // http://subsynth.sourceforge.net/midinote2freq.html
    const tune = 440
    return (tune / 32) * Math.pow(2, ((note - 9) / 12))
  }
}

window.Subtractor = Subtractor
