import React, { Component } from 'react';
import { SearchContainer } from './SearchContainer.jsx';
import { MainVideoListContainer } from './MainVideoListContainer.jsx';
import Greeting from '../greeting.js';

export default class AppContainer extends Component {

  render(){
    return (
      <div id="app-view">
        <Greeting name = "Liz" />
        <Greeting name = "Hazal" />
        <SearchContainer />
      </div>
    );
  }
}
