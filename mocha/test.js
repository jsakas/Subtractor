const assert = require('assert');
const Subtractor = require('../src/Subtractor').default;

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
