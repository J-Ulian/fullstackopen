import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers/anecdoteReducer';
import { createAnecdote, voteFor } from './reducers/anecdoteReducer';

const store = createStore(reducer);

const App = () => {
  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    console.log(content);
    event.target.anecdote.value = '';
    dispatch(createAnecdote(content));
  };

  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteFor(id));
  };

  return (
    <div>
      <h2> Anecdotes </h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div> {anecdote.content} </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}> vote </button>
          </div>
        </div>
      ))}
      <h2> create new </h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit"> create </button>
      </form>
    </div>
  );
};

export default App;
