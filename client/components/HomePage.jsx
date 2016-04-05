import React, {Component} from 'react';
import { connect } from 'react-redux';
import Featured from './Featured.jsx';
import VideoGrid from './VideoGrid.jsx';
import CategoriesBar from './CategoriesBar.jsx';
import { fetchVideoList, loadCategories } from '../actions/actions.jsx';
import $ from 'jquery';

//Component Code
export class HomePage extends Component {

	componentDidMount(){
    this.props.fetchVideos();
    this.props.fetchCategories();
	}

  render(){
    var durationCheck = <h1>CHECKING DURATION !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</h1>
    console.log(window.location)

  	//this.props.fetchVideos();
  	return (
  	  <div id = "HomePage">
  	  	<div id = 'box'><Featured /></div>
        <div className="info" style={{fontFamily: 'Raleway', fontSize: '30px'}}><br/><b>Learn something new</b><br/><span style={{fontSize: '20px'}}>in five minutes or less!</span><br/></div>
          <CategoriesBar />
      	 <div id= "sheet" >
          <VideoGrid />
        </div>
        {this.props.checkVideoDuration === true ? durationCheck : ''}
  	  </div>
  	);
  }
}

//Container Code
const mapStateToProps = (state) => {
  return {
    videos: state.videos,
    checkVideoDuration: state.checkVideoDuration
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchVideos: () => {
      $.get('/fetch')
      .done(function(res){
         dispatch(fetchVideoList(res));
      });
    },
    fetchCategories: () => {
      dispatch(loadCategories())
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);


