import { useContext, useState } from "react"
import { Col, Row } from "react-bootstrap";
import AddEditGroupModal from "./add-edit-group-modal";
import GroupCard from './group-card';
import GroupsContext from '../../context/groups-context';

const Groups = () => {
  const {groups} = useContext(GroupsContext);


  return (
    <div className="container">
      <div style={{ marginTop: "1rem" }} className="d-flex justify-content-center">
        <AddEditGroupModal variant={'primary'} editMode={false} />
      </div>
      <Row lg={3}>
        {groups.map(group => {
          return (
            <Col key={`col-${group.idGroup}`} className="d-flex">
              <GroupCard key={group.idGroup} group={group}/>
            </Col>
          ) 
        })}
      </Row>
    </div>
  )
 
  
}

export default Groups;