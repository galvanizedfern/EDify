import React, {Component} from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import {connect} from 'react-redux';
import ReactS3Uploader from 'react-s3-uploader';
import VideoDurationValidater from './VideoDurationValidater.jsx'

import { addVideo, hideUploadModal, loadCategories, startVideoDurationCheck, stopVideoDurationCheck, videoValidatedTrue } from '../actions/actions.jsx';
import { videoValidatedFalse, videoValidatedReset, categoriesMenu, startUploadProgress, stopUploadProgress } from '../actions/actions.jsx';

export default class UploadModal extends Component {

  render() {
    var displayUploadModal = this.props.displayUploadModal;
    var user = this.props.user;
    var categories = this.props.categories
    var videoURL = this.props.checkVideoDuration.videoURL;
    var filename = this.props.checkVideoDuration.filename;
    var checking = this.props.checkVideoDuration.checking;
    var submitVideo = this.props.submitVideo;
    var closeModal = this.props.closeModal;
    var startVideoDurationCheck = this.props.startVideoDurationCheck;
    var stopVideoDurationCheck = this.props.stopVideoDurationCheck;
    var videoIsValidated = this.props.videoIsValidated;
    var videoValidatedTrue = this.props.videoValidatedTrue;
    var videoValidatedFalse = this.props.videoValidatedFalse;
    var videoValidatedReset = this.props.videoValidatedReset;
    var categoriesMenu = this.props.categoriesMenu;
    var categorySelected = this.props.categorySelected;
    var startUploadProgress = this.props.startUploadProgress;
    var stopUploadProgress = this.props.stopUploadProgress;
    var processing = this.props.checkVideoDuration.proccessing;
    console.log(processing);


    const items = [];
    for (let i = 0; i < categories.length; i++) {
      items.push(<MenuItem value={categories[i].id} key={i} primaryText={categories[i].name}/>);
    }

    const style = {
      marginRight: 20,
    };

    const customContentStyle = {
      width: 330,
      maxWidth: 'none',
    };


    let coverUrl;

    const actions = [
      <FlatButton
        label='Cancel'
        style={{color: '#ff4f1a'}}
        onClick={() => {
          closeModal();
          videoValidatedReset();
          categoriesMenu({});
          stopUploadProgress();
        }}
      />,
      <FlatButton
        label='Submit'
        disabled={videoIsValidated === true ? false : true}
        style={{color: '#303F9F'}}
        onClick={() => {
          submitVideo({title: this.refs.title.getValue(), description: this.refs.description.getValue(), cover: coverUrl, user: user, url: videoURL, categoryId: categorySelected});
          videoValidatedReset();
          categoriesMenu({});
        }}
      />
    ];

    return (
      <div>
        <Dialog
          title='Upload Video'
          actions={actions}
          modal={false}
          contentStyle={customContentStyle}
          open={displayUploadModal === true}
        >
          <TextField
            ref="title"
            floatingLabelText="Title"
            id="title"
          />
          <TextField
            ref="description"
            floatingLabelText="Description"
            type="description"
            id="description"
          />
          Categories
          <DropDownMenu maxHeight={300}
            value={typeof categorySelected === 'object' ? 1 : categorySelected}
            onChange={(evt, index, item) => {
              categoriesMenu(item);
            }}
            ref="category">
            {items}
          </DropDownMenu>
          <div><h4 className="uploadTitle">Video File (.mp4)</h4>
          <ReactS3Uploader  
            signingUrl="/s3/sign"
            onProgress={(percent) => {
              if (percent > 0 && percent < 20) {
                startUploadProgress();
              }
            }}
            onFinish={(videoResponse) => {
              var filename = videoResponse.filename;
              videoURL = 'https://s3-us-west-1.amazonaws.com/video.bucket1/' + filename;
              startVideoDurationCheck(videoURL, filename);
              stopUploadProgress();
            }}
          /></div>
          {videoIsValidated === true ? 
            (<div><h4 className="uploadTitle">Thumbnail File (.jpg)</h4>
            <ReactS3Uploader  
              signingUrl="/s3/sign"
              onFinish={(coverResponse) => {
                console.log('cover response', coverResponse.filename)
                coverUrl = 'https://s3-us-west-1.amazonaws.com/video.bucket1/' + coverResponse.filename;
              }}
            /></div>) : videoIsValidated === false ?
            (<span>Your video was too long! Only videos under 5 minutes long may be uploaded.</span>)
            : ""}
          {processing === true ? 
          (<span>Processing video...</span>)
          : ""}
        </Dialog>
        <div id='durationCheck' >
          {checking === true ?
          <VideoDurationValidater videoURL={videoURL}
           filename={filename} 
           stopVideoDurationCheck={stopVideoDurationCheck} 
           videoValidatedTrue={videoValidatedTrue}
           videoValidatedFalse={videoValidatedFalse}
           /> :
          ''}
        </div>
       </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    displayUploadModal: state.displayUploadModal,
    user: state.user,
    categories: state.categories,
    checkVideoDuration: state.checkVideoDuration,
    videoIsValidated: state.videoIsValidated,
    categorySelected: state.categoriesMenu
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    // only handles adding the new video to the database; s3 uploader handles adding the video to s3
    submitVideo: (video) => {
      console.log('Submitting new video')
      dispatch(addVideo(video))
      dispatch(hideUploadModal())
    },
    closeModal: () => {
      dispatch(hideUploadModal())
    },
    startVideoDurationCheck: (videoURL, filename) => {
      dispatch(startVideoDurationCheck(videoURL, filename));
    },
    stopVideoDurationCheck: () => {
      dispatch(stopVideoDurationCheck());
    },
    videoValidatedTrue: () => {
      dispatch(videoValidatedTrue());
    },
    videoValidatedFalse: () => {
      dispatch(videoValidatedFalse());
    },
    videoValidatedReset: () => {
      dispatch(videoValidatedReset());
    },
    categoriesMenu: (id) => {
      dispatch(categoriesMenu(id));
    },
    startUploadProgress: () => {
      dispatch(startUploadProgress());
    },
    stopUploadProgress: () => {
      dispatch(stopUploadProgress());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadModal);