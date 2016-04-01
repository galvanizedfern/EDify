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
    margin: 10
  }

  var noAuth =  <ToolbarGroup float="right">
                  <RaisedButton label="Sign In" backgroundColor='#C8E6C9' style={buttonStyles} onTouchTap={() => this.props.showSignInModal()}/>
                  <RaisedButton label="Sign Up" backgroundColor='#C8E6C9' style={buttonStyles} onTouchTap={() => this.props.showSignUpModal()}/>
                </ToolbarGroup>
  
  var Auth =    <ToolbarGroup float="right">
                  <RaisedButton label="Upload Video" backgroundColor='#FFC107' style={buttonStyles} onTouchTap={() => this.props.showUploadModal()}/>
                  <RaisedButton label="Profile" backgroundColor='#C8E6C9' style={buttonStyles} onTouchTap={() => this.props.goProfile()}/>
                  <RaisedButton label="Sign Out" backgroundColor='#C8E6C9' style={buttonStyles} onTouchTap={() => this.props.signOut()}/>
                </ToolbarGroup>

    
    return (
      <Toolbar
        className="Nav"
        style={{backgroundColor: '#319b43'}}
      >
        <ToolbarGroup firstChild={true} float="left">
          <ToolbarTitle text="EDify" style={{cursor: 'pointer', color: 'white', fontSize: '30px', paddingLeft: '12px'}} onClick={() => this.props.goHome()}/>
        </ToolbarGroup>
          {this.props.user.username !== undefined ? Auth : noAuth }
        <ToolbarGroup float="left" style={{width: "30%", paddingLeft: "100px"}}>
          <SearchBar handleSubmit={this.props.handleSubmit}/>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
