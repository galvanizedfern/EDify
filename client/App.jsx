import React, { Component } from 'react';
import NavBar from './components/NavBar.jsx';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
import HomePage from './components/HomePage.jsx';
import SearchPage from './components/SearchPage.jsx';
import PlayerPage from './components/PlayerPage.jsx';
import ReactS3Uploader from 'react-s3-uploader';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, getState, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import ReduxPromise from 'redux-promise';
import VideoAppHandler from './reducers/reducer.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Necessary to use materialUI
injectTapEventPlugin();

let store = createStore(VideoAppHandler, applyMiddleware(ReduxPromise, thunk, logger()));

export default class App extends Component {

  constructor(props) {
    super(props)
  }

  render(){
    return (
      <div id="app-view">  
          <div className='navBar'><NavBar/></div>
          {this.props.children}
      </div>
    )	
  }
}

render((
  // React Router allows user to access different pages, depending how
  // the window location is set.
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="/search" component={SearchPage} />
        <Route path="/player" component={PlayerPage} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));


// =======Original working AppContainer component=======

// const mapStateToProps = (state) => {
//   return {
//     video: state.currentVideo,
//     videos: state.videos
//   }
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     playVideo: (value) => {
//       console.log('I got called')
//       dispatch(changeCurrentVideo(value));
//     },
//     fetchVideos: () => {
//      console.log("fetching videos!");
//       $.get('/fetch')
//       .done(function(res){
//          dispatch(fetchVideoList(res));
//       });
//     }
//   };
// };

// const AppContainer = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(App);


// ======Original working App component========

// export default class App extends Component {

//     componentWillMount(){
//         console.log('willMount');
//         this.props.fetchVideos();
//     }


//     render(){
//         console.log(this.props.videos.videos);
//         return (
//           <div id="app-view">  
//            <h1 onClick = {() => this.props.playVideo('h')}> heyyy </h1>
//            {this.props.videos.videos ? this.props.videos.videos[0].title : null}
//           </div>
//         )   
//     }
// }