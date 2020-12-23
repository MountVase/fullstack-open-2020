import diagnoses from '../data/diagnosesData'

import { Diagnose } from '../types'


const getAll = (): Diagnose[] => {
    return diagnoses;
}

const addDiagnose = () => {
    return null
}

export default {
    getAll,
    addDiagnose
}




