import React, {Component} from 'react';


export default class VideoPlayer extends Component {

  componentDidMount() {
    var video, wrapper;
    wrapper = document.createElement('div');
    wrapper.innerHTML = "<video id='attachmentVideo' class='video-js vjs-default-skin' controls preload='auto' width='800' height='375'><source src='" + this.props.currentVideo.url + "' type='video/mp4' /></video>";
    video = wrapper.firstChild;
    this.refs.target.getDOMNode().appendChild(video);
    return videojs(video, {});
  }

  render() {
    return (
      <div id = 'VideoPlayer'>  
        <div id = 'Playercover'>
          <div id="attachmentViewer">
            <h2>{this.props.title}</h2>
            <div id="attachmentVideoContainer" ref="target" />
          </div>
        </div>
      </div>  
    );
  }
}