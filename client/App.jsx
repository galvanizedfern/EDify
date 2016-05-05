import React, { Component } from 'react';
import NavBar from './components/NavBar.jsx';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
import HomePage from './components/HomePage.jsx';
import SearchPage from './components/SearchPage.jsx';
import ProfilePage from './components/ProfilePage.jsx';
import PlayerPage from './components/PlayerPage.jsx';
import SignInModal from './components/SignInModal.jsx';
import SignUpModal from './components/SignUpModal.jsx';
import UploadModal from './components/UploadModal.jsx';
import ReactS3Uploader from 'react-s3-uploader';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, getState, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import ReduxPromise from 'redux-promise';
import VideoAppHandler from './reducers/reducer.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import MyTheme from './styles/materialTheme.js';

injectTapEventPlugin();

let store = createStore(VideoAppHandler, applyMiddleware(ReduxPromise, thunk, logger()));

export default class App extends Component {
 
  constructor(props) {
    super(props)
  }

 //the key passed through context must be called "muiTheme"
 childContextTypes = {
    muiTheme: React.PropTypes.object,
  };
  getChildContext() {
      return {
          muiTheme: ThemeManager.getMuiTheme(MyTheme),
      };
  }

  render(){
    return (
      <div id="app-view">  
        <SignInModal/>
        <SignUpModal/>
        <UploadModal/>
        <div className='navBar'><NavBar/></div>
        {this.props.children}
      </div>
    )	
  }
}

App.childContextTypes = {
    muiTheme: React.PropTypes.object
};

render((
  // React Router allows user to access different pages, depending how
  // the window location is set.
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="/search" component={SearchPage} />
        <Route path="/player" component={PlayerPage} />
        <Route path="/profile" component={ProfilePage} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));

