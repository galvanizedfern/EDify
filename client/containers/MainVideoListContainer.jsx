import React, { Component } from 'react';
import { VideoListEntry } from '../components/Main/VideoListEntry.jsx';

export class MainVideoListContainer extends Component {

  render(){
    return (
      <VideoListEntry videos = {this.props.videos} />
    )
  }
}
