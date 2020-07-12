import React from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import VisibilityFilter from './components/VisibilityFilter';

const App = () => {
  return (
    <div>
      <AnecdoteList />

      <VisibilityFilter />

      <AnecdoteForm />
    </div>
  );
};

export default App;
