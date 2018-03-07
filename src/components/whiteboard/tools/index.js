import { Line, Polygon, Rect, Circle } from 'zrender';
import TOOL from '@constants/tools';

class Tools {

  creatPath(info, currentTool) {
    switch (currentTool) {
      case TOOL.LINE: 
        return this.renderLine(info);
      case TOOL.TRIANGLE:
        return this.renderTriangle(info);
      case TOOL.RECTANGLE: 
        return this.renderRectangle(info);
      case TOOL.CIRCLE:
        return this.renderCircle(info);
      
      default:
      return null;
    }
  }

  renderCircle = ({beiginPoint, endPoint}) => {
    const radius = 
  }

  renderRectangle = ({beiginPoint, endPoint}) => { //还要判断方向来决定起点
    const width = Math.abs(endPoint.zrX - beiginPoint.zrX);
    const height = Math.abs(endPoint.zrY - beiginPoint.zrY);
    
    return new Rect({
      shape: {
        x: endPoint.zrX - beiginPoint.zrX > 0 ? beiginPoint.zrX : endPoint.zrX,
        y: endPoint.zrX - beiginPoint.zrX > 0 ? beiginPoint.zrY : endPoint.zrY,
        width,
        height
      }
    })
  }

  renderTriangle = ({beiginPoint, endPoint}) => {
    const middlePoint = [(endPoint.zrX - beiginPoint.zrX)/2 + beiginPoint.zrX, beiginPoint.zrY];
    return new Polygon({
      shape: {
        points: [[beiginPoint.zrX, endPoint.zrY], middlePoint, [endPoint.zrX, endPoint.zrY]]
      }
    });
  }

  renderLine = ({beiginPoint, endPoint}) => {
    return new Line({
      shape: {
        x1: beiginPoint.zrX,
        y1: beiginPoint.zrY,
        x2: endPoint.zrX,
        y2: endPoint.zrY
      }
    })
  }

}

export default new Tools();