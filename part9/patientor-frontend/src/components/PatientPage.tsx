import React from 'react';
import { Divider, Container, Icon, Grid, Button } from "semantic-ui-react";
import { useParams } from 'react-router-dom';
import { addEntry, setPatientDetails, useStateValue } from "../state";
import axios from 'axios';
import { Patient } from '../types';
import { apiBaseUrl } from '../constants';
import EntryDetail from './EntryDetail';

import AddEntryModal from '../AddEntryModal';
import { NewEntry } from '../AddEntryModal/AddEntryForm';

const PatientPage: React.FC = () => {

    const [data, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();


    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
  
    const openModal = (): void => setModalOpen(true);
  
    const closeModal = (): void => {
      setModalOpen(false);
      setError(undefined);
    };

    const submitEntry = async (entry: NewEntry) => {
        console.log(entry);

        try {
            const response = await axios.post<Patient>(
              `${apiBaseUrl}/patients/${id}/entries`, entry );
      
            console.log(response);
            dispatch(addEntry(response.data));
            closeModal();
          } catch (e) {
            console.error(e.response.data);
          }
    };



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
        
        <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
      </div>
    );
};

export default PatientPage;
