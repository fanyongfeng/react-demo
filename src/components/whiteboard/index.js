import React, { Component } from 'react';
import zrender from 'zrender';
import PropTypes from 'prop-types';
import difference from 'lodash/difference';
import find from 'lodash/find';

import TOOL from '@constants/tools';
import Tools from './tools';
import './index.less';

class Whiteboard extends Component {

  componentDidMount = () => {
    const Zrender = zrender.init(this.$zrenderActive);
    this.getZrenderOffset();
    this.setState({
      Zrender,
    });
    this.tool = new Tools({
      style: {
        fill: "transparent",
        stroke: '#DC143C',
        lineWidth: 1,
        cursor: 'move'
      }
    });
    Zrender.on('mousedown', (e) => { //执行currentTool 的事件
      this.setState({
        isMousedown: true,
        mouseDownInfo: e.event
      });
    });
    Zrender.on('mouseup', (e) => {
      this.setState({
        isMousedown: false,
        mouseUpInfo: e.event
      });
      const path = this.tool.creatPath({
        endPoint: e.event,
        beiginPoint: this.state.mouseDownInfo
      }, TOOL.LINE);
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
      this.renderPath(addPaths);
      this.deletePath(deletePaths);
    }
  }

  renderPath = (paths) => {
    paths.map((path) => this.state.Zrender.add(path));
  }

  deletePath = (paths) => {
    paths.map((path) => this.state.Zrender.remove(path));
  }

  /**
   * 鼠标移动的时候命中 path item
   */
  handleMoveOnCanvas = (e) => {  //执行现在工具的事件
    const { offsetLeft, offsetTop, isMousedown } = this.state;
    const point = {zrX: e.pageX - offsetLeft, zrY: e.pageY - offsetTop};
    if (isMousedown) {
      this.handleDragMoveOnCanvas(e)
      return false;
    };
    const { renderList } = this.props;
    const shotPath = find(renderList, (path) => path.contain(point.zrX, point.zrY));
    if (shotPath) {
      // this.props.deletePath(shotPath.id);
    }
  }

  handleDragMoveOnCanvas(e) {
    const { offsetLeft, offsetTop } = this.state;
    const point = {zrX: e.pageX - offsetLeft, zrY: e.pageY - offsetTop};
    const path = this.tool.creatGuide({
      endPoint: point,
      beiginPoint: this.state.mouseDownInfo
    }, TOOL.LINE);
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

