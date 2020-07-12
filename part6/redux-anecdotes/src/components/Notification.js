import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { notificationChange } from '../reducers/notificationReducer';

const Notification = (props) => {
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };
  return <div style={style}> {notification} </div>;
};

export default Notification;
