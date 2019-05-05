// take a note, octave, and semi and shift it
export const shiftNote = function(note, octave = 0, semi = 0) {
  return note + (octave * 12) + semi;
};

// take a note (keyboard key) and return the frequency
//
export const getNoteFreq = function(note) {
  // http://subsynth.sourceforge.net/midinote2freq.html
  const tune = 440;
  return (tune / 32) * Math.pow(2, ((note - 9) / 12));
};

// take voices and detune value and return an array of detune values
//
export const getDetuneSpread = function(voices, detune) {
  if (voices === 1) {
    return [detune];
  }

  let detuneInterval = (detune * 2) / (voices - 1);
  let current = detune;

  return [...new Array(voices)].map(() => {
    let d = current;
    current -= detuneInterval;
    return d;
  });
};

// take a frequency, poly, and detune value and return an array of frequencies
//
export const getFrequencySpread = function(freq, poly = 1, detune = 0) {
  const numIntervals = Math.floor(poly / 2);
  
  return Array(poly).fill()
    .map((_, i) => freq + (numIntervals - i) * detune)
    .reverse();
};

// take a range and a percent value, return a point on the range
//
export const percentToPoint = function(min, max, percent) {
  const range = max - min;
  const shift = range * percent;
  const point = shift + min;

  return isNaN(point) 
    ? 0 
    : point;
};

// take a range and a point, return the percentage on the range
//
export const pointToPercent = function(min, max, point) {
  const range = max - min;
  const shift = point - min;
  const percent = shift / range;

  return isNaN(percent) 
    ? 0 
    : percent;
};

export const knobToSeconds = function(value) {
  return Math.pow(value, 2) / 1000;
};

export const knobToFreq = function(value) {
  return Number(Math.pow(value, 2).toFixed());
};

export const freqToKnob = function(value) {
  return Math.sqrt(value);
};

