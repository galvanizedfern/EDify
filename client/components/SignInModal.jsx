import React, {Component} from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import {connect} from 'react-redux';
import { signInUser, hideSignInModal, toggleSignInModal } from '../actions/actions.jsx';

export default class SignInModal extends Component {
  render() {
    var signIn = this.props.signIn;
    var closeModal = this.props.closeModal;
    var displaySignInModal = this.props.displaySignInModal;

    const customContentStyle = {
      width: 350,
      maxWidth: 'none',
    };

    const actions = [
      <FlatButton
        label='Cancel'
        secondary={true}
        onClick={closeModal}
      />,
      <FlatButton
        label='Submit'
        onClick={() => {
          signIn({username: this.refs.username.getValue(), password: this.refs.password.getValue()});
          closeModal();
        }}
      />
    ];

    return (
      <div>
        <Dialog
          title='Log In'
          actions={actions}
          modal={false}
          contentStyle={customContentStyle}
          open={displaySignInModal === true}
        >
          <TextField
          ref="username"
          floatingLabelText="Username"
          id="username"
          />
          <TextField
            ref="password"
            floatingLabelText="Password"
            type="password"
            id="password"
          />
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    displaySignInModal: state.displaySignInModal
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (user) => {
      dispatch(signInUser(user))
    
    },
    closeModal: () => {
      dispatch(hideSignInModal())
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInModal);