/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/restrict-plus-operands, @typescript-eslint/no-unsafe-member-access */

import { newPatient, Gender , NewEntry, Diagnose, BaseEntry, Discharge, HealthCheckRating, SickLeave } from "./types";

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (dateOfBirth: string): boolean => {
  return Boolean(Date.parse(dateOfBirth));
};


const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }

  return name;
};

const parseDateOfBirth = (dateOfBirth: any): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect or missing date of birth: ' + dateOfBirth);
  }
  return dateOfBirth;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }

  return occupation;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};
const parseSsn = (ssn: any): string => {
    if (!ssn || !isString(ssn)) {
      throw new Error('Incorrect or missing ssn: ' + ssn);
    }
    return ssn;
  };  

  const isGender = (gender: any): gender is Gender => {
    return Object.values(Gender).includes(gender);
  };


export const toNewPatient = (object: any): newPatient => {
  const newPatient: newPatient = {
    name: parseName(object.name),
    ssn: parseSsn(object.ssn),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    occupation: parseOccupation(object.occupation),
    gender: parseGender(object.gender),
    entries: []
  };

  return newPatient;
};


const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing date of birth: ' + description);
  }
  return description;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist: ' + specialist);
  }
  return specialist;
};

const parseDiagnosisCodes = (codes: any): Array<Diagnose['code']> => {
  if (!codes) {
    throw new Error("Incorrect or missing diagnosis-codes: " + codes);
  }
  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  Array.from(codes).forEach((code: any) => { 
    if (!isString(code)) throw new Error("Incorrect or missing diagnosis-codes: " + code);
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return codes;
};


/*
const isEntryType = (entry: any): entry is NewEntry => {
  const hospital: boolean = (entry.type === 'Hospital');
  const healthCheck: boolean = (entry.type === 'HealthCheck');
  const occupationalHealthcare: boolean = (entry.type === 'OccupationalHealthcare');

  return healthCheck || occupationalHealthcare || hospital;

};

const parseEntry = (entry: any): NewEntry => {
  if (!entry || !isEntryType(entry)) {
    throw new Error('Probably missing type in entry: ' + entry);
  }
  return entry;
};
*/
const isDischarge = (discharge: any): discharge is Discharge => {
  if (!discharge.date || !discharge.criteria || !isString(discharge.criteria) || !isDate(discharge.date)) {
    return false;
  }
  return true;
};

const parseDischarge = (discharge: any): Discharge | undefined => {
  // I left discharge as optional in types. What if you haven't yet left the hospital?
  if (!discharge) return undefined;
  
  if (!isDischarge(discharge)) {
    throw new Error('Incorrect or missing discharge: ' + discharge);
  }
  return discharge;
};

const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating);
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (!rating || !isHealthCheckRating) {
    throw new Error('Incorrect or missing healthCheckrating: ' + rating);
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return rating;
};

const parseEmployerName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing employername: ' + name);
  }
  return name;
};


const isSickLeave = (sickLeave: any): sickLeave is SickLeave => {
  if (!sickLeave.startDate ||!isDate(sickLeave.startDate) || !sickLeave.endDate || !isDate(sickLeave.endDate)) {
    return false;
  }
  return true;
};

const parseSickLeave = (sickLeave: any): SickLeave | undefined => {
  if (!sickLeave) return undefined;
 
  if (!isSickLeave(sickLeave)) {
    throw new Error('Incorrect or missing sickleave: ' + sickLeave);
  }
  return sickLeave;
};

const isType = (type: any): type is 'Hospital' | 'HealthCheck' | "OccupationalHealthcare" => {
  return ['Hospital', 'HealthCheck', 'OccupationalHealthcare'].includes(type);
};

const parseType = (type: any): string => {
  if (!type || !isType(type)) {
    throw new Error('Incorrect or missing type: ' + type);
  }
  return type;
};


export const toNewEntry = (object: any): NewEntry => {
  const type = parseType(object.type);

  //const type: any = object.type; //eslint-disable-line
  const BaseEntry: Omit<BaseEntry, 'id'> = {
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
  };

  switch (type) {
    case "Hospital":
      console.log('dd',object.discharge);
      return {
        ...BaseEntry,
        type: type,
        discharge: parseDischarge(object.discharge)
      };
    case "HealthCheck":
      return {
        ...BaseEntry,
        type: type,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      };
    case "OccupationalHealthcare":
      return {
        ...BaseEntry,
        type: type,
        employerName: parseEmployerName(object.employerName),
        sickLeave: parseSickLeave(object.sickLeave)
      };
    default:
      return assertNever(type); 
  }
};

const assertNever = (value: any): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};



