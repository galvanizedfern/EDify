import React, {Component} from 'react';
import { connect } from 'react-redux';
import { changeCurrentVideo } from '../actions/actions.jsx';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';


//Component code
export function VideoGrid({ videos , selectVideo}) {
  const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
 
  },
  gridList: {
    width: 1200,
    height: 500,
    overflowY: 'auto',
    marginBottom: 15,
   
  },
};
	
	if(videos){
		return (
			<div id= "sheet" style={styles.root}>
        <GridList cellHeight={220} style={styles.gridList} cols= {4} padding= {5} >
				
        { videos.map(function(video){
          
          return <GridTile onClick = {() => selectVideo(video)} key = {video.cover} 
          title = {video.title} subtitle= {<span>by <b>{video.description}</b></span>}>
          <img src={video.cover}  /></GridTile>;
				
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


//Container Code
const mapStateToProps = (state) => {
  return {
    videos: state.videos.videos
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectVideo: (value) => {
      console.log('Selected video!');
      dispatch(changeCurrentVideo(value));
      window.location = '/#/player'
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoGrid);

// video = {video} selectVideo = {selectVideo}

   // var style = {
   //    'backgroundImage': (`url('${currentVideo.cover}')`),
   //    'backgroundSize': 'cover',
   //    'backgroundRepeat': 'no-repeat',
   //    'backgroundPosition': '40%',
   //    'height': '100%'
   //  };