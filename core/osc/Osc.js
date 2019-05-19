import { shiftNote, getNoteFreq, getDetuneSpread, changeFreqBySemitones } from '../utils/maths';
import { intToWaveform, waveformToInt, whole } from '../utils/helpers';
import { Observable } from '../observable';

const knobToStereo = (v = 0) => v / 5000;
const stereoToKnob = (v = 0) => v * 5000;

export default class Osc extends Observable {
    constructor(audioContext, osc = {}) {
      super();

      if (osc instanceof Osc) {
        osc.registerObserver(this);
      }

      this.audioContext = audioContext;
      this._enabled = Boolean(osc.enabled);
      this._waveform = intToWaveform(osc.waveform || 0);
      this._octave = osc.octave || 0;
      this._semi = osc.semi || 0;
      this._detune = osc.detune || 0;
      this._voices = osc.voices || 0;
      this._stereo = knobToStereo(osc.stereo || 0);
      this._gain = osc.gain || 0;

      this._note = null;
      
      this._oscs = [];

      this.splitter = this.audioContext.createChannelSplitter(2);
      this.merger = this.audioContext.createChannelMerger(2);
      
      this.delay = this.audioContext.createDelay();
      this.delay.delayTime.setValueAtTime(this._stereo, this.audioContext.currentTime);

      this.gainNode = this.audioContext.createGain();
      this.gainNode.gain.setValueAtTime(this._gain / 100, this.audioContext.currentTime);

      this.output = this.gainNode;
    }

    notify(osc) {
      this.enabled = osc.enabled;
      this.waveform = osc.waveform;
      this.octave = osc.octave;
      this.semi = osc.semi;
      this.detune = osc.detune;
      this.voices = osc.voices;
      this.stereo = osc.stereo;
      this.gain = osc.gain;
    }

    start(note) {
      if (!this.enabled) {
        return this;
      }

      const shifted = shiftNote(note, this.octave, this.semi);
      const freq = getNoteFreq(shifted);
      const detuneSpread = getDetuneSpread(this.voices, this.detune);
      this._note = note;
      this._oscs = detuneSpread.map(detune => this.createOscillator(freq, detune));
      return this;
    }

    stop(time) {
      this._oscs.forEach((osc) => {
        osc.stop(time || this.audioContext.currentTime);
      });
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

    createOscillator(freq, detune) {
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

      this.oscs.forEach((osc, i) => {
        osc.type = this._waveform;
      });

      this.notifyObservers();
    }

    get waveform() {
      return waveformToInt(this._waveform);
    }

    set octave(v) {
      let value = whole(v);
      let change = (value - this.octave) * 12;
      this._octave = value;
      this.oscs.forEach((osc, i) => {
        let freq = osc.frequency.value;
        let updated = changeFreqBySemitones(freq, change);
        osc.frequency.value = updated;
      });
      this.notifyObservers();
    }

    get octave() {
      return this._octave;
    }

    set semi(v) {
      let value = whole(v);
      let change = (value - this.semi);
      this._semi = value;
      this.oscs.forEach((osc, i) => {
        let freq = osc.frequency.value;
        let updated = changeFreqBySemitones(freq, change);
        osc.frequency.value = updated;
      });
      this.notifyObservers();
    }

    get semi() {
      return this._semi;
    }

    set detune(v) {
      this._detune = Number(v);
      const detuneSpread = getDetuneSpread(this.voices, this.detune);
      this.oscs.forEach((osc, i) => {
        try {
          osc.detune.value = detuneSpread[i];
        } catch (e) {
          console.warn('Failed to set detune value ', detuneSpread[i], e);
        }
      });

      this.notifyObservers();
    }

    get detune() {
      return this._detune;
    }

    set voices(value) {
      let current = this._voices;
      this._voices = whole(value);
      
      if (this.oscs.length && current !== this.voices) {
        this.stop();

        this.start(this._note);
      }

      this.notifyObservers();
    }

    get voices() {
      return this._voices;
    }

    set stereo (value) {
      this._stereo = knobToStereo(value);
      this.delay.delayTime.setValueAtTime(this._stereo, this.audioContext.currentTime);

      this.notifyObservers();
    }

    get stereo () {
      return stereoToKnob(this._stereo);
    }

    set gain (value) {
      this._gain = value;
      this.gainNode.gain.setValueAtTime(this._gain / 100, this.audioContext.currentTime);

      this.notifyObservers();
    }

    get gain () {
      return this._gain;
    }

    get oscs() {
      return this._oscs;
    }
}

window.Osc = Osc;
