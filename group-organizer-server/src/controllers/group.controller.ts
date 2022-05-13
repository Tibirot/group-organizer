import express from 'express';
import * as db from '../data-access/data-source';
import { Group } from '../models/group.model';
import { Person } from '../models/person.model';

const router = express.Router();
const groupRepo = db.dataSource.getRepository(Group);
const personRepo = db.dataSource.getRepository(Person)

router.get('/groups', (req, res) => {
  groupRepo.find()
    .then(groups => res.send(groups))
    .catch((err) => console.log(err));
});

router.get('/groups/:id', (req, res) => {
  if (typeof +req.params.id !== 'number') res.send('Invalid Id');

  groupRepo.findOneBy({ idGroup: +req.params.id })
    .then(group => res.send(group))
    .catch((err) => console.log(err));
});

router.post('/addgroup', (req, res) => {
  const groupToAdd = req.body as Partial<Group>;

  if (!groupToAdd.dateCreated) {
    groupToAdd.dateCreated = new Date();
  }
  
  if (!groupToAdd.dateModified) {
    groupToAdd.dateModified = new Date();
  }

  groupRepo.save(groupToAdd);

  res.sendStatus(200);
});

router.put('/editgroup/:id', (req, res) => {
  if (typeof +req.params.id !== 'number') res.send('Invalid id type');

  const modifications = req.body as Partial<Group>;
  
  groupRepo.findOneBy({ idGroup: +req.params.id })
    .then(groupToEdit => {
      Object.assign(groupToEdit, modifications);
      groupToEdit.dateModified = new Date();
      groupRepo.save(groupToEdit);

      res.sendStatus(200);
    })
    .catch((err) => console.log(err));
    
});

router.delete('/deletegroup/:id', (req, res) => {
  if (typeof +req.params.id !== 'number') res.send('Invalid id type');

  personRepo.delete({ assignedGroupId: +req.params.id });
  groupRepo.delete({ idGroup: +req.params.id });

  res.sendStatus(200);
})

export {
  router
}