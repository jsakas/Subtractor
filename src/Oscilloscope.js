class Oscilloscope {
    constructor(context) {
      console.log('Oscilloscope constructed')
      this.context = context
      this.analyzer = context.createAnalyser()
      this.draw = () => {
        requestAnimationFrame(this.draw)

        const canvasWidth = this.canvas.width
        const canvasHeight = this.canvas.height
        const canvasContext = this.canvas.getContext('2d')

        this.analyzer.getByteTimeDomainData(this.analyzerDataArray)

        canvasContext.fillStyle = 'rgb(200, 200, 200)'
        canvasContext.fillRect(0, 0, canvasWidth, canvasHeight)
        canvasContext.lineWidth = 2
        canvasContext.strokeStyle = 'rgb(0, 0, 0)'
        canvasContext.beginPath()

        let sliceWidth = Number(canvasWidth) * 1.0 / this.analyzerBufferLength
        let x = 0
        for (let i = 0; i < this.analyzerBufferLength; i++) {
            let v = this.analyzerDataArray[i] / 128.0
            let y = v * canvasHeight/2
            if (i === 0) {
              canvasContext.moveTo(x, y)
            } else {
              canvasContext.lineTo(x, y)
            }
            x += sliceWidth
          }

        canvasContext.lineTo(canvasWidth, canvasHeight/2)
        canvasContext.stroke()
      }
    }

    start(canvas) {
      this.analyzer.fftSize = 2048
      this.analyzerBufferLength = this.analyzer.frequencyBinCount
      this.analyzerDataArray = new Uint8Array(this.analyzerBufferLength)
      this.canvas = canvas
      this.draw()
    }
}

export { Oscilloscope }
