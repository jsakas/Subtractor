
// take a note (keyboard key) and return the frequency
//
const getNoteFreq = function(note) {
  // http://subsynth.sourceforge.net/midinote2freq.html
  const tune = 440
  return (tune / 32) * Math.pow(2, ((note - 9) / 12))
}

// take a range and a percent value, return a point on the range
//
const percentToPoint = function(min, max, percent) {
  const range = max - min
  const shift = range * percent
  const point = shift + min

  return isNaN(point) 
    ? 0 
    : point
}

// take a range and a point, return the percentage on the range
//
const pointToPercent = function(min, max, point) {
  const range = max - min
  const shift = point - min
  const percent = shift / range

  return isNaN(percent) 
    ? 0 
    : percent
}

// take a value from 0 to 127 and convert it to seconds, good for envelopes
//
const knobToSeconds = function(value) {
  return value * (10 / 127)
}

export { getNoteFreq, percentToPoint, pointToPercent, knobToSeconds }
