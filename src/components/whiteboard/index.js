import React, { Component } from 'react';
import zrender from 'zrender';
import PropTypes from 'prop-types';
import difference from 'lodash/difference';
import find from 'lodash/find';

import TOOL from '@constants/tools';
import Tools from './tools';
import './index.less';
import Selector from './selector';

class Whiteboard extends Component {

  componentDidMount = () => {
    const Zrender = zrender.init(this.$zrenderActive);
    this.getZrenderOffset();
    this.setState({
      Zrender,
    });
    this.tools = new Tools({
      style: {
        fill: "transparent",
        stroke: '#DC143C',
        lineWidth: 1,
        cursor: 'move'
      },
      addPath: this.props.add,
      deletePath: this.props.deletePath
    });
    this.tools.setCurrentTool(TOOL.CIRCLE);
    this.currentTool = this.tools.currentTool;
    Zrender.on('mousedown', (e) => { //执行currentTool 的事件
      this.setState({
        isMousedown: true,
        mouseDownInfo: e.event
      });

      this.currentTool.handleMouseDown(e); 
    });
    Zrender.on('mouseup', (e) => {
      this.setState({
        isMousedown: false,
        mouseUpInfo: e.event
      });

      this.currentTool.handleMouseUp(e.event); 
      const path = this.currentTool.draw({
        endPoint: e.event,
        beiginPoint: this.state.mouseDownInfo
      });
      this.lastGuide && this.props.deletePath(this.lastGuide.id)
      this.props.addPath(path);
    });
  }

  getZrenderOffset = () => {
    const offsetInfo = this.$zrenderActive.getBoundingClientRect();
    this.setState({
      offsetLeft: offsetInfo.left,
      offsetTop: offsetInfo.top,
    });
  }

  componentWillUpdate(nextProps, nextState) {
    const { renderList } = this.props;

    if (renderList !== nextProps.renderList) {
      const addPaths = difference(nextProps.renderList, renderList);
      const deletePaths = difference(renderList, nextProps.renderList);
      this.renderPaths(addPaths);
      this.deletePaths(deletePaths);
    }
  }

  renderPaths = (paths) => {
    paths.map((path) => this.state.Zrender.add(path));
  }

  deletePaths = (paths) => {
    paths.map((path) => this.state.Zrender.remove(path));
  }

  /**
   * 鼠标移动的时候命中 path item
   */
  handleMoveOnCanvas = (e) => {  //执行现在工具的事件
    const { offsetLeft, offsetTop, isMousedown } = this.state;
    const point = {zrX: e.pageX - offsetLeft, zrY: e.pageY - offsetTop};
    if (isMousedown) {
      this.handleDragMoveOnCanvas(e);
      return false;
    };
    this.currentTool.handleMouseMove(e); 
    const { renderList } = this.props;
    const shotPath = find(renderList, (path) => path.contain(point.zrX, point.zrY));
    if (shotPath) {
      // this.props.deletePath(shotPath.id); //删除
    }
  }

  handleDragMoveOnCanvas(e) {
    const { offsetLeft, offsetTop } = this.state;
    const point = {zrX: e.pageX - offsetLeft, zrY: e.pageY - offsetTop};
    this.currentTool.handleMouseDrag(e); 
    const path = this.currentTool.drawGuide({
      endPoint: point,
      beiginPoint: this.state.mouseDownInfo
    });
    if (this.lastGuide) {
      this.props.deletePath(this.lastGuide.id);
    }
    this.props.addPath(path);
    this.lastGuide = path;
  }

  render() {
    const zrenderActiveProps = {
      onMouseMove: this.handleMoveOnCanvas,
      ref: ref => this.$zrenderActive = ref
    };
    return (
      <div className="zrender-layer">
        <div className="render-tool">
          <Selector />
        </div>
        <div className="zrender-layer-active" {...zrenderActiveProps}>
        </div>  
      </div>
    )
  }
};

Whiteboard.propTypes = {
  addPath: PropTypes.func.isRequired,
  deletePath: PropTypes.func.isRequired,
  renderList: PropTypes.array.isRequired
}

export default Whiteboard;

