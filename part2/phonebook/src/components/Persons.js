import React from "react";

const Persons = ({ persToShow }) => (
  <div>
    {" "}
    {persToShow.map((e) => (
      <p key={e.name}>
        {e.name}
        &nbsp;
        {e.number}
      </p>
    ))}
  </div>
);

export default Persons;
