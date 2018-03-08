import React, { Component, Fragment } from 'react';
import zrender from 'zrender';
import PropTypes from 'prop-types';
import difference from 'lodash/difference';
import find from 'lodash/find';

import TOOL from '@constants/tools';
import tools from './tools';
import './index.less';

class Whiteboard extends Component {

  componentDidMount = () => {
    const Zrender = zrender.init(this.$zrenderActive);
    this.getZrenderOffset();
    this.setState({
      Zrender,
    });
    Zrender.on('mousedown', (e) => {
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
      const path = tools.creatPath({
        endPoint: e.event,
        beiginPoint: this.state.mouseDownInfo
      }, TOOL.CIRCLE);
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
  handleMoveOnCanvas = (event) => {
    const { offsetLeft, offsetTop, isMousedown } = this.state;
    if (isMousedown) return false;
    const { renderList } = this.props;
    const point = {x: event.pageX - offsetLeft, y: event.pageY - offsetTop};
    const shotPath = find(renderList, (path) => path.contain(point.x, point.y));
    if (shotPath) {
      // this.props.deletePath(shotPath.id);
    }
  }

  render() {
    const zrenderProps = {
      onMouseMove: this.handleMoveOnCanvas,
      ref: ref => this.$zrenderActive = ref
    }
    return (
      <div className="zrender-layer">
        <div className="zrender-layer-active" {...zrenderProps}>
        </div>  
        <div className="zrender-layer-quiet" {...zrenderProps}>
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

