

export type Diagnose = {
    code: string;
    name: string;
    latin?: string;
};


export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose['code']>;
  }

  export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }
  
  interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
  }

  export interface SickLeave {
      startDate: string;
      endDate: string;
  }

  interface OccupationalHealthcareEntry extends BaseEntry {
      type: "OccupationalHealthcare";
      employerName: string;
      sickLeave?: SickLeave;
  }

 export interface Discharge {
      date: string;
      criteria: string;
  }

  interface HospitalEntry extends BaseEntry {
      type: "Hospital";
      discharge?: Discharge;
  }
  
  //OccupationalHealthCareEntry and HospitalEntry

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;


export type NewEntry = Omit<HospitalEntry, 'id'>
                      | Omit<OccupationalHealthcareEntry, 'id'>
                      | Omit<HealthCheckEntry, 'id'>;


export type Patient = {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
    entries: Entry[];
};

export enum EntryType {
  Hospital = 'Hospital',
  HealthCheck = 'HealthCheck',
  OccupationalHealthcare = 'OccupationalHealthcare'
}

export enum Gender {
    Female = 'female',
    Male = 'male',
    Other = 'other'
}

export type PatientNoSocial = Omit<Patient, 'ssn' | 'entries' >;

export type newPatient = Omit<Patient, 'id'>;