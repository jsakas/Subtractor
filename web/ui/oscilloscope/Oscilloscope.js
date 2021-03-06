class Oscilloscope {
    constructor(audioContext, canvas) {
      this.audioContext = audioContext;
      this.analyzer = audioContext.createAnalyser();
      this.canvas = canvas;
      this.getRect();
      this.draw = this.draw.bind(this);

      window.addEventListener('resize', () => this.getRect());
    }

    draw() {
      requestAnimationFrame(this.draw);
      const canvasContext = this.canvas.getContext('2d');

      this.analyzer.getByteTimeDomainData(this.analyzerDataArray);

      canvasContext.clearRect(0, 0, this.width, this.height);
      canvasContext.lineWidth = 1;
      canvasContext.strokeStyle = '#141414';
      canvasContext.beginPath();

      let sliceWidth = Number(this.width) * 1.0 / this.analyzerBufferLength;
      let x = 0;
      for (let i = 0; i < this.analyzerBufferLength; i++) {
          let v = this.analyzerDataArray[i] / 128.0;
          let y = v * this.height / 2;
          if (i === 0) {
            canvasContext.moveTo(x, y);
          } else {
            canvasContext.lineTo(x, y);
          }
          x += sliceWidth;
        }

      canvasContext.lineTo(this.width, this.height / 2);
      canvasContext.stroke();
    }

    getRect() {
      this.canvasRect = this.canvas.getBoundingClientRect();
      this.width = this.canvasRect.width;
      this.height = this.canvasRect.height;
      this.canvas.setAttribute('width', this.width);
      this.canvas.setAttribute('height', this.height);
    }

    start() {
      this.analyzer.fftSize = 2048;
      this.analyzerBufferLength = this.analyzer.frequencyBinCount;
      this.analyzerDataArray = new Uint8Array(this.analyzerBufferLength);
      this.draw();
    }
}

const initOscilloscope = (subtractor, canvas) => {
  try {
    const oscilloscope = new Oscilloscope(
      subtractor.context, 
      canvas
    );
    subtractor.masterGain.connect(oscilloscope.analyzer);
    oscilloscope.start();
  } catch (e) {
    console.warn('Failed to start Oscilloscope', e);
  }
};

export default initOscilloscope;
export { Oscilloscope };
