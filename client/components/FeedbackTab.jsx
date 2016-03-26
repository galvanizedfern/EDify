import React, {Component} from 'react';
import { connect } from 'react-redux';
import { addComment } from '../actions/actions.jsx';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';


//Component Code
export default class FeedbackTab extends Component {

  render() {
    var commentsFound;

    // Comments is initially an empty object (before becoming an array of 
    // comment objects) so it must be verified as an array before trying to map it
    if (Array.isArray(this.props.comments)) {
      commentsFound = (
      <div>
        {this.props.comments.map(function (comment){
          return(
            <div>
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
        <RaisedButton label="Submit" onClick={() => this.props.addComment(this.refs.comment.getValue(), this.props.currentVideo.id, this.props.currentUser.id)}/>
        {commentsFound}
      </div>
    )
  };
}