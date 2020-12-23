export type Diagnose = {
    code: string;
    name: string;
    latin?: string;
};

export type Patient = {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
};

export enum Gender {
    Female = 'female',
    Male = 'male',
    Other = 'other'
}

export type PatientNoSocial = Omit<Patient, 'ssn'>[];

export type newPatient = Omit<Patient, 'id'>;