import React from 'react';
import { Divider, Container, Icon, Grid } from "semantic-ui-react";
import { useParams } from 'react-router-dom';
import { setPatientDetails, useStateValue } from "../state";
import axios from 'axios';
import { Diagnosis, Patient } from '../types';
import { apiBaseUrl } from '../constants';
import EntryDetail from './EntryDetail';

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
    
    const genderDict: any = { //eslint-disable-line
        "male": "mars",
        "female": "venus",
        "other": "transgender alternate"
    };

    const genderIcon = genderDict[`${data?.patientDetail?.gender}`];

    const diagnosisDict: Diagnosis[]= data?.diagnoses;
    
    return (
        <div>
            <Divider hidden />
            <Container>
               <Grid columns="6">
                <Grid.Column key="1"> <h2>{data?.patientDetail?.name}</h2></Grid.Column>
                <Grid.Column key="2"> <Icon name={genderIcon} size="big"/></Grid.Column>
             </Grid>   
                   
             </Container>
             <Divider hidden />

             <p><b>ssn: </b>{data?.patientDetail?.ssn}</p>
             <p><b>occupation: </b>{data?.patientDetail?.occupation}</p>
             <h3>entries</h3>
             {data?.patientDetail?.entries.map(entry => {
                return (<EntryDetail entry={entry}></EntryDetail>);
             })}

        </div>
    );
};

export default PatientPage;
