import React from 'react';
import {
  TextInput,
  ImageInput,
  TabbedForm,
  FormTab,
  CheckboxGroupInput,
  AutocompleteArrayInput,
  AutocompleteInput
} from 'react-admin';
import { ImageField } from '@semapps/field-components';
import { ReferenceArrayInput, ReferenceInput } from '@semapps/input-components';
import { MarkdownInput } from '@semapps/markdown-components';
import OrganizationTitle from './OrganizationTitle';
import Edit from "../../../../layout/edit/Edit";
import { LocationInput } from '../../../../common/input';

export const OrganizationEdit = props => (
  <Edit title={<OrganizationTitle />} {...props}>
    <TabbedForm redirect="show">
      <FormTab label="Données">
        <TextInput source="pair:label" fullWidth />
        <TextInput label="Type de professionnels / services" source="peps:type" fullWidth  />
        <MarkdownInput multiline source="pair:description" fullWidth />
        <TextInput label="Capacité d'accueil" source="peps:accommodationCapacity" fullWidth />
        <TextInput label="OUVERTURE" source='peps:openHour' fullWidth />
        <TextInput label="Public concerné et critère(s) d'admission" source="peps:concernedPublic" fullWidth />
        <TextInput label="Compétences" source="peps:skills" fullWidth />
        <LocationInput source="pair:hasLocation" fullWidth  />
        <TextInput label="Source de données" source="peps:dataSource" fullWidth />
        <ImageInput source="image" accept="image/*">
          <ImageField source="src" />
        </ImageInput>
      </FormTab>
      <FormTab label="Concepts">
        <ReferenceArrayInput label="Secteurs Géographique" source="peps:hasSector" reference="Sector" fullWidth >
          <AutocompleteArrayInput optionText="pair:label" />
        </ReferenceArrayInput>     
        <ReferenceArrayInput label="Profil Prioritaire" source="peps:hasProfile" reference="Profile" fullWidth >
          <AutocompleteArrayInput optionText="pair:label" />
        </ReferenceArrayInput>
        <ReferenceArrayInput label="Besoin" source="peps:hasNeed" reference="Need" fullWidth >
          <AutocompleteArrayInput optionText="pair:label" />
        </ReferenceArrayInput>
        <ReferenceArrayInput label="Mobilité" source="peps:hasMobility" reference="Mobility" fullWidth >
          <AutocompleteArrayInput optionText="pair:label" />
        </ReferenceArrayInput>
        <ReferenceArrayInput label="Étape de la vie" source="peps:hasLifeStage" reference="Lifestage" fullWidth >
          <CheckboxGroupInput optionText="pair:label" />
        </ReferenceArrayInput>
        <ReferenceArrayInput label="Accessibilité" source="peps:hasAccessibility" reference="Accessibility" fullWidth >
          <CheckboxGroupInput optionText="pair:label" />
        </ReferenceArrayInput>
        <ReferenceInput source="peps:hasDataSource" reference="Datasource" fullWidth >
          <AutocompleteInput optionText="pair:label" />
        </ReferenceInput>
      </FormTab>
    </TabbedForm>
  </Edit>
);

export default OrganizationEdit;
