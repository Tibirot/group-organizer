import { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap";
import Group from "../../models/group.model";
import AddEditGroupModal from "./add-edit-group-modal";
import GroupCard from './group-card';

const Groups = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getAllGroups();
  }, []);
  
  const getAllGroups = async () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const response = await fetch(`${apiUrl}/groups`);
    const data = await response.json();
    setGroups(data as Group[]);
    setLoading(false);
  }

  if (!loading) {
    return (
      <div className="container">
        <div style={{ marginTop: "1rem" }} className="d-flex justify-content-center">
          <AddEditGroupModal groups={groups} variant={'primary'} editMode={false} />
        </div>
        <Row lg={3}>
          {groups.map(group => {
            return (
              <Col key={`col-${group.idGroup}`} className="d-flex">
                <GroupCard key={group.idGroup} group={group} groups={groups}/>
              </Col>
            ) 
          })}
        </Row>
      </div>
    )
  } else {
    return (
      <h1>Loading ....</h1>
    )
  }
  
}

export default Groups;