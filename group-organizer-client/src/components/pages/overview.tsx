import Tree from '@naisutech/react-tree'
import { useContext } from 'react';
import GroupsContext from '../../context/groups-context';
import PersonsContext from '../../context/persons-context';

const Overview = () => {
  let dataSource: any[] = [];

  const { groups } = useContext(GroupsContext);
  const { persons } = useContext(PersonsContext);

  const getAssignableItems = (id?: number) => {
    if (!id) return;
    const items: any[] = [];
    persons.forEach(pers => {
      if (pers.assignedGroupId === id) {
        const item = {
          'id': pers.idPerson?.toString(),
          'parentId': pers.assignedGroupId?.toString(),
          'label': `${pers.firstName} ${pers.lastName}`
        };
        items.push(item);
      }
    });
    return items;
  };

  const getUnassignedPersons = () => {
    const items: any[] = [];
    persons.forEach(pers => {
      if (!pers.assignedGroupId) {
        items.push({
          'id': pers.idPerson?.toString(),
          'parentId': pers.assignedGroupId?.toString(),
          'label': `${pers.firstName} ${pers.lastName}`
        });
      }
    });
    return items;
  }

  const getDataSource = (): any[] => {
    groups.forEach(group => {
      let grp = { 'id': group.idGroup?.toString(), 'parentId': group.assignedGroupId?.toString() ?? null, 'label': group.name, 'items': getAssignableItems(group.idGroup) };
      dataSource.push(grp)
    });
    const unassignedGroup = { 'id': 'unassigned', 'parentId': null, 'label': 'Unassigned Persons', 'items': getUnassignedPersons() };
    dataSource.push(unassignedGroup)
    return dataSource;
  }
  
  return (
    <Tree nodes={getDataSource()} />
  )
}

export default Overview;
