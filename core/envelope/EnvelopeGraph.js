
class EnvelopeGraph {
    constructor(envelope, canvas) {
      this.envelope = envelope;
      this.canvas = canvas;
  
      this.getRect();
      this.draw = this.draw.bind(this);
      this.draw();
  
      window.addEventListener('resize', () => this.getRect());
    }
  
    values () {
      let { 
        attack,
        decay,
        sustain,
        release
      } = this.envelope();
  
      return {
        a: Math.floor(knobToAttack(attack) * 100),
        d: Math.floor(knobToDecay(decay) * 100),
        s: 1 - (sustain / 127),
        r: Math.floor(knobToRelease(release) * 100),
      };
    }
  
    draw() {
      requestAnimationFrame(this.draw);
      let w = this.width;
      let h = this.height;
      let { a, d, s, r } = this.values();
      a += 3;
      d += 10;
      r += 3;
      let t = a + d + r;
  
      let ap = (a / t) * w;
      let dp = (d / t) * w;
      let rp = (r / t) * w;
      let sp = Math.floor(s * h);
  
      let context = this.canvas.getContext('2d');
      context.imageSmoothingEnabled = true;
  
      context.clearRect(0, 0, w, h);
      
      context.strokeStyle = '#141414';
      context.beginPath();
      context.moveTo(0, h);
      context.lineTo(ap, 0);
      context.quadraticCurveTo(ap, sp, ap + dp, sp);
      context.quadraticCurveTo(ap + dp, h, ap + dp + rp, h);
      context.stroke();
  
    }
  
    getRect() {
      this.canvasRect = this.canvas.getBoundingClientRect();
      this.width = this.canvasRect.width;
      this.height = this.canvasRect.height;
      this.canvas.setAttribute('width', this.width);
      this.canvas.setAttribute('height', this.height);
    }
}

export default EnvelopeGraph;
