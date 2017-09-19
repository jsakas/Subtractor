class Oscilloscope {
    constructor(context) {
      console.log('Oscilloscope constructed')
      this.context = context
      this.analyzer = context.createAnalyser()
    }

    start(canvas) {
      this.analyzer.fftSize = 2048
      const analyzerBufferLength = this.analyzer.frequencyBinCount
      const analyzerDataArray = new Uint8Array(analyzerBufferLength)

      const canvasWidth = canvas.width
      const canvasHeight = canvas.height
      const canvasContext = canvas.getContext('2d')
      const boundAnalyzer = this.analyzer

      const draw = function() {
        requestAnimationFrame(draw)

        boundAnalyzer.getByteTimeDomainData(analyzerDataArray)

        canvasContext.fillStyle = 'rgb(200, 200, 200)'
        canvasContext.fillRect(0, 0, canvasWidth, canvasHeight)
        canvasContext.lineWidth = 2
        canvasContext.strokeStyle = 'rgb(0, 0, 0)'
        canvasContext.beginPath()

        let sliceWidth = Number(canvasWidth) * 1.0 / analyzerBufferLength
        let x = 0
        for (let i = 0; i < analyzerBufferLength; i++) {
            let v = analyzerDataArray[i] / 128.0
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
      draw()
    }
}

export { Oscilloscope }
