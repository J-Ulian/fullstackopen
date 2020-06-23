import React from "react";

const Persons = ({ persToShow, delPer, pers }) => {
  //console.log(persToShow);
  return (
    <div>
      {persToShow.map((e) => (
        <p key={e.name}>
          {e.name}
          &nbsp;
          {e.number}
          &nbsp;
          <button onClick={() => delPer(e.id, e.name)}>delete</button>
        </p>
      ))}
    </div>
  );
};

export default Persons;
