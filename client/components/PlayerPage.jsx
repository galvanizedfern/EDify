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

        <GridList
          padding={0}
          cols={8}
          cellHeight={700}
        >
        <GridTile
          cols={5}
        >
          <VideoPlayer currentVideo = {this.props.currentVideo}/>
        </GridTile>
        <GridTile
          cols={3}
        >
          <VotesSection />
        </GridTile>
        </GridList>

         
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
