import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Group from "../../models/group.model";
import Person from "../../models/person.model";
import AddEditPersonModal from "./add-edit-person-modal";
import PersonCard from "./person-card";


const Persons = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [groups, setGroups] = useState<Group[]>([]);

  const apiUrl = process.env.REACT_APP_API_URL;

  const getAllPersons = async () => {
    const response = await fetch(`${apiUrl}/persons`);
    const data = await response.json();
    setPersons(data as Person[]);
    setLoading(false);
  };

  const getGroups = async () => {
    const response = await fetch(`${apiUrl}/groups`);
    const data = await response.json();
    setGroups(data as Group[]);
  };

  useEffect(() => {
    getAllPersons();
    getGroups();

    return () => { };
  }, [])

  if (!loading) {
    return (
      <div className="container">
        <div style={{ marginTop: "1rem" }} className="d-flex justify-content-center">
          <AddEditPersonModal groups={groups} variant={'primary'} editMode={false} />
        </div>
        <Row lg={3}>
          {persons.map(person => {
            return (
              <Col key={`col-${person.idPerson}`} className="d-flex">
                <PersonCard key={person.idPerson} person={person} groups={groups}/>
              </Col>
            )
          })}
        </Row>
      </div>
    );  
  } else {
    return <h1>Loading....</h1>
  }
  
}

export default Persons;
