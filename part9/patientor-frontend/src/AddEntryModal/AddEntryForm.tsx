import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';

import {  DiagnosisSelection, TextField } from '../AddPatientModal/FormField';

import { Entry } from '../types';
import { useStateValue } from '../state';


export type NewEntry = Omit<Entry, 'id'>;

interface Props {
    onCancel: () => void;
    onSubmit: (values: NewEntry) => void;
}

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [{ diagnoses }] = useStateValue();


    // todo. add state thingy that checks what type it is
    // then add selection form before formik to choose which to pick.
    const [entryType, setEntryType] = React.useState<string>('Hospital');

    const typeSelectionForm = () => (
    <div>Please choose type of entry: 
    <select name="type of entry: " value={entryType} onChange={e => setEntryType(e.target.value)}>
      <option value="Hospital">Hospital</option>
      <option value="HealthCheck">Health Check</option>
      <option value="OccupationalHealthcare">Occupational Healthcare</option>
    </select>
    </div>
    );

    const healthRatingSelectionForm = () => (
    <div>Please choose health rating (0-3):
      <select name="healthrating" value={entryType}>
        <option value="0">0 Healthy</option>
        <option value="1">1 Low Risk</option>
        <option value="2">2 High Risk</option>
        <option value="3">3 Critical Risk</option>
      </select>
    </div>
    );


    return (        
        <Formik
        initialValues={ { description: "", date: "", specialist: "", type: "Hospital", diagnosisCodes: undefined } }
        onSubmit={onSubmit}
        validate={values => {
            const requiredError = "Field is required";
            const errors: { [field: string]: string } = {};
            if (!values.type) {
                errors.type = requiredError;
              }
              if (!values.description) {
                errors.description = requiredError;
              }
              if (!values.date) {
                errors.date = requiredError;
              }
              if (!values.specialist) {
                errors.specialist = requiredError;
              }

            return errors;
          }}
        >
        
        { ({ isValid, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
          
          {typeSelectionForm()}

          <Field
          label="Description"
          placeholder="Description"
          name="description"
          component={TextField}
          />
  
          <Field
          label="Date"
          placeholder="YYYY-MM-DD"
          name="date"
          component={TextField}
          />
  
          <Field
          label="Specialist"
          name="specialist"
          component={TextField}
          />
  
  
          <DiagnosisSelection
          setFieldValue={setFieldValue}
          setFieldTouched={setFieldTouched}
          diagnoses={Object.values(diagnoses)}
          />
  

          {/*HERE IN LIE THE OPTIONALS*/}
          
          {entryType === "Hospital" && (
          <div>
            <Field
              label="Discharge Date"
              placeholder="YYYY-MM-DD"
              name="discharge date"
              component={TextField}
            />
  
          <Field
            label="Discharge Criteria"
            placeholder="YYYY-MM-DD"
            name="discharge criteria"
            component={TextField}
          />  
          </div> )}

          {entryType === "OccupationalHealthcare" && (
            <div>
              <Field
                label="Employer"
                placeholder="Employer name"
                name="employer"
                component={TextField}
              />

              <Field
                label="Sickleave start date"
                placeholder="YYYY-MM-DD"
                name="sickleave start date"
                component={TextField}
              />
            </div>
          )}

          {entryType === "HealthCheck" && (
            healthRatingSelectionForm()
          )}

  
  
       <Grid>
       <Grid.Column floated="left" width={5}>
          <Button type="button" onClick={onCancel} color="red">
            Cancel
          </Button>
        </Grid.Column>
        <Grid.Column floated="right" width={5}>
          <Button
            type="submit"
            floated="right"
            color="green"
            disabled={!isValid}
          >
            Submit
          </Button>
        </Grid.Column>
      </Grid>
  
      </Form>
        );
      }}
        </Formik>
    
    );

};

