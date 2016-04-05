import React, {Component} from 'react';
import SearchBar from './SearchBar.jsx';
import {fetchVideoList, toggleSignInModal, toggleSignUpModal, toggleUploadModal, signOutUser} from '../actions/actions.jsx'
import {connect} from 'react-redux';
import $ from 'jquery';
import FontIcon from 'material-ui/lib/font-icon';
import NavigationExpandMoreIcon from 'material-ui/lib/svg-icons/navigation/expand-more';
import RaisedButton from 'material-ui/lib/raised-button';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import TextField from 'material-ui/lib/text-field';
import IconButton from 'material-ui/lib/icon-button';


const mapStateToProps = (state) => {
  return {
    state: state,
    displaySignInModal: state.displaySignInModal,
    displaySignOutModal: state.displaySignOutModal,
    user: state.user
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit: (query, queryType) => {
      $.post('/search', {query: query, queryType:queryType}).done(function(res){
        dispatch(fetchVideoList(res))
        window.location = '/#/search'
      })
    },
    goHome: () => {
      window.location = '/#/';
    },
    goProfile: () => {
      window.location = '/#/profile'
    },
    signOut: () => {
      console.log('Signing out user')
      dispatch(signOutUser())
      window.location = '/#/'
    },
    showSignInModal: () => {
      console.log('Showing SignInModal')
      dispatch(toggleSignInModal())
    },
    showSignUpModal: () => {
      console.log('Showing SignUpModal')
      dispatch(toggleSignUpModal())
    },
    showUploadModal: () => {
      console.log('Showing UploadModal')
      dispatch(toggleUploadModal())
    }
  };
}

class NavBar extends Component {


  render(){

  const buttonStyles = {
    margin: 10,
    marginTop: 18
  }

  var noAuth =  <ToolbarGroup float="right">
                  <RaisedButton label="Sign In" labelColor='#303F9F' backgroundColor='#f0f0f5' style={buttonStyles} onTouchTap={() => this.props.showSignInModal()}/>
                  <RaisedButton label="Sign Up" labelColor='#303F9F' backgroundColor='#f0f0f5' style={buttonStyles} onTouchTap={() => this.props.showSignUpModal()}/>
                </ToolbarGroup>
  
  var Auth =    <ToolbarGroup float="right">
                  <RaisedButton label="Upload Video" labelColor='#f0f0f5' backgroundColor='#303F9F' style={buttonStyles} onTouchTap={() => this.props.showUploadModal()}/>
                  <RaisedButton label="Profile" labelColor='#f0f0f5' backgroundColor='#303F9F' style={buttonStyles} onTouchTap={() => this.props.goProfile()}/>
                  <RaisedButton label="Sign Out" labelColor='#303F9F' backgroundColor='#f0f0f5' style={buttonStyles} onTouchTap={() => this.props.signOut()}/>
                </ToolbarGroup>

    
    return (
      <Toolbar
        className="Nav"
        style={{backgroundColor: '#ff4f1a', height: '75px'}}
      >
        <ToolbarGroup firstChild={true} float="left">
          <ToolbarTitle text="EDify" style={{fontFamily: 'Fredoka One', fontStyle: 'bold', fontSize: '50px', cursor: 'pointer', color: 'white', paddingLeft: '12px', paddingTop: '7px', marginRight: '20px'}} onClick={() => this.props.goHome()}/>
        <ToolbarGroup float="right" style={{width: "26%"}}>
          <SearchBar handleSubmit={this.props.handleSubmit}/>
        </ToolbarGroup>
        </ToolbarGroup>

          {this.props.user.username !== undefined ? Auth : noAuth }
      </Toolbar>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
