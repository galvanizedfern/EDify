
import React, {Component} from 'react';
import {connect} from 'react-redux';
import VideoGrid from './VideoGrid.jsx';
import CategoriesBar from './CategoriesBar.jsx'


export default class SearchPage extends Component {
 
  render(){
    return (
      <div id = "SearchPage">
       <CategoriesBar />
      <div id = 'sheet'><VideoGrid /></div>
      </div>
    );
  }
}
export default connect ()(SearchPage);
