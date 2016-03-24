import React, {Component} from 'react';
import { connect } from 'react-redux';
import { addComment } from '../actions/actions.jsx';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';


//Component Code
export default class CommentSection extends Component {

  render() {
    var commentsFound;

    // Comments is initially an empty object (before becoming an array of 
    // comment objects) so it must be verified as an array before trying to map it
    if (Array.isArray(this.props.comments)) {
      commentsFound = (
      <div id = 'CommentSection'>
        {this.props.comments.map(function (comment){
          return(
            <div id = "comment">
              <h3> {comment.content} </h3>
              <h4> {comment.userID} </h4>
            </div>
          ); 
        })}
      </div>
      );
    }

    return (
      <div>
        <TextField
          hintText="Enter a comment..."
          multiLine={true}
          rows={1}
          rowsMax={5}
          ref='comment'
        />
        <RaisedButton label="Submit" onClick={() => this.props.addComment(this.refs.comment.getValue(), this.props.currentVideo.id, this.props.user.id)}/>
        {commentsFound}
      </div>
    )
  };
}

//Container Code
const mapStateToProps = (state) => {
  return {
    comments: state.comments
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addComment: (comment, videoID, userID) => {
      console.log('Adding comment!');
      dispatch(addComment(comment, videoID, userID));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentSection);