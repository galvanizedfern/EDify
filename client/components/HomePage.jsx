import React, {Component} from 'react';
import { connect } from 'react-redux';
import Featured from './Featured.jsx';
import VideoGrid from './VideoGrid.jsx';
import { fetchVideoList } from '../actions/actions.jsx';
import $ from 'jquery';

//Component Code
export default class HomePage extends Component {

	componentWillMount(){
	    console.log('willMount');
	    this.props.fetchVideos();
	}

  render(){
  	//this.props.fetchVideos();
  	return (
  	  <div id = "HomePage">
  	  	<div id = 'box'><Featured /></div>
    	  <div ><VideoGrid /></div>
  	  </div>
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
    fetchVideos: () => {
     console.log("fetching videos!");
      $.get('/fetch')
      .done(function(res){
      	console.log("response: ",res);
         dispatch(fetchVideoList(res));
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);


