import diagnoseData from '../data/diagnosesData.json';
import { Diagnose } from '../types';

const diagnoses: Diagnose[] = diagnoseData;

const getAll = (): Diagnose[] => {
    return diagnoses;
};

const addDiagnose = () => {
    return null;
};

export default {
    getAll,
    addDiagnose
};




