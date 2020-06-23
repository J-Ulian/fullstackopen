import React from "react";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  } else if (message.includes("Information")) {
    return <div className="errorred">{message}</div>;
  }

  return <div className="error">{message}</div>;
};

export default Notification;
