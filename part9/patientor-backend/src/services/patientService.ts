import { Patient } from '../types';

import patients from '../data/patients';


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

export default {
    getAll,
    getNoSocial
}