import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
export const fields = ['title', 'mentor'];


class SearchBar extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  };

  render() {

    const {
      fields: {title, mentor},
      handleSubmit,
      resetForm,
      submitting
      } = this.props;

    return (
      <form className='searchForm' onSubmit={handleSubmit}>
        <label className='searchTitle'>Search:</label>
        <div className='searchField'>
          <input type="text" placeholder=" Title" {...title}/>
        </div>
        <div className='searchField'>
          <input type="text" placeholder="Mentor" {...mentor}/>
        </div>
        <div className='searchField'>
          <button type="submit" className='searchField' disabled={submitting}>
            {submitting ? <i/> : <i/>} Submit
          </button>
          <button type="button" className='searchField' disabled={submitting} onClick={resetForm}>
            Clear Values
          </button>
        </div>
      </form>

    );
  }
}

export default reduxForm({
  form: 'simple',
  fields
})(SearchBar);

