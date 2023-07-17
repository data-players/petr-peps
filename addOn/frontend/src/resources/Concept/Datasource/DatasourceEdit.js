import React from 'react';
import { FormTab, TabbedForm, TextInput } from 'react-admin';
import Edit from "../../../layout/edit/Edit";
import DatasourceTitle from './DatasourceTitle';

export const DatasourceEdit = props => (
  <Edit title={<DatasourceTitle />} {...props}>
    <TabbedForm redirect="show">
      <FormTab label="Données">
        <TextInput source="pair:label" fullWidth />
      </FormTab>
    </TabbedForm>
  </Edit>
);

export default DatasourceEdit;
