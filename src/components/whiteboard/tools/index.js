import { Polygon, Rect, Circle } from 'zrender';
import TOOL from '@constants/tools';
import TmLine from './line';
import TmCircle from './circle';

class Tools {

  constructor(options) {
    this.tmLine = new TmLine(options);
    this.tmCircle = new TmCircle(options);
  }

  setCurrentTool(toolCode) {
    this.activeTool = [this.tmLine, this.tmCircle].find((tool) => tool.code === toolCode);     //filter
  }

  get currentTool() {
    return this.activeTool;
  }

  // creatPath(info) {
  //   this.activeTool.draw(info);
  // }

  // creatGuide(info, currentTool) {
  //   this.activeTool.drawGuide(info);
  // }

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

}

export default Tools;