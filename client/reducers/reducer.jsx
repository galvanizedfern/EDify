import { combineReducers } from 'redux'
import $ from 'jquery';

const CurrentVideo = (state = {}, action) => {
  var video = Object.assign({},state);
  switch (action.type) {
    case 'SELECT_VIDEO':
      return action.data;
    case 'UP_VOTE':
    console.log("videois:", video);
      video.upVotes = action.payload;
      return video;
    case 'DOWN_VOTE':
      video.downVotes = action.payload;
      return video;
    default:
      return state;
  }
}

const VideoList = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_VIDEOS':
      return action.videos;
    default:
      return state; 
  }
}


const User = (state = {}, action) => {
  var user = action.data;
  switch(action.type) {
    case 'CHANGE_USER':
      user = action.user;
      return user;
    case 'UPDATE_ABOUTME':
      user.aboutMe = action.data.aboutMe;
      return user;
    default:
      return state;
  }
}


const ToggleAboutMeEdit= (state = {}, action) => {
  switch(action.type) {
    case 'SHOW_ABOUTME_EDIT':
      return true;
    case "HIDE_ABOUTME_EDIT":
      return false;
    default:
      return state;
  }
}

const ToggleAnswerEdit= (state = {}, action) => {
  switch(action.type) {
    case 'SHOW_ANSWER_EDIT':
      return action.question;
    case "HIDE_ANSWER_EDIT":
      return "";
    default:
      return state;
  }
}


const SignInModal = (state = {}, action) => {
  switch (action.type) {
    case 'SHOW_SIGNIN_MODAL':
      return true;
    case 'HIDE_SIGNIN_MODAL':
      return false;
    default:
      return state;
  }
}

const SignUpModal = (state = {}, action) => {
  switch (action.type) {
    case 'SHOW_SIGNUP_MODAL':
      return true;
    case 'HIDE_SIGNUP_MODAL':
      return false;
    default:
      return state;
  }
}

const UploadModal = (state = {}, action) => {
  switch (action.type) {
    case 'SHOW_UPLOAD_MODAL':
      return true;
    case 'HIDE_UPLOAD_MODAL':
      return false;
    default:
      return state;
  }
}

const Feedback = (state = {}, action) => {
  switch (action.type) {
    case 'LOAD_FEEDBACK':
      return action.payload;
    default:
      return state;  
  }
}

const Categories = (state = {}, action) => {
  switch (action.type) {
    case 'LOAD_CATEGORIES':
      return action.categories;
    default:
      return state;  
  }
}

const Questions = (state = {}, action) => {
  switch(action.type) {
    case 'LOAD_QUESTIONS' :
      return action.payload;
    default:
      return state;
  }
}

const CheckVideoDuration = (state = {}, action) => {
  var videoCheck = Object.assign({},state);
  switch(action.type) {
    case 'START_VIDEO_DURATION_CHECK':
      videoCheck.checking = true;
      videoCheck.videoURL = action.videoURL;
      videoCheck.filename = action.filename;
      return videoCheck;
    case 'STOP_VIDEO_DURATION_CHECK':
      videoCheck.checking = false;
      return videoCheck;
    default:
      return state;
  }
}

const VideoIsValidated = (state = {}, action) => {
  switch(action.type) {
    case 'VIDEO_VALIDATED_TRUE':
      return true;
    case 'VIDEO_VALIDATED_FALSE':
      return false;
    case 'VIDEO_VALIDATED_RESET':
      return {};
    default:
      return state;
  }
}

const AuthenticationError = (state = {}, action) => {
  switch(action.type) {
    case 'AUTHENTICATION_ERROR':
      return action.error;
    default:
      return state;
  }
}

const VideoAppHandler = combineReducers({
  currentVideo: CurrentVideo,
  videos: VideoList,
  user: User,
  categories: Categories,
  feedback: Feedback,
  questions: Questions,
  displaySignInModal: SignInModal,
  displaySignUpModal: SignUpModal,
  displayUploadModal: UploadModal,
  aboutMeEdit: ToggleAboutMeEdit,
  answerEdit: ToggleAnswerEdit,
  checkVideoDuration: CheckVideoDuration,
  videoIsValidated: VideoIsValidated,
  authenticationError: AuthenticationError
});

export default VideoAppHandler;