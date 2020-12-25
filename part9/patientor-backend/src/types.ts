export type Diagnose = {
    code: string;
    name: string;
    latin?: string;
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}



export type Patient = {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
    entries: Entry[];
};

export enum Gender {
    Female = 'female',
    Male = 'male',
    Other = 'other'
}

export type PatientNoSocial = Omit<Patient, 'ssn' | 'entries' >;

export type newPatient = Omit<Patient, 'id'>;