import React, { Component } from 'react';
import { Auth } from '../components/Auth/Auth.jsx';
import Greeting from '../greeting.js';

export default class SearchContainer extends Component {

  render(){
    return (
      <div id="app-view">
        <Greeting name = "Thomas" />
      </div>
    )
  }
}
