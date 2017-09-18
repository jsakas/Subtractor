import { Filter } from './Filter'

class Subtractor {
  constructor() {
    console.log('Subtractor constructed')

    const presets = {
      'full': [
        4.5,
        'sawtooth', 5, .2,
        'lowpass', 1000, 5, 0,
        'triangle', 4,
      ],
      'harmonic': [
        5.1,
        'sawtooth', 3, 2,
        'lowpass', 1000, 5, 0,
        'triangle', 1,
      ],
      'simple': [
        5,
        'sawtooth', 1, 0,
        'lowpass', 1200, 5, 0,
        'sine', 0,
      ],
    }
    this.selectedPreset = presets.full

    this.octave    = this.selectedPreset[0]
    
    this.waveform  = this.selectedPreset[1]
    this.polyphony = this.selectedPreset[2]
    this.detune    = this.selectedPreset[3]

    this.context = new AudioContext()
    this.amplifier = this.context.createGain()
    this.filter1 = new Filter(this.context)
    this.lfo = this.context.createOscillator()
    this.lfoAmp = this.context.createGain()

    this.filter1.filter.type = this.selectedPreset[4]
    this.filter1.filter.frequency.value = this.selectedPreset[5]
    this.filter1.filter.Q.value = this.selectedPreset[6]
    this.filter1.filter.gain.value = this.selectedPreset[7]

    this.lfo.type = this.selectedPreset[8]
    this.lfo.frequency.value = this.selectedPreset[9]

    this.amplifier.connect(this.context.destination)
    this.filter1.filter.connect(this.amplifier)
    this.lfo.connect(this.lfoAmp)
    this.lfoAmp.connect(this.amplifier.gain)

    this.lfo.start()

    
    this.handleKeys()
    this.setupControls()

    this.updateUI()
  }

  // route an oscillator thru the pipeline of modifiers.
  // e.g. gains, filter, distortions etc.
  pipeline(osc) {
    osc.connect(this.filter1.filter)
  }
  
  intToWaveform(i) {
    return ['sine','square','sawtooth','triangle'][i - 1] || 'sine'
  }

  waveformToInt(w) {
    return ['sine','square','sawtooth','triangle'].indexOf(w) + 1
  }

  updateUI() {
    const l_octave = document.getElementById('octave-value')    
    const l_waveform = document.getElementById('waveform-value')
    const l_polyphony = document.getElementById('polyphony-value')
    const l_detune = document.getElementById('detune-value')
    const l_filterType = document.getElementById('filter-type-value')
    const l_filterFreq = document.getElementById('filter-freq-value')
    const l_filterGain = document.getElementById('filter-gain-value')
    const l_filterQ = document.getElementById('filter-q-value')
    const l_lfoType = document.getElementById('lfo-type-value')
    const l_lfoFreq = document.getElementById('lfo-freq-value')
    const l_lfoAmp = document.getElementById('lfo-amp-value')

    const s_octave = document.getElementById('octave')    
    const s_waveform = document.getElementById('waveform')
    const s_polyphony = document.getElementById('polyphony')
    const s_detune = document.getElementById('detune')
    const s_filterType = document.getElementById('filterType')
    const s_filterFreq = document.getElementById('filterFreq')
    const s_filterGain = document.getElementById('filterGain')
    const s_filterQ = document.getElementById('filterQ')
    const s_lfoType = document.getElementById('lfoType')
    const s_lfoFreq = document.getElementById('lfoFreq')
    const s_lfoAmp = document.getElementById('lfoAmp')
    
    l_octave.innerText = this.octave    
    l_polyphony.innerText = this.polyphony
    l_detune.innerText = this.detune
    l_waveform.innerText = this.waveform
    l_filterType.innerText = this.filter1.getType()
    l_filterFreq.innerText = this.filter1.getFreq()
    l_filterGain.innerText = this.filter1.getGain()
    l_filterQ.innerText = this.filter1.getQ()
    l_lfoType.innerText = this.lfo.type
    l_lfoFreq.innerText = this.lfo.frequency.value
    l_lfoAmp.innerText = this.lfoAmp.gain.value
    
    s_octave.value = this.octave * 10    
    s_polyphony.value = this.polyphony
    s_detune.value = this.detune * 100 // see setupControls, divided by 100
    s_waveform.value = this.waveformToInt(this.waveform)
    s_filterType.value = this.filter1.getTypeInput()
    s_filterFreq.value = this.filter1.getFreq()
    s_filterGain.value = this.filter1.getGain()
    s_filterQ.value = this.filter1.getQInput()
    s_lfoType.value = this.waveformToInt(this.lfo.type)
    s_lfoFreq.value = this.lfo.frequency.value
    s_lfoAmp.value = this.lfoAmp.gain.value
  }

  setupControls() {
    const octave = document.getElementById('octave')
    const waveform = document.getElementById('waveform')
    const polyphony = document.getElementById('polyphony')
    const detune = document.getElementById('detune')
    const filterType = document.getElementById('filterType')
    const filterFreq = document.getElementById('filterFreq')
    const filterGain = document.getElementById('filterGain')
    const filterQ = document.getElementById('filterQ')
    const lfoType = document.getElementById('lfoType')
    const lfoFreq = document.getElementById('lfoFreq')
    const lfoAmp = document.getElementById('lfoAmp')
    
    octave.addEventListener('input', (e) => {
      this.octave = e.target.value / 10
      this.updateUI()
    })
    
    waveform.addEventListener('input', (e) => {
      this.waveform = this.intToWaveform(parseInt(e.target.value))
      this.updateUI()
    })

    polyphony.addEventListener('input', (e) => {
      this.polyphony = parseInt(e.target.value)
      this.updateUI()
    })

    detune.addEventListener('input', (e) => {
      this.detune = e.target.value / 100
      this.updateUI()
    })

    filterType.addEventListener('input', (e) => {
      this.filter1.setType(e.target.value)
      this.updateUI()
    })

    filterFreq.addEventListener('input', (e) => {
      this.filter1.setFreq(e.target.value)
      this.updateUI()
    })

    filterGain.addEventListener('input', (e) => {
      this.filter1.setGain(e.target.value)
      this.updateUI()
    })

    filterQ.addEventListener('input', (e) => {
      this.filter1.setQ(e.target.value)
      this.updateUI()
    })
    
    lfoType.addEventListener('input', (e) => {
      this.lfo.type = this.intToWaveform(parseInt(e.target.value))
      this.updateUI()
    })

    lfoFreq.addEventListener('input', (e) => {
      this.lfo.frequency.value = e.target.value
      this.updateUI()
    })

    lfoAmp.addEventListener('input', (e) => {
      this.lfoAmp.gain.value = e.target.value
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
        ['k', 12],
        ['o', 13],
        ['l', 14],
        ['p', 15],
        [';', 16],
        ['\'', 17],
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
        this.octave--
        this.updateUI()
      }
      if (eKeyDown.key == 'x' && this.octave < 12) {
        this.octave++
        this.updateUI()
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
