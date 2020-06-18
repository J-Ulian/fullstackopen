import React, { useState } from "react";
import ReactDOM from "react-dom";

const Headings = (props) => <h1>{props.value}</h1>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Average = ({ allClicks, all }) => {
  if (all > 0) {
    return (
      <tr>
        <td>average</td>
        <td>{allClicks}</td>
      </tr>
    );
  } else {
    return (
      <tr>
        <td>average</td>
      </tr>
    );
  }
};

const Positive = ({ posClicks, all }) => {
  if (all > 0) {
    return (
      <tr>
        <td>positive</td>
        <td>{posClicks}</td>
      </tr>
    );
  } else {
    return (
      <tr>
        <td>positive</td>
      </tr>
    );
  }
};

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  if (props.all > 0)
    return (
      <div>
        <table>
          <tbody>
            <Statistic text="good" value={props.good} />
            <Statistic text="neutral" value={props.neutral} />
            <Statistic text="bad" value={props.bad} />
            <Statistic text="all" value={props.all} />
            <Average allClicks={props.allClicks} all={props.all} />
            <Positive posClicks={props.posClicks} all={props.all} />
          </tbody>
        </table>
      </div>
    );
  return <div>No feedback given</div>;
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const headings = ["give feedback", "statistics"];

  const all = good + neutral + bad;

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
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        allClicks={(good - bad) / all}
        posClicks={(good / all) * 100}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
