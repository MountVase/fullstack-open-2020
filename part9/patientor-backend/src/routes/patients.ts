import express from 'express';

import patientService from '../services/patientService';
import { Patient } from '../types';
import { toNewEntry, toNewPatient } from '../utils';
//import { Patient , PatientNoSocial} from '../types';

const router = express.Router();

router.post('/:id/entries', (req, res) => {
  try {
    const id = req.params.id;
    const newEntry = toNewEntry(req.body);

    const newerEntry = patientService.addEntry(id ,newEntry);
    res.json(newerEntry);
  } catch (e) {
    res.status(400).send(e.message); //eslint-disable-line
  }
});

router.get('/:id', (req, res) => {
  const patient: Patient | undefined = patientService.getPatient(req.params.id);
  if (patient) res.json(patient);
 
  else res.status(400).send({ error: `patient not found by id ${req.params.id}`});
});

router.get('/', (_req, res) => {
    // what type is result that I'm sending? hard to assign either Patient or PatientNoSocial
    res.send(patientService.getNoSocial());
});

router.post('/', (req, res) => {
    //const { name, dateOfBirth, ssn, gender, occupation } = req.body; 

    try {

        const newPatient = toNewPatient(req.body);
        const result = patientService.addPatient(newPatient);
        res.json(result);

      } catch (e) {
          
        res.status(400).send(e.message); //eslint-disable-line
        }
});


export default router;