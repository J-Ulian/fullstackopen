import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const App = (props) => {
  const [selected, setSelected] = useState(0);

  const randClick = () => {
    const randomnumber = Math.floor(Math.random() * (anecdotes.length - 0)) + 0;
    setSelected(randomnumber);
  };
  const n = props.anecdotes.length;

  const [points, setPoint] = useState(Array(n).fill(0));

  const upVote = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoint(copy);
  };

  return (
    <div>
      <h2>{props.anecdotes[selected]}</h2>
      <h2>has {points[selected]} votes</h2>
      <br />
      <Button onClick={randClick} text="next anecdote" />
      <Button onClick={upVote} text="vote" />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
