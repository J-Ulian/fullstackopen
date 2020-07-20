import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PromisePolyfill from 'promise-polyfill';

if (!window.Promise) {
  window.Promise = PromisePolyfill;
}

const useNotes = (url) => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    axios.get(url).then((response) => {
      setNotes(response.data);
    });
  }, [url]);
  return notes;
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anecdotes: [],
      current: 0,
    };
  }

  componentDidMount = () => {
    axios.get('http://localhost:3001/anecdotes').then((response) => {
      this.setState({ anecdotes: response.data });
    });
  };

  handleClick = () => {
    const current = Math.floor(
      Math.random() * (this.state.anecdotes.length - 1)
    );
    this.setState({ current });
  };

  render() {
    if (this.state.anecdotes.length === 0) {
      return <div> no anecdotes... </div>;
    }
    return (
      <div>
        <h1> anecdote of the day </h1>{' '}
        <div> {this.state.anecdotes[this.state.current].content} </div>{' '}
        <button onClick={this.handleClick}> next </button>{' '}
      </div>
    );
  }
}

export default App;

/*
For comparison here is the same application as a Functional component:

const App = () => {
  const [anecdotes, setAnecdotes] = useState([])
  const [current, setCurrent] = useState(0)

  useEffect(() =>{
    axios.get('http://localhost:3001/anecdotes').then(response => {
      setAnecdotes(response.data)
    })
  },[])

  const handleClick = () => {
    setCurrent(Math.round(Math.random() * (anecdotes.length - 1)))
  }

  if (anecdotes.length === 0) {
    return <div>no anecdotes...</div>
  }

  return (
    <div>
      <h1>anecdote of the day</h1>
      <div>{anecdotes[current].content}</div>
      <button onClick={handleClick}>next</button>
    </div>
  )
}

*/
