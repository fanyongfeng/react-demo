import { Line } from 'zrender';
import Tool from './base';

class TmLine extends Tool {

  constructor(options) {
    super(options);
    this.style = {...this.style, lineWidth: 1};
  }

  draw({beiginPoint, endPoint}, zlevel = 0) {
    return new Line({
      shape: {
        x1: beiginPoint.zrX,
        y1: beiginPoint.zrY,
        x2: endPoint.zrX,
        y2: endPoint.zrY,
      },
      style: this.style,
      zlevel
    });
  }

  drawGuide (info) {
    return this.draw(info, 1)
  }
}

export default TmLine;