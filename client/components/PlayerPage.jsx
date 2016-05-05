import React, {Component} from 'react';
import { connect } from 'react-redux';
import VideoPlayer from './VideoPlayer.jsx';
import VotesSection from './VotesSection.jsx';
import DiscussionSection from './DiscussionSection.jsx';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import { loadFeedback, loadQuestions } from '../actions/actions.jsx';
import $ from 'jquery';

//Component Code
export class PlayerPage extends Component {

  componentWillMount(){
      this.props.loadFeedback(this.props.currentVideo.id);
      this.props.loadQuestions(this.props.currentVideo.id);
  }

  /*
  shouldComponentUpdate{

  }
  **/

  render(){
    if(this.props.currentVideo){
      return (

        <div id = 'PlayerPage'>
          <h3 class="title" style={{fontFamily: 'Raleway', fontWeight: 'bold', fontSize: '27px', marginTop: '10px', marginBottom: '0px', marginLeft: '225px'}}>{this.props.currentVideo.title}</h3>
          <h3 class="title" style={{color: '#303F9F', fontFamily: 'Raleway', fontWeight: 'bold', fontSize: '18px', marginTop: '10px', marginBottom: '0px', marginLeft: '225px'}}>{this.props.currentVideo.userName}</h3>
          <div className='videoplayer'>
          <VideoPlayer currentVideo = {this.props.currentVideo}/>
          </div>
      
          <div className='side'>
            <h4 class="description" style={{float: 'left', fontFamily: 'Raleway', fontSize: '20px', marginBottom: '0px', marginTop: '0px', marginLeft: '95px', height: '100px'}}>{this.props.currentVideo.description}</h4>
            <VotesSection />
          </div>
       
        <h2><DiscussionSection /></h2>
        </div>

      );
    } else {
      return (
        <h2>Player Page</h2>
      );   
    }
  }
}


//Container Code
const mapStateToProps = (state) => {
  return {
    currentVideo: state.currentVideo,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadFeedback: (videoid) => {
      dispatch(loadFeedback(videoid));
    },
    loadQuestions: (videoid) => {
      dispatch(loadQuestions(videoid));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerPage);
