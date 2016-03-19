import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
export const fields = ['title', 'mentor'];
import TextField from 'material-ui/lib/text-field';
import IconButton from 'material-ui/lib/icon-button';


export default function SearchBar({onSubmit}) {
  return (
    <div>
      <TextField ref='search' hintText="Search" />
      <IconButton iconClassName="material-icons md-24" onClick={() => console.log(this.refs.search.getValue())}>search</IconButton>
    </div>
  );
}

