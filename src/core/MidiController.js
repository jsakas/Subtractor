const parseMIDIMessage = message => ({
  command: message.data[0],
  note: message.data[1],
  velocity: message.data[2] / 127
});

const initMidiController = (subtractor) => {
  if (!navigator || typeof navigator.requestMIDIAccess !== 'function') {
    console.warn('navigator.requestMIDIAccess is not supported in this browser.');
    return;
  }

  const handleMIDIStateChange = (e) => {
    // print information about the (dis)connected MIDI controller
    console.warn(e.port.name, e.port.manufacturer, e.port.state);
  };

  const handleMIDIMessage = (message) => {
    const m = parseMIDIMessage(message);
    switch (m.command) {
      case 144:
        subtractor.noteOn(m.note, m.velocity);
        break;
      case 128:
        subtractor.noteOff(m.note, m.velocity);
        break;
      default:
        break;
    }
  };

  navigator.requestMIDIAccess({ sysex: true })
    .then((midi) => {
      midi.onstatechange = handleMIDIStateChange;

      let inputs = midi.inputs.values();
      for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
        input.value.onmidimessage = handleMIDIMessage;
      }
    })
    .catch((e) => {
      console.warn('Failed to initialize MIDI Controller.', e);
    });
};

export default initMidiController;