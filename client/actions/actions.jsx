import $ from 'jquery';

export const changeVideo = (value) => {
  return {
    type: 'CHANGE_VIDEO',
    value: value
  };
};

export const fetchVideoList = (videos) => {
  return {
    type: 'FETCH_VIDEOS',
    videos: videos
  };
};


export const updateAboutMe = (data) => {
  return {
    type: 'UPDATE_ABOUTME',
    data:data
    
  }
};

export const showAboutMeEdit = () => {
  return {
    type: 'SHOW_ABOUTME_EDIT',
  }
};

export const hideAboutMeEdit = () => {
  return {
    type: 'HIDE_ABOUTME_EDIT',
  }
};


export const changeCurrentVideo = (video) => {
  return {
    type: 'SELECT_VIDEO',
    data: video
  };
};

export const addToWatch = (info) => {
  return(dispatch) => {
    $.post('/addToWatch', info)
  }
};

export const videoFetch = () => {
	return(dispatch) => {
		dispatch(fetchVideoList());
		$.get('/fetch')
		.then((response) => 
			{
				dispatch(receivedVideoList(response));
			});
	}
};

export const changeUser = (user) => {
  return {
    type: 'CHANGE_USER',
    user: user
  }
};

export const signInUser = (user) => {
  return(dispatch) => {
    $.post('/signin', user)
    .then((data) => 
      {
        dispatch(changeUser(data));
        dispatch(authError(null));
        dispatch(hideSignInModal());
      }, (error) =>
      {
        dispatch(authError(error.responseText));
      });
  }
};

export const signOutUser = () => {
  return(dispatch) => {
    $.get('/signout')
    .then((response) => 
      {
        dispatch(changeUser({}));
      });
  }
};

export const signUpUser = (user) => {
  return(dispatch) => {
    $.post('/signup', user)
    .then((response) => 
      { 
        dispatch(signInUser(user));
        dispatch(changeUser(response));
        dispatch(authError(null));
        dispatch(hideSignUpModal());
      }, (error) =>
      {
        dispatch(authError(error.responseText));
      });
  }
};

export const authError = (error) => {
  return {
    type: 'AUTH_ERROR',
    error: error
  }
}

export const addVideo = (video) => {
  return(dispatch) => {
    $.post('/addVideo', video)
    .then((response) => 
      {
        dispatch(changeCurrentVideo(response));
      });
  }
};

export const toggleSignInModal= () => {
  return {
    type: 'SHOW_SIGNIN_MODAL',
  }
};

export const hideSignInModal= () => {
  return {
    type: 'HIDE_SIGNIN_MODAL',
  }
};

export const toggleSignUpModal= () => {
  return {
    type: 'SHOW_SIGNUP_MODAL',
  }
};

export const hideSignUpModal= () => {
  return {
    type: 'HIDE_SIGNUP_MODAL',
  }
};

export const loadAllFeedback = (feedback) => {
  return {
    type: 'LOAD_FEEDBACK',
    payload: feedback
  }
};  

export const loadQuestions = (videoid) => {
  return(dispatch) => {
    $.post('/loadQuestions', {videoid:videoid})
    .then((questions) => 
      {
        dispatch(loadAllQuestions(questions));
      });
  }
};

export const loadAllQuestions = (questions) => {
  return {
    type: 'LOAD_QUESTIONS',
    payload: questions
  }
};

export const toggleUploadModal= () => {
  return {
    type: 'SHOW_UPLOAD_MODAL',
  }
};

export const hideUploadModal= () => {
  return {
    type: 'HIDE_UPLOAD_MODAL',
  }
};

export const loadFeedback = (videoid) => {
  return(dispatch) => {
    $.post('/loadFeedback', {videoid:videoid})
    .then((feedback) => 
      {
        dispatch(loadAllFeedback(feedback));
      });
  }
};

export const addFeedback  = (feedback, username, videoID, userID) => {
  var newFeedback = {
    feedback: feedback,
    username: username,
    videoID: videoID,
    userID: userID
  };
  return(dispatch) => {
    $.post('/addFeedback', newFeedback)
    .then(() => 
      {
        dispatch(loadFeedback(videoID));
      });
  }
};

export const addQuestion  = (question, asker, videoID, userID) => {
  var newQuestion = {
    content: question,
    asker: asker,
    videoID: videoID,
    userID: userID
  };
  return(dispatch) => {
    $.post('/addQuestion', newQuestion)
    .then(() => 
      {
        dispatch(loadQuestions(videoID));
      });
  }
};

export const loadCategories = () => {
  return(dispatch) => {
    $.get('/loadCategories')
    .then((categories) => 
      {
        dispatch(populateCategories(categories));
      });
  }
};

export const populateCategories = (categories) => {
  return {
    type: 'LOAD_CATEGORIES',
    categories: categories
  }
};

export const upVote = (userID,videoID) => {
  var vote = {
    userID: userID,
    videoID:videoID
  };
  return(dispatch) => {
    $.post('/upVote', vote)
    .then((voteCount) => 
    {
      dispatch(upVoteMore(voteCount));  
    });    
  }
}

export const upVoteMore = (voteCount) => {
  return{
    type:'UP_VOTE',
    payload:voteCount
  }
}

/*******************/

export const downVote = (userID,videoID) => {
  console.log("from down container");  
  var vote = {
    userID: userID,
    videoID:videoID
  };
  return(dispatch) => {
    $.post('/downVote', vote)
    .then((voteCount) => 
    {
      console.log("from action: ",voteCount.upVotes);
      dispatch(upVoteMore(voteCount.upVotes));  
    });    
  }
}

export const downVoteMore = (voteCount) => {
  return{
    type:'DOWN_VOTE',
    payload:voteCount
  }
}

export const addAnswer  = (answer, questionID, videoID) => {
  return(dispatch) => {
    $.post('/addAnswer', {answer: answer, questionID: questionID})
    .then(() =>
      {
        dispatch(loadQuestions(videoID));
      });
  }
};

export const showAnswerEdit = (questionID) => {
  return {
    type: 'SHOW_ANSWER_EDIT',
    question: questionID
  }
};

export const hideAnswerEdit = () => {
  return {
    type: 'HIDE_ANSWER_EDIT'
  }
};

export const startVideoDurationCheck = (videoURL, filename) => {
  return {
    type: 'START_VIDEO_DURATION_CHECK',
    videoURL: videoURL,
    filename: filename
  }
};

export const stopVideoDurationCheck = () => {
  return {
    type: 'STOP_VIDEO_DURATION_CHECK'
  }
};

export const videoValidatedTrue = () => {
  return {
    type: 'VIDEO_VALIDATED_TRUE'
  }
}

export const videoValidatedFalse = () => {
  return {
    type: 'VIDEO_VALIDATED_FALSE'
  }
}

export const videoValidatedReset = () => {
  return {
    type: 'VIDEO_VALIDATED_RESET'
  }
}

export const categoriesMenu = (categoryid) => {
  return {
    type: 'CATEGORIES_MENU_CHANGE',
    categoryid: categoryid
  }
}

export const startUploadProgress = () => {
  return {
    type: 'START_UPLOAD_PROGRESS'
  }
}

export const stopUploadProgress = () => {
  return {
    type: 'STOP_UPLOAD_PROGRESS'
  }
}