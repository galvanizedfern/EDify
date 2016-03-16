import { combineReducers } from 'redux'
import $ from 'jquery';

const CurrentVideo = (state = "a", action) => {
  switch (action.type) {
    case 'CHANGE_VIDEO':
    console.log(action.value);
      return action.value
    default:
      return state;
  }
}

const VideoList = (state = {}, action) => {
	var newstate = Object.assign({},state);
	switch (action.type) {
		case 'FETCH_VIDEOS':
			console.log("fetching videos");
			$.get('/fetch').done(function(res){
				console.log("response: ",res);
				newstate.videos = res;
			});
			return newstate;
		default:
			return newstate;	
	}
}

const VideoAppHandler = combineReducers({
  currentVideo: CurrentVideo,
  videos:VideoList
});

export default VideoAppHandler;