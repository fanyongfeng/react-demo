class Tool {

  constructor ({ style, zlevel, ...reset }) {
    this.style = style;
    this.zlevel = zlevel || 0;
  }

  draw() {
    
  }

  drawGuide() {  //rewirite by sub if needed

  }

}

export default Tool;