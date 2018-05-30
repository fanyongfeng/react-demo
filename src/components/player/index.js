import React, { Component } from 'react';
import videojs from 'video.js';
import 'videojs-flash';
import swf from '@assets/swf/video-js.swf';

import './index.less';

class Player extends Component {

  state = {
    videoOptions: {
      sources: [{
        src: this.props.url,
        type: 'video/x-flv'
      }],
      preload: 'auto',
      autoplay: false,
      techOrder: ['html5', 'flash'],
      fluid: true,
      aspectRatio: '4:3',
      controls: false,
      durationDisplay: false,
      // flash: {
      //   swf
      // }
    }
  }

  componentDidUpdate(preProps) {
    if (preProps.url !== this.props.url) {
      this.player && this.player.reset();
      this.player && this.player.src(this.props.url);
    }
  } 

  componentDidMount() {
    this.player = videojs('my-player', this.state.videoOptions, function onPlayerReady() {
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