import { combineReducers } from 'redux'
import $ from 'jquery';
import {reducer as formReducer} from 'redux-form';

const CurrentVideo = (state = {}, action) => {
  var newstate = Object.assign({},state);
  switch (action.type) {
    case 'SELECT_VIDEO':
    	console.log(action.data);
      newstate.currentVideo = action.data;
      return newstate;
    default:
      return state;
  }
}

const VideoList = (state = {}, action) => {
	var newstate = Object.assign({}, state);
	switch (action.type) {
		case 'FETCH_VIDEOS':
			console.log("fetching videos");
      newstate.videos = action.videos;
    case 'RECEIEVED_VIDEOS':
      console.log("from reducer received: ",action.videos);
      newstate.videos = action.videos;
      console.log("newstate.videos", newstate.videos )
      return newstate;

		default:
			return state;	
	}
}

// const Video = (state = {}, action) => {
//   var news = Object.assign({}, state);
//   switch (action.type) {
//     case 'RECEIEVED_VIDEOS':
//       console.log("from reducer received: ",action.videos);
//       news.found = action.videos;
//       console.log("news.found.title is", news.found.title )
//         return news.found;
//     default:
//       return state; 
//   }
// }

const UserInfo = (state = {}, action) => {
  var newstate = Object.assign({}, state);
  switch (action.type) {
    case 'UPDATE_USER_INFO':
      newstate.user = action.info;
      return newstate;
    default:
      return state;
  }
}

const User = (state = {}, action) => {
  var newState = Object.assign({},state);
  switch(action.type) {
    case 'CHANGE_USER':
      console.log('from reducer: ', action.user);
      newState.user = action.user;
    default:
      return newState;
  }
}

const VideoAppHandler = combineReducers({
  currentVideo: CurrentVideo,
  videos: VideoList,
  form: formReducer,
  videos: VideoList,
  user: User

});

export default VideoAppHandler;