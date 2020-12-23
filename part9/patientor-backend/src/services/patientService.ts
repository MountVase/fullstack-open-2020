import { Patient, newPatient } from '../types';
import { uuid } from 'uuidv4';

import patientData from '../data/patientsData.json';

const patients: Patient[] = patientData as Patient[];

const getAll = (): Patient[] => {
    return patients;
};

const getNoSocial = (): Omit<Patient, 'ssn'>[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({ 
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (patient: newPatient): Patient => {
    const id = uuid();
    
    const newerPatient = {
        id: id,
        ...patient
    };

    patients.push(newerPatient);
    return newerPatient;

};

export default {
    getAll,
    getNoSocial,
    addPatient
};