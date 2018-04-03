import React, { Component } from 'react';
import videojs from 'video.js';
import swf from '@assets/swf/video-js.swf';
import 'videojs-flash';
import './index.less';

class Player extends Component {

  state = {
    videoOptions: {
      sources: [{
        src: 'http://livestream01.tutormeetplus.com/stage/2018040316971231_000287_ZTf3SIAL_ATJSpz.flv',
        type: 'video/x-flv'
      }],
      preload: 'auto',
      autoplay: false,
      techOrder: ['html5', 'flash'],
      fluid: true,
      aspectRatio: '4:3',
      controls: false,
      flash: {
        swf
      }
    }
  }

  componentDidMount() {
    this.player = videojs(this.videoNode, this.state.videoOptions, function onPlayerReady() {
      this.on('loadeddata', function() {
        console.log('[MediaPlayer] loadeddata');
      });
      this.on('play', function() {
        console.log('[MediaPlayer] play');
      });
    });
  }

  render() {

    return (
      <div data-vjs-player>
        <video id="my-player" ref={node => (this.videoNode = node)} className="video-js" />
      </div>
    )
  }

}

export default Player;