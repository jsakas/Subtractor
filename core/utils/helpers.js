export const whole = n => Number(Number(n).toFixed());

export const intToWaveform = function(i) {
  return ['sine', 'square', 'sawtooth', 'triangle'][whole(i) - 1] || 'sine';
};

export const waveformToInt = function(w) {
  return ['sine', 'square', 'sawtooth', 'triangle'].indexOf(w) + 1;
};

export const intToFilter = function(i) {
  return [
    'lowpass',
    'highpass',
    'bandpass',
    'lowshelf',
    'highshelf',
    'peaking',
    'notch',
    'allpass'
  ][whole(i).toFixed() - 1] || 'lowpass';
};

export const filterToInt = function(f) {
  return [
    'lowpass',
    'highpass',
    'bandpass',
    'lowshelf',
    'highshelf',
    'peaking',
    'notch',
    'allpass'
  ].indexOf(f) + 1;
};

export const renameObjectKey = (obj, oldKey, newKey) => {
  obj[newKey] = obj[oldKey];
  delete obj[oldKey];
  return obj;
};
