import React, {Component} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';

import IconMenu from 'material-ui/lib/menus/icon-menu';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import NavigationExpandMoreIcon from 'material-ui/lib/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/lib/menus/menu-item';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import {fetchVideoList} from '../actions/actions.jsx'

export default class CategoriesBar extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {

    return (

    <Toolbar
      style={{backgroundColor: '#303F9F'}}
    >
      <ToolbarGroup firstChild={true} float="left">
        <FlatButton label="Science" style={{color: '#f0f0f5'}} 
          onTouchTap={() => {this.props.searchByCategory(8)}} />
        <ToolbarSeparator style={{backgroundColor: '#f0f0f5'}} />
        <FlatButton label="Arts" style={{color: '#f0f0f5'}}
          onTouchTap={() => {this.props.searchByCategory(1)}} />
        <ToolbarSeparator style={{backgroundColor: '#f0f0f5'}}/>
        <FlatButton label="Business" style={{color: '#f0f0f5'}}
          onTouchTap={() => {this.props.searchByCategory(12)}} />
        <ToolbarSeparator style={{backgroundColor: '#f0f0f5'}}/>
        <FlatButton label="Sports" style={{color: '#f0f0f5'}}
          onTouchTap={() => {this.props.searchByCategory(14)}} />
        <ToolbarSeparator style={{backgroundColor: '#f0f0f5'}}/>
        <FlatButton label="Languages" style={{color: '#f0f0f5'}} 
          onTouchTap={() => {this.props.searchByCategory(3)}} />
        <ToolbarSeparator style={{backgroundColor: '#f0f0f5'}}/>
        <FlatButton label="Cooking" style={{color: '#f0f0f5'}}
          onTouchTap={() => {this.props.searchByCategory(11)}} />
        <ToolbarSeparator style={{backgroundColor: '#f0f0f5'}}/>
        <FlatButton label="History" style={{color: '#f0f0f5'}} 
          onTouchTap={() => {this.props.searchByCategory(4)}} />
        <ToolbarSeparator style={{backgroundColor: '#f0f0f5'}}/>
      </ToolbarGroup>
      <ToolbarGroup float="right">
        <IconMenu
          iconButtonElement={<svg style={{marginTop: '9px', marginRight: '5px'}} fill="#f0f0f5" height="40" viewBox="0 0 24 24" width="40" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/>
              <path d="M0-.75h24v24H0z" fill="none"/>
            </svg>}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          onChange={(evt, index, item) => {this.props.searchByCategory(item)}}
          backgroundColor='#4CAF50'
        >
          <MenuItem value={2} primaryText="LITERATURE" />
          <MenuItem value={5} primaryText="MUSIC" />
          <MenuItem value={6} primaryText="PHILOSOPHY" />
          <MenuItem value={7} primaryText="MEDICINE" />
          <MenuItem value={9} primaryText="ENGINEERING" />
          <MenuItem value={13} primaryText="EDUCATION" />
          <MenuItem value={10} primaryText="MATHEMATICS" />
          <MenuItem value={15} primaryText="OTHER" />
        </IconMenu>
      </ToolbarGroup>
    </Toolbar>

  )

  }

};

const mapStateToProps = (state) => {
  return {
    categories: state.categories
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchByCategory: (categoryId) => {
      $.post('/search', {query: categoryId, queryType: 'CategoryId'}).done(function(res){
        dispatch(fetchVideoList(res))
        window.location = '/#/search'
      })
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesBar);