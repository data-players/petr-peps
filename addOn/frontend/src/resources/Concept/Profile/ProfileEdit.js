import React from 'react';
import { FormTab, TabbedForm, TextInput } from 'react-admin';
import { MarkdownInput } from '@semapps/markdown-components';
import { AgentsInput } from '../../../common/input';
import Edit from "../../../layout/edit/Edit";
import ProfileTitle from './ProfileTitle';
import ColorInput from '../ColorInput';

export const ProfileEdit = props => (
  <Edit title={<ProfileTitle />} {...props}>
    <TabbedForm redirect="show">
      <FormTab label="Données">
        <TextInput source="pair:label" fullWidth />
        <MarkdownInput source="pair:description" fullWidth />
        <TextInput label="Icone" source="pair:icon" fullWidth />
        <ColorInput label="Couleur" source="pair:color" />
      </FormTab>
      <FormTab label="Relations">
        <AgentsInput source="pair:topicOf" />
      </FormTab>
    </TabbedForm>
  </Edit>
);

export default ProfileEdit;
