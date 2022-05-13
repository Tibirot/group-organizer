import { useState, createContext, useEffect } from 'react'
import Person from '../models/person.model';

interface PersCtx {
  persons: Person[];
  deletePerson: (id: number) => void;
  addPerson: (personToAdd: Partial<Person>) => void;
  editPerson: (personToEdit: Partial<Person>, id: number) => void;
}

const apiUrl = process.env.REACT_APP_API_URL;

const defaultState: PersCtx = {
  persons: [],
  deletePerson: (id: number): void => { },
  addPerson: function (personToAdd: Partial<Person>): void { },
  editPerson: function (personToEdit: Partial<Person>, id: number): void { }
}

const PersonsContext = createContext<PersCtx>(defaultState);
export const PersonsProvider = ({ children }: any) => {
  const [persons, setPersons] = useState<Person[]>([]);

  const getAllPersons = async () => {
    const response = await fetch(`${apiUrl}/persons`);
    const data = await response.json();
    setPersons(data as Person[]);
  };

  const deletePerson = (id: number) => {
    if (id === 0) return;
    const reqOpt = {
      method: 'DELETE',
    };
    fetch(`${apiUrl}/deleteperson/${id}`, reqOpt);
    getAllPersons();
  };

  const addPerson = (personToAdd: Partial<Person>) => {
    const reqOpt = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(personToAdd)
    };
    fetch(`${apiUrl}/addperson`, reqOpt);
    getAllPersons();
  };

  const editPerson = (personToEdit: Partial<Person>, id: number) => {
    if (id === 0) return;
    const reqOpt = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(personToEdit)
    };
    fetch(`${apiUrl}/editPerson/${id}`, reqOpt);
    getAllPersons();
  }

  useEffect(() => {
    getAllPersons();

    return () => { }
  }, [persons]);


  return (
    <PersonsContext.Provider value={{ persons, deletePerson, addPerson, editPerson }}>{children}</PersonsContext.Provider>
  );
}
export default PersonsContext;