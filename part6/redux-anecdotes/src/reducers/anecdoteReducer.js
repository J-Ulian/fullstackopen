import anecdoteService from '../services/anecdotes';

/* eslint-disable default-case */

var myVar;

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    });

    dispatch({
      type: 'SET_NOTIFICATION',
      notification: `you added: ${content}`,
    });

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
        5 * 1000
      );
    })();
  };
};

export const voteFor = (id, content, votes) => {
  return async (dispatch) => {
    const changedAnecdote = await anecdoteService.plusVote(id, content, votes);
    dispatch({
      type: 'VOTE',
      data: {
        id,
      },
    });
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: `you voted for: ${content}`,
    });

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
        5 * 1000
      );
    })();
  };
};

export const setNotification = (notification, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification,
    });

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

const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = [], action) => {
  console.log('state now: ', state);
  console.log('action', action);
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id;
      const anecdoteToChange = state.find((a) => a.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      console.log(state.map((a) => (a.id === id ? changedAnecdote : a)));
      return state.map((a) => (a.id !== id ? a : changedAnecdote));
    case 'NEW_ANECDOTE':
      return [...state, action.data];
    case 'INIT_ANECDOTES':
      return action.data;
  }

  return state;
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    });
  };
};

export default reducer;
