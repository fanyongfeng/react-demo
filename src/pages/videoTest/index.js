import React, { Component } from 'react';

import { Layout } from 'antd';
import { Input } from 'antd';
import Player from '@components/player';
import './index.less';

class VideoTest extends Component {

  constructor() {
    super();
    this.handlePlayVideo = this.handlePlayVideo.bind(this);
  }

  state = {
    url: ''
  }

  handlePlayVideo (e) {
    this.setState({
      url: e.target.value
    })
  }

  render() {
    const { Header, Content } = Layout;
    return (
      <div className="video">
        <Layout>
          <Header><div className="video-title">视频流测试</div></Header>
          <Content>
            <div className="video-wrapper">
              {this.state.url && <Player url={this.state.url} />}
              <div className="control-wrapper">
                <Input placeholder="Basic usage" onPressEnter={this.handlePlayVideo}/>
              </div>
            </div>
          </Content>
        </Layout>
      </div>
    )
  }

}

export default VideoTest;