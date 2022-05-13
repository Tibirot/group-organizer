import {useState, createContext, useEffect} from 'react'
import Group from '../models/group.model';

interface GrpCtx {
  groups: Group[];
  deleteGroup: (id: number) => void;
  editGroup: (groupToEdit: Partial<Group>, id: number) => void;
  addGroup: (groupToAdd: Partial<Group>) => void;
}

const apiUrl = process.env.REACT_APP_API_URL;
const defaultState: GrpCtx = {
  groups: [],
  deleteGroup: function (id: number): void { },
  editGroup: function (groupToEdit: Partial<Group>, id: number): void { },
  addGroup: function (groupToEdit: Partial<Group>): void { }
} 

const GroupsContext = createContext<GrpCtx>(defaultState);
export const GroupsProvider = ({ children }: any) => {
  const [groups, setGroups] = useState<Group[]>([]);

  const getAllGroups = async () => {
    const response = await fetch(`${apiUrl}/groups`);
    const data = await response.json();
    setGroups(data as Group[]);
  }

  const deleteGroup = (id: number) => {
    if (id === 0) return;
    const reqOpt = {
      method: 'DELETE',
    };
    fetch(`${apiUrl}/deletegroup/${id}`, reqOpt);
    getAllGroups();
  }

  const editGroup = (groupToEdit: Partial<Group>, id: number) => {
    if (id === 0) return;
    const reqOpt = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(groupToEdit)
    };
    fetch(`${apiUrl}/editgroup/${id}`, reqOpt);
    getAllGroups();
  }

  const addGroup = (groupToAdd: Partial<Group>) => {
    const reqOpt = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(groupToAdd)
    };
    fetch(`${apiUrl}/addgroup`, reqOpt);
    getAllGroups();
  }

  useEffect(() => {
    getAllGroups();
  
    return () => {}
  }, [groups])
  

  return (
    <GroupsContext.Provider value={{ groups, deleteGroup, editGroup, addGroup}}>{children}</GroupsContext.Provider>
  )
}
export default GroupsContext;