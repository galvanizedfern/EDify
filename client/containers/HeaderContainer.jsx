import React, {Component} from 'react';
import LogoBox from '../components/Header/LogoBox.jsx';
import AuthBox from '../components/Header/AuthBox.jsx';
import SearchBar from '../components/Header/SearchBar.jsx';

export default class Header extends Component {

  render(){
  	return (
  	  <div id = "header">
	  		<div id = 'box'><LogoBox /></div>
  	  	<div id = 'box'><SearchBar /></div>
				<div id = 'box'><AuthBox /></div>
  	  </div>
  	);
  }
}
