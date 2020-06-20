import React, { useState } from "react";

import PersonForm from "./components/PersonForm";

import Filter from "./components/Filter";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [srch, setSrch] = useState("");
  let persToShow = [...persons];

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumChange = (e) => {
    setNewNum(e.target.value);
  };

  const handleSrch = (e) => {
    setSrch(e.target.value);
  };

  const addName = (e) => {
    e.preventDefault();
    const names = persons.map((e) => e.name);
    //console.log(names.indexOf(newName));
    if (names.indexOf(newName) < 0) {
      const persObject = {
        name: newName,
        number: newNum,
      };
      setPersons(persons.concat(persObject));
      setNewName("");
      setNewNum("");
    } else {
      alert(`${newName} is already added to phonebook`);
      setNewNum("");
      setNewName("");
    }
  };

  var func = (function mySearch() {
    var stringToGoIntoTheRegex = srch;
    var regex = new RegExp(stringToGoIntoTheRegex, "i");
    var result = persons.filter((per) => per.name.match(regex));
    //string.match(regex);
    persToShow = result;
  })();

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with
        <Filter value={srch} onChange={handleSrch} persons={persons} />
      </div>
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNum={newNum}
        handleNameChange={handleNameChange}
        handleNumChange={handleNumChange}
        addName={addName}
      />

      <h3>Numbers</h3>
      <Persons persToShow={persToShow} />
    </div>
  );
};

export default App;
