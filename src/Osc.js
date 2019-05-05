import { shiftNote, getNoteFreq, getDetuneSpread } from './utils/maths';
import { intToWaveform, waveformToInt } from './utils/helpers';
import { Observable } from './Observe';

class Osc extends Observable {
    constructor(audioContext, options = {}) {
      super();
      this.audioContext = audioContext;
      this._enabled = options.enabled || 0;
      this._waveform = intToWaveform(options.waveform) || 'sine';
      this._octave = options.octave || 0;
      this._semi = options.semi || 0;
      this._detune = options.detune || 0;
      this._voices = options.voices || 1;
      this._oscs = [];
    }

    start(note) {
      const shifted = shiftNote(note, this.octave, this.semi);
      const freq = getNoteFreq(shifted);
      const detuneSpread = getDetuneSpread(this.voices, this.detune);
      this._oscs = detuneSpread.map(detune => this.startOscillator(freq, detune));
      return this._oscs;
    }

    move(note, time = 0) {
      const shifted = shiftNote(note, this.octave, this.semi);
      const freq = getNoteFreq(shifted);

      this._oscs.forEach((osc, i) => {
        osc.frequency.linearRampToValueAtTime(
          freq,
          time
        );
      });
    }

    startOscillator(freq, detune) {
      const osc = this.audioContext.createOscillator();
      osc.type = this._waveform;
      osc.frequency.value = freq;
      osc.detune.value = detune;
      return osc;
    }

    set enabled(value) {
      this._enabled = Number(value);
      this.notifyObservers();
    }

    get enabled() {
      return this._enabled;
    }

    set waveform(value) {
      this._waveform = intToWaveform(Number(value).toFixed());

      this.notifyObservers();
    }

    get waveform() {
      return waveformToInt(this._waveform);
    }

    set octave(value) {
      this._octave = Number(Number(value).toFixed());
      this.notifyObservers();
    }

    get octave() {
      return this._octave;
    }

    set semi(value) {
      this._semi = Number(Number(value).toFixed());
      this.notifyObservers();
    }

    get semi() {
      return this._semi;
    }

    set detune(value) {
      this._detune = Number(value);
      this.notifyObservers();
    }

    get detune() {
      return this._detune;
    }

    set voices(value) {
      this._voices = Number(Number(value).toFixed());
    }

    get voices() {
      return this._voices;
    }

    get oscs() {
      return this._oscs;
    }
}

export { Osc };
