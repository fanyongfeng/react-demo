import { Circle } from 'zrender';
import TOOLS from '@constants/tools';
import Tool from './base';

class TmCircle extends Tool {

  constructor(options) {
    super(options);
    this.style = {...this.style, lineWidth: 1};
    this.code = TOOLS.CIRCLE;
  }

  handleMouseDown(e) {

  }

  handleMouseUp(e) {

  }

  draw({beiginPoint, endPoint}, zlevel = 0) {
    const radius = Math.sqrt(Math.pow(endPoint.zrX - beiginPoint.zrX, 2) + Math.pow(endPoint.zrY - beiginPoint.zrY, 2))/2;
    const isDown = endPoint.zrY - beiginPoint.zrY > 0;
    const isLeft = endPoint.zrX - beiginPoint.zrX > 0;
    const width = Math.abs(endPoint.zrX - beiginPoint.zrX);
    const height = Math.abs(endPoint.zrY - beiginPoint.zrY);
    return new Circle({
      shape: {
        cx: isLeft ? beiginPoint.zrX + width/2 : beiginPoint.zrX - width/2,
        cy: isDown ? beiginPoint.zrY + height/2 : beiginPoint.zrY - height/2,
        r: radius
      },
      style: this.style,
      zlevel
    })
  }

  drawGuide (info) {
    return this.draw(info, 1)
  }
}

export default TmCircle;