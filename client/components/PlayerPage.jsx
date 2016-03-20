import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchVideoList } from '../actions/actions.jsx';
import Video from 'react-html5video';
import $ from 'jquery';

//Component Code
export default function PlayerPage({currentVideo}) {
  console.log(currentVideo);
  if(currentVideo){

    return(
      <div id = 'Featured'>

        <Video width="800" height="600" controls loop muted
            poster={currentVideo.cover}
            onCanPlayThrough={() => {
                // Do stuff 
            }}>
            <source src={currentVideo.url} type="video/mp4" />
        </Video>


        <h3>{currentVideo.title}</h3>
        <h4>{currentVideo.description}</h4>
      </div>  
    );  
  }else{
    return (
      <h2>Player Page</h2>
    );
  }
}

//Container Code
const mapStateToProps = (state) => {
  return {
    currentVideo: state.currentVideo.currentVideo
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeFeatured: (value) => {
      console.log('Selected video!');
      dispatch(changeCurrentVideo(value));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerPage);