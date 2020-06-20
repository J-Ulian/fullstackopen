import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addName = (e) => {
    e.preventDefault();
    const persObject = {
      name: newName,
    };

    setPersons(persons.concat(persObject));
    setNewName("");
  };

  const handleInputChange = (e) => {
    setNewName(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleInputChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((e) => (
        <p key={e.name}>{e.name}</p>
      ))}
      <br />
      <br />
      <br />
      <div>debug: {newName}</div>
    </div>
  );
};

export default App;
