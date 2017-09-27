
const intToWaveform = function(i) {
  return ['sine', 'square', 'sawtooth', 'triangle'][i - 1] || 'sine'
}

const waveformToInt = function(w) {
  return ['sine', 'square', 'sawtooth', 'triangle'].indexOf(w) + 1
}

const intToFilter = function(i) {
  return [
    'lowpass',
    'highpass',
    'bandpass',
    'lowshelf',
    'highshelf',
    'peaking',
    'notch',
    'allpass'
  ][i - 1] || 'lowpass'
}

const filterToInt = function(f) {
  return [
    'lowpass',
    'highpass',
    'bandpass',
    'lowshelf',
    'highshelf',
    'peaking',
    'notch',
    'allpass'
  ].indexOf(f) + 1
}

export { intToWaveform, waveformToInt, intToFilter, filterToInt }
