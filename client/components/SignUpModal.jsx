import React, {Component} from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import {connect} from 'react-redux';
import { signUpUser, hideSignUpModal, toggleSignUpModal, authError } from '../actions/actions.jsx';

export default class SignUpModal extends Component {
  render() {
    var signUp = this.props.signUp;
    var closeModal = this.props.closeModal;
    var displaySignUpModal = this.props.displaySignUpModal;
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
          signUp({username: this.refs.username.getValue(), password: this.refs.password.getValue()});
        }}
      />
    ];

    return (
      <div>
        <Dialog
          title='Sign Up'
          actions={actions}
          modal={false}
          contentStyle={customContentStyle}
          open={displaySignUpModal === true}
        >
          {authError === 'username-SignUp' ?
          (<span>Username already exists.</span>) :
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
    displaySignUpModal: state.displaySignUpModal,
    authError: state.authError
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (user) => {
      dispatch(signUpUser(user))
    },
    closeModal: () => {
      dispatch(hideSignUpModal())
    },
    authErrorReset: () => {
      dispatch(authError(null));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpModal);