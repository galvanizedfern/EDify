import React, {Component} from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import {connect} from 'react-redux';
import { signInUser, hideSignInModal, toggleSignInModal, authError } from '../actions/actions.jsx';

export default class SignInModal extends Component {
  render() {
    var signIn = this.props.signIn;
    var closeModal = this.props.closeModal;
    var displaySignInModal = this.props.displaySignInModal;
    var authError = this.props.authError;
    var authErrorReset = this.props.authErrorReset;

    const customContentStyle = {
      width: 350,
      maxWidth: 'none',
    };

    const actions = [
      <FlatButton
        label='Cancel'
        secondary={true}
        onClick={() => {
          closeModal();
          authErrorReset();
        }}
      />,
      <FlatButton
        label='Submit'
        onClick={() => {
          signIn({username: this.refs.username.getValue(), password: this.refs.password.getValue()});
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
          {authError === 'username-SignIn' ?
          (<span>Username does not exist.</span>) :
          authError === 'password' ?
          (<span>Incorrect password.</span>) :
          ""}
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
    displaySignInModal: state.displaySignInModal,
    authError: state.authError
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (user) => {
      dispatch(signInUser(user))
    
    },
    closeModal: () => {
      dispatch(hideSignInModal())
    },
    authErrorReset: () => {
      dispatch(authError(null));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInModal);