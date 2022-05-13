import moment from "moment";
import { FC } from "react";
import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import Group from "../../models/group.model";
import Person from '../../models/person.model';
import AddEditPersonModal from "./add-edit-person-modal";

interface Props { 
  person: Person,
  groups: Group[]
}

const PersonCard: FC<Props> = ({ person, groups }): JSX.Element => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const assignedGroup = groups.find((group) => group.idGroup === person.assignedGroupId);
  const dateCreated = moment(person.dateCreated?.toString()).format('MMMM Do YYYY, h:mm a');
  const dateModified = moment(person.dateModified).format('MMMM Do YYYY, h:mm a');

  const handleDelete = (e: any) => {
    const reqOpt = {
      method: 'DELETE',
    };
    fetch(`${baseUrl}/deleteperson/${person.idPerson}`, reqOpt);
  } 

  return (
    <Card style={{ width: '18rem', margin: '1rem' }} className="flex-fill" key={person.idPerson}>
      <Card.Img variant="top" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png" />
      <Card.Body>
        <Card.Title><b>{`${person.firstName} ${person.lastName}`}</b></Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem><b>Job title:</b> {person.jobTitle}</ListGroupItem>
        <ListGroupItem><b>Created:</b> {dateCreated}</ListGroupItem>
        <ListGroupItem><b>Modified:</b> {dateModified}</ListGroupItem>
        <ListGroupItem><b>Group:</b> {person.assignedGroupId ? assignedGroup?.name: 'Not in a group'}</ListGroupItem>
        <ListGroupItem>
          <div className="d-flex justify-content-center ">
            <AddEditPersonModal personToEdit={person} groups={groups} variant={'success'} editMode={true} />
            <Button style={{marginLeft: '3rem'}} variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </ListGroupItem>
      </ListGroup>
    </Card>
  )
}

export default PersonCard;