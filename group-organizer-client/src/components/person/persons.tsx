import { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import AddEditPersonModal from "./add-edit-person-modal";
import PersonCard from "./person-card";
import PersonsContext from '../../context/persons-context';


const Persons = () => {
  const {persons} = useContext(PersonsContext);

  return (
    <div className="container">
      <div style={{ marginTop: "1rem" }} className="d-flex justify-content-center">
        <AddEditPersonModal variant={'primary'} editMode={false} />
      </div>
      <Row lg={3}>
        {persons.map(person => {
          return (
            <Col key={`col-${person.idPerson}`} className="d-flex">
              <PersonCard key={person.idPerson} person={person}/>
            </Col>
          )
        })}
      </Row>
    </div>
  )

}

export default Persons;
