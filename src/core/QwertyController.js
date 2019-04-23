import { keyboardKeys } from '../utils/keyboard';

const initQuertyController = (subtractor) =>  {
  let keyWasPressed = [];
  let noteWasPressed = [];

  window.addEventListener('keydown', (eKeyDown) => {
    const key = eKeyDown.key.toLowerCase();
    const note = keyboardKeys.get(key);
    if (note >= 0 && !noteWasPressed[note]) {
      const n = note + subtractor.octave * 12;

      subtractor.noteOn(n);

      const unPressThisKey = (eNoteKeyUp) => {
        if (note === keyboardKeys.get(eNoteKeyUp.key.toLowerCase())) {
          subtractor.noteOff(n);
          window.removeEventListener('keyup', unPressThisKey);
        }
      };
      window.addEventListener('keyup', unPressThisKey);
    }

    if (key == 'z' && subtractor.octave > 0) {
      subtractor.octave--;
    }
    if (key == 'x' && subtractor.octave < 12) {
      subtractor.octave++;
    }

    noteWasPressed[note] = true;
    keyWasPressed[key] = true;
  });

  window.addEventListener('keyup', (eKeyUp) => {
    const key = eKeyUp.key.toLowerCase();
    const note = keyboardKeys.get(key);
    noteWasPressed[note] = false;
    keyWasPressed[key] = false;
  });
};

export default initQuertyController;