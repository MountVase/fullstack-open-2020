import React from 'react';
import { Divider, Container, Icon } from "semantic-ui-react";
import { useParams } from 'react-router-dom';
import { setPatientDetails, useStateValue } from "../state";
import axios from 'axios';
import { Patient } from '../types';
import { apiBaseUrl } from '../constants';

const PatientPage: React.FC = () => {

    const [data, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();

    React.useEffect(() => {
        const fetcher = async () => {
            const result = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
            //dispatch({ type: "SET_PATIENT_DETAILS" , payload: result.data });
            dispatch(setPatientDetails(result.data));
        };

        if (!data?.patientDetail || data?.patientDetail?.id !== id) {
            fetcher();
        }
    }, [data?.patientDetail]);
    
    const dict: any = { //eslint-disable-line
        "male": "mars",
        "female": "venus",
        "other": "transgender alternate"
    };

    const genderIcon = dict[`${data?.patientDetail?.gender}`];
    
    return (
        <div>
            <Divider hidden />
            <Container>
                <h2>{data?.patientDetail?.name}</h2>
                <Icon name={genderIcon} size="big"/>
             </Container>
             <Divider hidden />

             <p><b>ssn: </b>{data?.patientDetail?.ssn}</p>
             <p><b>occupation: </b>{data?.patientDetail?.occupation}</p>
        </div>
    );
};

export default PatientPage;
