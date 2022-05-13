import { FC, useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Person from "../../models/person.model";
import GroupsContext from '../../context/groups-context';
import PersonsContext from '../../context/persons-context';

interface Props {
  personToEdit?: Person,
  variant: string,
  editMode: boolean
}

const AddEditPersonModal: FC<Props> = ({ variant, personToEdit, editMode }) => {
  const [show, setShow] = useState<boolean>(false);
  const [formData, setFormData] = useState<Person>(personToEdit ?? new Person());
  const {groups} = useContext(GroupsContext);
  const { editPerson, addPerson } = useContext(PersonsContext);

  const modalTitle = editMode ? 'Edit' : 'Add Person'

  const submitData = () => {
    if (editMode) {
      editPerson(formData, personToEdit?.idPerson ?? 0);
      setFormData(new Person());
    } else {
      addPerson(formData);
      setFormData(new Person());
    }
  }

  const handleClose = (e?: any) => {
    if (e && e.target.value === 'submit') {
      submitData();
    }
    setShow(false)
  };
  const handleShow = () => setShow(true);

  const onMutate = (e:any) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  } 

  return (
    <div>
      <Button size="lg" variant={variant} onClick={handleShow}>
        {modalTitle}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="John"
                value={formData?.firstName}
                onChange={onMutate}
                required
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={formData?.lastName}
                placeholder="Doe"
                onChange={onMutate}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="jobTitle">
              <Form.Label>Job Title</Form.Label>
              <Form.Control
                type="text"
                value={formData?.jobTitle}
                placeholder="Dev"
                onChange={onMutate}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="assignedGroupId">
              <Form.Label>Group</Form.Label>
              <Form.Select aria-label="Default select example" value={formData?.assignedGroupId} onChange={onMutate}>
                <option key="0" value={0}> No group</option>
                {groups.map(group => <option key={group.idGroup} value={group.idGroup}>{group.name}</option>)}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" value={'cancel'} onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" value={'submit'} onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddEditPersonModal;