
const intToWaveform = function (i) {
  return ['sine','square','sawtooth','triangle'][i - 1] || 'sine'
}

const waveformToInt = function (w) {
  return ['sine','square','sawtooth','triangle'].indexOf(w) + 1
}

export { intToWaveform, waveformToInt }
