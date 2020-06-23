import React, { useState, useEffect } from "react";
import axios from "axios";

import personService from "./services/persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = ({ people }) => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [srch, setSrch] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  let persToShow = [...persons];

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

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
    //console.log(persons);
    if (names.indexOf(newName) < 0) {
      const persObject = {
        name: newName,
        number: newNum,
      };
      personService.create(persObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setErrorMessage(`Added  ${newName}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNewName("");
        setNewNum("");
      });
    } else {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const pers = persons.find((e) => e.name === newName);
        const changedPerson = {
          ...pers,
          number: newNum,
        };
        personService
          .update(pers.id, changedPerson)
          .then((returnedPers) => {
            setPersons(
              persons.map((p) => (p.id !== pers.id ? p : returnedPers))
            );
          })
          .catch((error) => {
            setErrorMessage(
              `Information of ${pers.name} has already been removed from server`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
            setPersons(persons.filter((p) => p.id !== pers.id));
          });
        setErrorMessage(`Number of ${newName} is changed to ${newNum}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
      setNewNum("");
      setNewName("");
    }
  };

  const delPer = (id, name) => {
    const person = persons.find((n) => n.id === id);
    //console.log(person);
    if (window.confirm(`Delete ${name}?`)) {
      setPersons(persons.filter((e) => e.id !== id));
      personService.del(id);
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
      <h2> Phonebook </h2>
      <Notification message={errorMessage} />
      <div>
        filter shown with
        <Filter value={srch} onChange={handleSrch} persons={persons} />
      </div>
      <h3> Add a new </h3>
      <PersonForm
        newName={newName}
        newNum={newNum}
        handleNameChange={handleNameChange}
        handleNumChange={handleNumChange}
        addName={addName}
      />
      <h3> Numbers </h3> <Persons persToShow={persToShow} delPer={delPer} />
    </div>
  );
};

export default App;
