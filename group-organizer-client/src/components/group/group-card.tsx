import moment from 'moment';
import { FC, useContext } from 'react';
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import Group from '../../models/group.model';
import AddEditGroupModal from './add-edit-group-modal';
import GroupsContext from '../../context/groups-context';

interface Props {
  group: Group
}

const GroupCard: FC<Props> = ({ group }) => {

  const {groups, deleteGroup} = useContext(GroupsContext);

  const assignedGroup = groups.find((grp) => grp.idGroup === group.assignedGroupId);
  const dateCreated = moment(group.dateCreated?.toString()).format('MMMM Do YYYY, h:mm a');
  const dateModified = moment(group.dateModified).format('MMMM Do YYYY, h:mm a');

  const handleDelete = () => {
    deleteGroup(group.idGroup ?? 0);
  }

  return (
    <Card style={{ width: '18rem', margin: '1rem' }} className="flex-fill" key={group.idGroup}>
      <Card.Img variant="top" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png" />
      <Card.Body>
        <Card.Title><b>{`${group.name}`}</b></Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem><b>Created:</b> {dateCreated}</ListGroupItem>
        <ListGroupItem><b>Modified:</b> {dateModified}</ListGroupItem>
        <ListGroupItem><b>Group:</b> {group.assignedGroupId ? assignedGroup?.name : 'Not in a group'}</ListGroupItem>
        <ListGroupItem><div className="d-flex justify-content-center ">
          <AddEditGroupModal groupToEdit={group} variant={'success'} editMode={true} />
          <Button style={{ marginLeft: '3rem' }} variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div></ListGroupItem>
      </ListGroup>
    </Card>
  )
}

export default GroupCard;