import { shiftNote, getNoteFreq, getDetuneSpread } from './utils/maths';
import { intToWaveform, waveformToInt } from './utils/helpers';
import { Observable } from './Observe';

const knobToStereo = v => v / 5000;
const stereoToKnob = v => v * 5000;

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

      this._stereo = knobToStereo(options.stereo || 0);

      this.splitter = this.audioContext.createChannelSplitter(2);
      this.output = this.audioContext.createChannelMerger(2);
      this.delay = this.audioContext.createDelay();
      this.delay.delayTime.setValueAtTime(this._stereo, this.audioContext.currentTime);
    }

    start(note) {
      const shifted = shiftNote(note, this.octave, this.semi);
      const freq = getNoteFreq(shifted);
      const detuneSpread = getDetuneSpread(this.voices, this.detune);
      this._oscs = detuneSpread.map(detune => this.startOscillator(freq, detune));
    }

    stop(time) {
      this._oscs.forEach(osc => osc.stop(time || this.audioContext.currentTime));
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

      osc.connect(this.splitter);
      this.splitter.connect(this.delay, 0);
      this.splitter.connect(this.output, 0);
      this.delay.connect(this.output, 0, 1);

      osc.start();

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

    set stereo (value) {
      this._stereo = knobToStereo(value);
      this.delay.delayTime.setValueAtTime(this._stereo, this.audioContext.currentTime + 10);
    }

    get stereo () {
      return stereoToKnob(this._stereo);
    }

    get oscs() {
      return this._oscs;
    }
}

export { Osc };
