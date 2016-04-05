import React, {Component} from 'react';
import { connect } from 'react-redux';
import { changeCurrentVideo, addToWatch } from '../actions/actions.jsx';
import StarBorder from 'material-ui/lib/svg-icons/toggle/star-border';
import IconButton from 'material-ui/lib/icon-button';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';


//Component code
export function VideoGrid({ user,videos , selectVideo, addToWatch}) {
  const styles = {
  root: {
    flexWrap: 'wrap',
    justifyContent: 'space-around',
 
  },
  gridList: {
    width: 1000,
    overflowY: 'auto',
    marginBottom: 15,
    fontFamily: 'Raleway'
  },
};
	
	if(Object.keys(videos).length !== 0){
		return (
			<div style={styles.root}>
      <GridList cellHeight={220} style={styles.gridList} cols= {3} padding= {5} >
       { videos.map(function(video){
          
          return <GridTile key = {video.cover} 
          title = {video.title} subtitle= {<span>by {video.userName}</span>} actionIcon={<IconButton onMouseDown = {() => addToWatch(video,user) } ><StarBorder color="white" /></IconButton>} >
          <img src={video.cover} onClick = {() => selectVideo(video)} /></GridTile>;
        
        })}
        </GridList>
			</div>	
		);	
	}else{
		return (
			<h2>No videos found</h2>
		)
	}
}
// onClick = {() => selectVideo(video)}

//Container Code
const mapStateToProps = (state) => {
  return {
    videos: state.videos,
    user: state.user
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectVideo: (value) => {
      console.log('Selected video!');
      dispatch(changeCurrentVideo(value));
      window.location = '/#/player'
    },
    addToWatch: (video,user) => {
      console.log("Saved");
      var info = {video: video, user: user}
      console.log("info is ", info);
       dispatch(addToWatch(info));
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoGrid);

