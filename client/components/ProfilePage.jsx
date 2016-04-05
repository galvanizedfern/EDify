import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { fetchVideoList, updateAboutMe, aboutMeEdit, showAboutMeEdit, hideAboutMeEdit, fetchWatchList} from '../actions/actions.jsx';
import UserInfo from './UserInfo.jsx';
import VideoGrid from './VideoGrid.jsx';
import $ from 'jquery';
import Tab from 'material-ui/lib/tabs/tab';
import Tabs from 'material-ui/lib/tabs/tabs';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';


const mapStateToProps = (state) => {
  return {
    user: state.user,
    aboutMeEdit:state.aboutMeEdit,
    aboutMe: state.user.aboutMe,
    videos: state.videos
  }  
}

const mapDispatchToProps = (dispatch) => {
 
  return {
    updateUserInfo: function(info, user, aboutMeEdit) {
      
      if (aboutMeEdit === true) {
        $.post('/aboutMe', {info:info, username: user.username})
        .done(function(data){
          dispatch(updateAboutMe(data));
          dispatch(hideAboutMeEdit());
        })
      } else {
        dispatch(showAboutMeEdit())
      }

    },
    fetchUploadedVideos: function(user) {
      $.post('/fetch', user)
        .done(function(res){
           dispatch(fetchVideoList(res));
        });
    },
    fetchWatchList: function(userid) {
      $.post('/fetchWatchList', {userid: userid})
      .done( (videos) => {
        dispatch(fetchVideoList(videos));
      });
    }
  }
}


export class ProfilePage extends Component {


componentDidMount(){
    this.props.fetchUploadedVideos(this.props.user);
}


render(){
var aboutMeEdit = <form className="aboutMe">
                        <textarea rows= "15" cols = "35" ref="aboutMe" >{this.props.aboutMe}</textarea>
                       <button type="button" className="aboutMeSubmitButton" onClick={() => this.props.updateUserInfo(this.refs.aboutMe.value, this.props.user,this.props.aboutMeEdit)}>
                          Save Changes
                        </button>
                      </form>
    var aboutMe = <div className="aboutMe" onClick={ () => this.props.updateUserInfo(null,this.props.user,this.props.aboutMeEdit) }> {this.props.aboutMe}</div>

  var divider = {
    borderRight: '1px solid black'
  }
  
  return (
    <div id = "ProfilePage">
     <GridList
          
          padding={0}
          cols={9}
          cellHeight={700}
        >
        <GridTile
        style={divider}
          cols={2}
        >
        <h2 className='welcomeBackTitle'>Welcome Back, {this.props.user.username}! </h2>
        <div id = "AboutMe">
       <h4> About me: </h4>
        <div className="aboutMeContainer">
          {this.props.aboutMeEdit === true ? aboutMeEdit : aboutMe}
      </div>
      </div>
      </GridTile>
     
      <GridTile cols={7}>
      <Tabs className= "tabs">
        <Tab label="Uploaded Videos" onClick={ () => this.props.fetchUploadedVideos(this.props.user)}>
         
          <VideoGrid />

        </Tab>
        <Tab label="Watch List" onClick={ () => this.props.fetchWatchList(this.props.user.id)}>
          <VideoGrid />
        </Tab>
      </Tabs>
   
      </GridTile>
      </GridList>
  </div>
  );
}
}



   // <UserInfo user= {this.props.user}  updateUserInfo={this.props.updateUserInfo} />


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage);
