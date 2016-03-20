import React, {Component} from 'react';
import { connect } from 'react-redux';
import Video from 'react-html5video';

  

//Component Code
export default function Featured({videos}) {
 	console.log(videos);

	if(videos){
    var vidLength = videos.length;
    var currentVideo = videos[Math.floor(Math.random()*vidLength)];

    var videoOptions = {
      url: currentVideo.url,
      poster: currentVideo.cover
    };

	  return(
	  	
      <div id = 'HomePage'>
        <div id = 'sheett'>
        <div id = 'cover'>
          <div className = 'fill'><img src = {currentVideo.cover} /></div>
          </div>
  	      <div id= 'descriptionBox'>
          <h3>{currentVideo.title}</h3>
  	      <h4>{currentVideo.description}</h4>
        </div>
        </div>
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
    videos: state.videos.videos
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
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

