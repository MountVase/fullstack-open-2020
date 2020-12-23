import express from 'express';

import patientService from '../services/patientService';
import { toNewPatient } from '../utils'
//import { Patient , PatientNoSocial} from '../types';

const router = express.Router();

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
          
        res.status(400).send(e.message);
        }
});


export default router;