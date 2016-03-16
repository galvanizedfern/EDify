import React, { Component } from 'react';
// import { SearchContainer } from './SearchContainer.jsx';
// import { MainVideoListContainer } from './MainVideoListContainer.jsx';

const App = ({playVideo,fetchVideos}) => {
// export default class App extends Component {
  // render () {
    // console.log(this.props.playVideo);
    return (
      <div id="app-view">  
       <h1 onClick = {() => playVideo('h')}> heyyy </h1>
		<h1 onClick = {() => fetchVideos()}> Fetch Videos </h1>
      </div>
    )
}

export default App;