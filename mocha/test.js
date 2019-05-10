const assert = require('assert');
const Subtractor = require('../src/Subtractor').default;
const { Osc } = require('../src/Osc')

let s = setTimeout;

describe('Subtractor', () => {
    it('can play a note', (done) => {
      const subtractor = new Subtractor();
      s(() => subtractor.noteOn(65), 100);
      s(() => subtractor.noteOff(65), 200);
      s(done, 300);
    });

    it('can play multiple notes', (done) => {
      const subtractor = new Subtractor();
      s(() => subtractor.noteOn(65), 100);
      s(() => subtractor.noteOn(68), 200);
      s(() => subtractor.noteOn(71), 300);
      s(() => subtractor.noteOff(65), 400);
      s(() => subtractor.noteOff(68), 400);
      s(() => subtractor.noteOff(71), 400);
      s(done, 400);
    });
});

describe('Osc', () => {
  it('can change the detune in real time', (done) => {
    let range = [...new Array(100).fill()];

    const ac = new AudioContext();
    const osc = new Osc(ac, {
      voices: 4,
      waveform: 3,
    });
    osc.output.connect(ac.destination);
    osc.start(48);

    for (let i in range) {
      setTimeout(() => {
        osc.detune = i;

        if (i == range.length - 1) {
          setTimeout(() => {
          osc.stop();
          done();
        }, i * 100)
        }
      }, i * 100)
    }
  });

  it('can change the octave in real time', (done) => {
    let range = [...new Array(8).fill()];

    const ac = new AudioContext();
    const osc = new Osc(ac, {
      octave: 8
    });
    osc.output.connect(ac.destination);
    osc.start(0);

    for (let i in range) {
      setTimeout(() => {
        osc.octave -= 1;

        if (i == range.length - 1) {
          setTimeout(() => {
          osc.stop();
          done();
        }, i * 500)
        }
      }, i * 500)
    }
  })

  it('can change the semitone in real time', (done) => {
    let range = [...new Array(24).fill()];

    const ac = new AudioContext();
    const osc = new Osc(ac, {
      octave: 4,
      semi: -12
    });
    osc.output.connect(ac.destination);
    osc.start(0);

    for (let i in range) {
      setTimeout(() => {
        osc.semi += 1;

        if (i == range.length - 1) {
                    setTimeout(() => {
          osc.stop();
          done();
        }, i * 250)
        }
      }, i * 250)
    }
  })

  it('can change the waveform in real time', (done) => {
    let range = [...new Array(4).fill()];

    const ac = new AudioContext();
    const osc = new Osc(ac, {
      octave: 4,
      waveform: 1,
    });
    osc.output.connect(ac.destination);
    osc.start(0);

    for (let i in range) {
      setTimeout(() => {
        osc.waveform += 1;

        if (i == range.length - 1) {
          setTimeout(() => {
            osc.stop();
            done();
          }, i * 1000)
        }
      }, i * 1000)
    }
  })
})
