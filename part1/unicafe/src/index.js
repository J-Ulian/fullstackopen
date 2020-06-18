import React, { useState } from "react";
import ReactDOM from "react-dom";

const Headings = (props) => <h1>{props.value}</h1>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const headings = ["give feedback", "statistics"];

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Headings value={headings[0]} />
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
      <Headings value={headings[1]} />
      good {good} <br />
      neutral {neutral} <br></br>
      bad {bad}
      <br></br>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
