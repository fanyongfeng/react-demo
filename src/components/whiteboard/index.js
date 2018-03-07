import React, { Component } from 'react';
import zrender from 'zrender';
import PropTypes from 'prop-types';
import tools from './tools';
import difference from 'lodash/difference'
import './index.less';

class Whiteboard extends Component {

  componentDidMount = () => {
    const container = document.querySelector('.zrender-wrapper');
    const Zrender = zrender.init(container);
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
      });
      this.props.addPath(path);
    });
  }

  componentWillUpdate(nextProps, nextState) {
    const { renderList } = this.props;

    if (renderList !== nextProps.renderList) {
      const addPaths = difference(nextProps.renderList, renderList);
      const deletePaths = difference(renderList, nextProps.renderList)
      this.renderPath(addPaths);
      this.deletePath(deletePaths)
    }
  }

  renderPath = (paths) => {
    paths.map((path) => this.state.Zrender.add(path));
  }

  deletePath = (paths) => {
    paths.map((path) => this.state.Zrender.remove(path));
  }

  handleMoveOnCanvas = (event) => {

  }

  render() {
    return (
      <div className="zrender-wrapper" onMouseMove={this.handleMoveOnCanvas}>
      </div>   
    )
  }
};

Whiteboard.defaultProps = {
  addPath: () => {},
  renderList: []
}

Whiteboard.propTypes = {
  addPath: PropTypes.func.isRequired,
  renderList: PropTypes.array.isRequired
}

export default Whiteboard;

