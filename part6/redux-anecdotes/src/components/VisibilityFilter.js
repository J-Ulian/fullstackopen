import React from 'react';
import { filterChange } from '../reducers/filterReducer';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';

const VisibilityFilter = (props) => {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    props.filterChange(event.target.value);
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input type="text" onChange={handleChange} />{' '}
    </div>
  );
};

export default connect(null, {
  filterChange,
})(VisibilityFilter);
