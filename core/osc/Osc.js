import { shiftNote, getNoteFreq, getDetuneSpread } from '../utils/maths';
import { intToWaveform, waveformToInt } from '../utils/helpers';
import { Observable } from '../observable';

const knobToStereo = (v = 0) => v / 5000;
const stereoToKnob = (v = 0) => v * 5000;

export default class Osc extends Observable {
    constructor(audioContext, {
      enabled = 0,
      waveform = 0,
      octave = 0,
      semi = 0,
      detune = 0,
      voices = 1,
      stereo = 0,
      gain = 75,
    } = {}) {
      super();
      this.audioContext = audioContext;
      this._enabled = enabled;
      this._waveform = intToWaveform(waveform);
      this._octave = octave;
      this._semi = semi;
      this._detune = detune;
      this._voices = voices;
      this._stereo = knobToStereo(stereo);
      this._gain = gain;
      
      this._oscs = [];

      this.splitter = this.audioContext.createChannelSplitter(2);
      this.merger = this.audioContext.createChannelMerger(2);
      
      this.delay = this.audioContext.createDelay();
      this.delay.delayTime.setValueAtTime(this._stereo, this.audioContext.currentTime);

      this.gainNode = this.audioContext.createGain();
      this.gainNode.gain.setValueAtTime(this._gain / 100, this.audioContext.currentTime);

      this.output = this.gainNode;
    }

    start(note) {
      const shifted = shiftNote(note, this.octave, this.semi);
      const freq = getNoteFreq(shifted);
      const detuneSpread = getDetuneSpread(this.voices, this.detune);
      this._oscs = detuneSpread.map(detune => this.startOscillator(freq, detune));
      return this;
    }

    stop(time) {
      this._oscs.forEach(osc => osc.stop(time || this.audioContext.currentTime));
      return this;
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
      return this;
    }

    startOscillator(freq, detune) {
      const osc = this.audioContext.createOscillator();
      osc.type = this._waveform;
      osc.frequency.value = freq;
      osc.detune.value = detune;

      osc.connect(this.splitter);
      this.splitter.connect(this.delay, 0);
      this.splitter.connect(this.merger, 0);
      this.delay.connect(this.merger, 0, 1);
      this.merger.connect(this.gainNode);

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

    set gain (value) {
      this._gain = value;
      this.gainNode.gain.value = this._gain / 100;
    }

    get gain () {
      return this._gain;
    }

    get oscs() {
      return this._oscs;
    }
}
