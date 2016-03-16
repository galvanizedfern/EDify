import React, { Component } from 'react';
import App from '../components/App.jsx';
import { changeCurrentVideo , fetchVideoList} from '../actions/actions.jsx'
import { connect } from 'react-redux';
import Header from './HeaderContainer.jsx';
import Featured from './FeaturedContainer.jsx';
import VideoGrid from './VideoGridContainer.jsx';
import { SearchContainer } from './SearchContainer.jsx';
import { MainVideoListContainer } from './MainVideoListContainer.jsx';
import VideoPlayer from '../components/Main/VideoPlayer.jsx'

const mapStateToProps = (state) => {
  return {
    video: state.currentVideo,
    videos: state.videos
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    playVideo: (value) => {
      console.log('I got called')
      dispatch(changeCurrentVideo(value));
    },
    fetchVideos: () => {
    	console.log("fetching videos!");
    	dispatch(fetchVideoList());
    }
  }

};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;