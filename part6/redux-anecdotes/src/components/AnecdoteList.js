import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { voteFor } from '../reducers/anecdoteReducer';
import { notificationChange } from '../reducers/notificationReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (state.filter === '') {
      return state.anecdotes;
    } else {
      let result;
      const func = (function mySearch() {
        const stringToGoIntoTheRegex = state.filter;
        const regex = new RegExp(stringToGoIntoTheRegex, 'i');
        result = state.anecdotes.filter((per) => per.content.match(regex));
      })();
      return result;
    }
  });
  const dispatch = useDispatch();

  const voting = (id, content, votes) => {
    dispatch(voteFor(content, id, votes));
    dispatch(setNotification(`you voted '${content}'`, 10));
  };

  const byVotes = (b1, b2) => b2.votes - b1.votes;
  return (
    <div>
      <h2> Anecdotes </h2>
      {anecdotes.sort(byVotes).map((anecdote) => (
        <div key={anecdote.id}>
          <div> {anecdote.content} </div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() =>
                voting(anecdote.id, anecdote.content, anecdote.votes)
              }
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
