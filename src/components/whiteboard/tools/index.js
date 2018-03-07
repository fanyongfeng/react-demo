import { Line } from 'zrender';

class Tools {

  creatPath({beiginPoint, endPoint}) {  //处理不同的工具
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