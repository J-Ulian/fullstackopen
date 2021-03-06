import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { voteFor } from '../reducers/anecdoteReducer';
import { notificationChange } from '../reducers/notificationReducer';
import { setNotification } from '../reducers/notificationReducer';
import { connect } from 'react-redux';

const AnecdoteList = (props) => {
  const dispatch = useDispatch();

  const voting = (id, content, votes) => {
    dispatch(voteFor(id, content, votes));
    dispatch(setNotification(`you voted '${content}'`, 10));
  };

  //rex exp filter
  const byVotes = (b1, b2) => b2.votes - b1.votes;

  //filter filter
  let filter = props.filter.toLowerCase();
  let anecdotes2 = props.anecdotes.filter((a) =>
    a.content.toLowerCase().includes(filter)
  );
  console.log(anecdotes2);

  return (
    <div>
      <h2> Anecdotes </h2>
      {props.anecdotes.sort(byVotes).map((anecdote) => (
        <div key={anecdote.id}>
          <div> {anecdote.content} </div>
          <div>
            has {anecdote.votes}
            <button
              onClick={
                () =>
                  props.voteFor(anecdote.id, anecdote.content, anecdote.votes)
                // ,() =>
                //   props.setNotification(`you voted '${anecdote.content}'`, 5)
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

const mapStateToProps = (state) => {
  console.log(state);
  if (state.filter === '') {
    return { anecdotes: state.anecdotes, filter: state.filter };
  } else {
    let result;
    const func = (function mySearch() {
      const stringToGoIntoTheRegex = state.filter;
      const regex = new RegExp(stringToGoIntoTheRegex, 'i');
      result = state.anecdotes.filter((per) => per.content.match(regex));
    })();
    return { anecdotes: result, filter: state.filter };
  }
};

const mapDispatchToProps = {
  voteFor,
  setNotification,
};

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);
export default ConnectedAnecdoteList;
