import React, {Component} from 'react';
import { connect } from 'react-redux';
import { changeCurrentVideo } from '../actions/actions.jsx';
import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
  

//Component Code
export default function Featured({videos, selectVideo}) {

	if(Object.keys(videos).length !== 0){
    var vidLength = videos.length;
    var currentVideo1 = videos[Math.floor(Math.random()*vidLength)];
    var currentVideo2 = videos[Math.floor(Math.random()*vidLength)];

	  return(
	  	
        <div id= 'inner'>
        <GridList
          cols={2}
          cellHeight={300}
          padding={0}
        >
        <GridTile
          onClick = {() => selectVideo(currentVideo1)}
          key={1}
          title={currentVideo1.title}
          subtitle={'by ' + currentVideo1.description}
          cols={1}
        >
          <img className='featuredVideo' src={currentVideo1.cover} />
        </GridTile>
        <GridTile
          onClick = {() => selectVideo(currentVideo2)}
          key={2}
          title={currentVideo2.title}
          subtitle={'by ' + currentVideo2.description}
          cols={1}
        >
          <img className='featuredVideo' src={currentVideo2.cover} />
        </GridTile>
        </GridList>
        </div>
         
  	);	

	}else{
		return (
			<h2>Featured</h2>
		);
	}
}

//Container Code
const mapStateToProps = (state) => {
  return {
    videos: state.videos
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectVideo: (value) => {
      console.log('Selected video!');
      dispatch(changeCurrentVideo(value));
      window.location = '/#/player'
    },
    changeFeatured: (value) => {
      console.log('Changing featured video!');
      dispatch(changeFeatured());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Featured);

