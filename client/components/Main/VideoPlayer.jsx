import React, {Component} from 'react';

export default class VideoPlayer extends Component {

  render() {
    var videoSrc = "http://dndm6u438fnmq.cloudfront.net/SampleVideo_1280x720_30mb.mp4";
    return (
      <div className="container">
        <iframe className="player" type="text/html" width="300px" height="250px"
  src={videoSrc}
  frameborder="0"/>
      </div>
    );
  }
}