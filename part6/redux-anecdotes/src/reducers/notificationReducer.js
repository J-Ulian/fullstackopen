const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification;
    default:
      return state;
  }
};

export const notificationChange = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    notification,
  };
};
export const setNotification = (notification, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification,
    });

    var myVar;

    (function myStopFunction() {
      clearTimeout(myVar);
    })();

    (function myFunction() {
      myVar = setTimeout(
        () =>
          dispatch({
            type: 'SET_NOTIFICATION',
            notification: '',
          }),
        time * 1000
      );
    })();

    // setTimeout(() => dispatch({
    //   type: 'SET_NOTIFICATION',
    //   notification: ''
    // }), time * 1000);
  };
};

// export const voteFor = (content, id, votes) => {
//   return async (dispatch) => {
//     const changedAnecdote = await anecdoteService.plusVote(content, id, votes);
//     dispatch({
//       type: 'VOTE',
//       data: {
//         id,
//       },
//     });
//   };
// };

export default notificationReducer;
