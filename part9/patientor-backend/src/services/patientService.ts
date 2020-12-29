import { Patient, newPatient, PatientNoSocial, NewEntry, Entry } from '../types';
import { uuid } from 'uuidv4';

import patientData from '../data/patientsData';

const patients: Patient[] = patientData;


const getAll = (): Patient[] => {
    return patients;
};

const getPatient = (id: string): Patient | undefined => {
    const p = patients.find(patient => patient.id === id);
    console.log(p);
    return p;
};

const getNoSocial = (): PatientNoSocial[] => {
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

const addEntry = (patientId: string, newEntry: NewEntry): Patient | undefined => {
    const id = uuid();
    const patient = patients.find(p => p.id === patientId);

    if (!patient) return undefined;

    const newerEntry: Entry = {
        ...newEntry,
        id
    };

    patient.entries.push(newerEntry);
    return patient;
};


export default {
    getAll,
    getNoSocial,
    addPatient,
    getPatient,
    addEntry
};