import express from 'express';

import patientService from '../services/patientService';
//import { Patient , PatientNoSocial} from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
    // what type is result that I'm sending? hard to assign either Patient or PatientNoSocial
    res.send(patientService.getNoSocial());
});

router.post('/', (req, res) => {
    const { name, dateOfBirth, ssn, gender, occupation } = req.body; 

    const newPatient = patientService.addPatient({ name, dateOfBirth, ssn, gender, occupation });

    res.json(newPatient);
});


export default router;