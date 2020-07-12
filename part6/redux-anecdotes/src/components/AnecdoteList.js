import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { voteFor } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const byVotes = (b1, b2) => b2.votes - b1.votes;
  return (
    <div>
      <h2> Anecdotes </h2>{' '}
      {anecdotes.sort(byVotes).map((anecdote) => (
        <div key={anecdote.id}>
          <div> {anecdote.content} </div>{' '}
          <div>
            has {anecdote.votes}{' '}
            <button onClick={() => dispatch(voteFor(anecdote.id))}>
              {' '}
              vote{' '}
            </button>{' '}
          </div>{' '}
        </div>
      ))}{' '}
    </div>
  );
};

export default AnecdoteList;
