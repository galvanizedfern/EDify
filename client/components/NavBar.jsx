import React, {Component} from 'react';
import AuthBox from './AuthBox.jsx';
import SearchBar from './SearchBar.jsx';
import {receivedVideoList} from '../actions/actions.jsx'
import {connect} from 'react-redux';
import $ from 'jquery';
// import {ToolBar, ToolBarSeparator} from 'material-ui';
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
    state: state
  }
};


const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit: (query) => {
      $.post('/search', {query: query}).done(function(res){
        dispatch(receivedVideoList(res))
        window.location = '/#/search'
      })
    },
    goHome: () => {
      window.location = '/#/';
    }
  }
}
class NavBar extends Component {
  render(){
    return (
      <Toolbar>
        <ToolbarGroup firstChild={true} float="left">
          <ToolbarTitle text="Virtuoso" style={{cursor: 'pointer'}} onClick={() => this.props.goHome()}/>
        </ToolbarGroup>
        <ToolbarGroup float="right">
          <ToolbarSeparator />
          <RaisedButton label="Sign In" primary={true} />
          <RaisedButton label="Sign Up" primary={true} />
        </ToolbarGroup>
        <ToolbarGroup float="right" style={{width: "35%"}}>
          <SearchBar handleSubmit={this.props.handleSubmit}/>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

        // <div className='navLeft'>
        //   <h1 className='logo navContent'>Virtuoso</h1>
        // </div>
        // <div className='navMiddle'>
        //   <div className='searchBar navContent'><SearchBar onSubmit={this.props.handleSubmit.bind(this)}/></div>
        // </div>
        // <div className='navRight'>
        //   <div className='authBox navContent'><AuthBox /></div>
        // </div>