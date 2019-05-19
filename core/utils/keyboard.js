export const WHITE = 'W';
export const BLACK = 'B';
export const FLAT = '&#9837;';
export const SHARP = '&#9839;';
export const WHITE_KEY_WIDTH = 4;
export const BLACK_KEY_WIDTH = 2;

export const keyboardKeys = new Map([
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
  ['\'', 17]
]);

export const keyboardOctave = [
  {
    type: WHITE,
    note: ['C']
  },
  {
    type: BLACK,
    note: [`C${SHARP}`, `D${FLAT}`]
  },
  {
    type: WHITE,
    note: ['D']
  },
  {
    type: BLACK,
    note: [`D${SHARP}`, `E${FLAT}`]
  },
  {
    type: WHITE,
    note: ['E']
  },
  {
    type: WHITE,
    note: ['F']
  },
  {
    type: BLACK,
    note: [`F${SHARP}`, `G${FLAT}`]
  },
  {
    type: WHITE,
    note: ['G']
  },
  {
    type: BLACK,
    note: [`G${SHARP}`, `A${FLAT}`]
  },
  {
    type: WHITE,
    note: ['A']
  },
  {
    type: BLACK,
    note: [`A${SHARP}`, `B${FLAT}`]
  },
  {
    type: WHITE,
    note: ['B']
  }
];

export const keyboardFactory = (numberOfOctaves) => {
  let keyboard = [];
  let count = 12;
  let currentPosition = 0;
  for (let i = 0; i < numberOfOctaves; i++) {
    keyboardOctave.forEach((key, index) => {
      let note = key.note;
      let type = key.type;
      let height, width, x, y;

      if (type === WHITE) {
        x = currentPosition;
        y = 0;
        width = WHITE_KEY_WIDTH;
        height = 20;
        currentPosition += width;
      }

      if (type === BLACK) {
        x = currentPosition - (BLACK_KEY_WIDTH / 2);
        y = 0;
        width = BLACK_KEY_WIDTH;
        height = 12;
      }

      keyboard.push({
        id: count++,
        note,
        type,
        x,
        y,
        width,
        height
      });
    });
  }
  keyboard.sort((a) => {
    if (a.type === WHITE) {
      return -1;
    }
    return 1;
  });
  return {
    keyboard,
    width: currentPosition
  };
};
