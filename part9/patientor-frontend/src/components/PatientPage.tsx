import React from 'react';
import { Divider, Container, Icon, Table } from "semantic-ui-react";
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
    
    const genderDict: any = { //eslint-disable-line
        "male": "mars",
        "female": "venus",
        "other": "transgender alternate"
    };

    const genderIcon = genderDict[`${data?.patientDetail?.gender}`];

    const diagnosisDict: any = data?.diagnoses;
    
    return (
        <div>
            <Divider hidden />
            <Container>
                <Table celled>
                    <Table.Row>
                        <Table.HeaderCell><h2>{data?.patientDetail?.name}</h2></Table.HeaderCell>
                        <Table.HeaderCell><Icon name={genderIcon} size="big"/></Table.HeaderCell>
                    </Table.Row>
                </Table>
             </Container>
             <Divider hidden />

             <p><b>ssn: </b>{data?.patientDetail?.ssn}</p>
             <p><b>occupation: </b>{data?.patientDetail?.occupation}</p>
             <h3>entries</h3>
             {data?.patientDetail?.entries.map(entry => {


                 return (<>
                 <p key={entry.id}>{entry.date} <i>{entry.description}</i></p>
                 
                 {entry.diagnosisCodes?.map(code => {
                    const codeDescription: string = diagnosisDict.find((d: any) => d.code === code)?.name;
                    return (<li key={code}>{code} {codeDescription}</li>);
                 
                 })}
                 </>
                 );
             })}
        </div>
    );
};

export default PatientPage;
