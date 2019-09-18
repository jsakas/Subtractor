const EventEmitter = require('eventemitter3');

const parseMIDIEvent = e => ({
  command: e.data[0],
  note: e.data[1],
  velocity: e.data[2] / 127
});

class MidiController extends EventEmitter {
  constructor() {
    super();

    this._inputs = [];
    this._outputs = [];

    this.getMIDIInputs = this.getMIDIInputs.bind(this);
    this.getMIDIOutputs = this.getMIDIOutputs.bind(this);
    this.configureMIDI = this.configureMIDI.bind(this);
    this.handleMIDIStateChange = this.handleMIDIStateChange.bind(this);

    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess({ sysex: true })
      .then(this.configureMIDI)
      .then(this.getMIDIInputs)
      .then(this.getMIDIOutputs)
      .then(() => this.emit('update'))
      .catch((e) => {
        console.warn('Failed to initialize MidiController.', e);
      });
    }
  }

  get inputs() {
    return this._inputs;
  }

  get outputs () {
    return this._outputs;
  }

  configureMIDI (midi) {
    midi.onstatechange = this.handleMIDIStateChange;
    return midi;
  }

  handleMIDIStateChange (e) {
    console.warn(e.port.name, e.port.manufacturer, e.port.state);
    this.getMIDIInputs(e.target);
    this.getMIDIOutputs(e.target);
    this.emit('update');
  }

  getMIDIInputs (midi) {
    this._inputs = [];
    let inputs = midi.inputs.values();
    for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
      this._inputs.push(input.value);
    }

    return midi;
  }

  getMIDIOutputs (midi) {
    this._outputs = [];
    let outputs = midi.outputs.values();
    for (let output = outputs.next(); output && !output.done; output = outputs.next()) {
      this._outputs.push(output.value);
    }

    return midi;
  }

  useInput (id) {
    this._inputs
      .forEach((input) => {
        if (input.id === id) {
          input.onmidimessage = (e) => {
            const message = parseMIDIEvent(e);
            this.handleMIDIMessage(message);
          };
        } else {
          input.onmidimessage = () => null;
        }
      });
  }

  useOutput (id) { // eslint-disable-line no-unused-vars
    // need to figure out how to properly route midi output
  }

  handleMIDIMessage (message) { // eslint-disable-line no-unused-vars
    // this should be implemented by the user on the midi controller instance
  }
}

export default MidiController;
