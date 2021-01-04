import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Form, FormikProps } from 'formik';

import { TextField, DiagnosisSelection } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';


interface Props {
    isValid: boolean;
    setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"];
    setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>["setFieldTouched"];
    onCancel: () => void;
    show: boolean;
}

const HospitalForm: React.FC<Props> = ({ isValid, setFieldValue, setFieldTouched, onCancel, show }) => {

    const [{ diagnoses }] = useStateValue();

    if (!show) return null;

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

        <Field
        label="Discharge Date"
        placeholder="Discharge Date"
        name="discharge date"
        component={TextField}
        />

        <Field
        label="Discharge Criteria"
        placeholder="Discharge criteria"
        name="discharge criteria"
        component={TextField}
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
};

export default HospitalForm;