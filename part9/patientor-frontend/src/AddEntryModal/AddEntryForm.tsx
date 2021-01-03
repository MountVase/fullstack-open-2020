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

        {({ isValid, setFieldValue, setFieldTouched }) => {
            return (
            <Form className="form ui">
                <Field
                label="Type"
                placeholder="Type"
                name="type"
                component={TextField}
                />
                
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
                placeholder="Specialist"
                name="specialist"
                component={TextField}
                />


                <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={Object.values(diagnoses)}
                />    

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