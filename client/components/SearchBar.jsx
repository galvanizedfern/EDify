import React, {Component, PropTypes} from 'react';
export const fields = ['title', 'mentor'];
import TextField from 'material-ui/lib/text-field';
import IconButton from 'material-ui/lib/icon-button';


export default class SearchBar extends Component {

  render() {
    return (
      <div>
        <TextField ref='search' style={{backgroundColor: '#f0f0f5', paddingLeft: '7px', height: '38px', width: '350px' , marginTop: '15px'}} hintStyle={{paddingTop: '4px', height: '19px'}} underlineShow={false} hintText="Search..." />
        <IconButton iconClassName="material-icons md-24" style={{padding: '5px', paddingTop: '25px', position: 'absolute', float: 'right'}} onClick={() => this.props.handleSubmit(this.refs.search.getValue(), "title")}>search</IconButton>
      </div>
    );
  }
}

