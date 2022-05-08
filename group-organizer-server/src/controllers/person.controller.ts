import express from 'express';
import { Person } from '../models/person.model';
import * as db from '../data-access/data-source';

const personRepo = db.dataSource.getRepository(Person);
const router = express.Router();

router.get("/persons", (req, res) => {
  personRepo.find()
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
})

router.get('/persons/:id', (req, res) => {
  if (typeof +req.params.id !== 'number') res.send('Invalid id type');
 
  personRepo.findOneBy({ idPerson: +req.params.id })
    .then((person) => res.send(person))
    .catch((err) => console.log(err));
})

router.post('/addperson', (req, res) => {
  const personToAdd = req.body as Partial<Person>;
 
  if (!personToAdd.dateCreated) {
    personToAdd.dateCreated = new Date();
  }
 
  if (!personToAdd.dateModified) {
    personToAdd.dateModified = new Date();
  }
 
  personRepo.save(personToAdd);
 
  res.sendStatus(200);
})

router.put('/editperson/:id', (req, res) => {
  const modifications = req.body;

  if (typeof +req.params.id !== 'number') res.send('Invalid id type');
 
  personRepo.findOneBy({ idPerson: +req.params.id })
    .then((person) => {
      Object.assign(person, modifications);
      person.dateModified = new Date();
      personRepo.save(person);
     
      res.sendStatus(200);
    })
    .catch((err) => console.log(err));
})

router.delete('/deleteperson/:id', (req, res) => {
 
  if (typeof +req.params.id !== 'number') res.send('Invalid id type');
 
  personRepo.delete({ idPerson: +req.params.id });
 
  res.sendStatus(200);
})

export {
  router
}