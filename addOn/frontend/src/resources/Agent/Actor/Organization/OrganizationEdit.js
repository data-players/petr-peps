import React from 'react';
import {
  TextInput,
  ImageInput,
  TabbedForm,
  FormTab,
  CheckboxGroupInput,
  AutocompleteArrayInput,
} from 'react-admin';
import { ImageField } from '@semapps/field-components';
import { ReferenceArrayInput } from '@semapps/input-components';
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
        <TextInput label="Horaire d'ouverture" source="peps:openHour" fullWidth />
        {/* <ReferenceInput reference="Status" source="pair:hasStatus" filter={{ a: 'pair:AgentStatus' }}>
          <SelectInput optionText="pair:label" fullWidth/>
        </ReferenceInput> */}
        {/* <ReferenceInput reference="Type" source="pair:hasType" filter={{ a: 'pair:OrganizationType' }}>
          <SelectInput optionText="pair:label" />
        </ReferenceInput> */}
        <TextInput label="Capacité d'accueil" source="peps:accommodationCapacity" fullWidth />
        <TextInput label="Public concerné et critère(s) d'admission" source="peps:concernedPublic" fullWidth />
        <TextInput label="Compétences" source="peps:skills" fullWidth />
        {/* <TextInput source="pair:homePage" fullWidth  /> */}
        <LocationInput source="pair:hasLocation" fullWidth  />
        <TextInput label="Source de données" source="peps:dataSource" fullWidth />
        <ImageInput source="image" accept="image/*">
          <ImageField source="src" />
        </ImageInput>
      </FormTab>
      {/* <FormTab label="Membres">
        <ReificationArrayInput source="pair:organizationOfMembership" reificationClass="pair:MembershipAssociation">
          <ReferenceInput reference="Person" source="pair:membershipActor">
          <AutocompleteInput optionText={record => record && `${record['pair:firstName']} ${record['pair:lastName']}`}
          shouldRenderSuggestions={value => value && value.length > 1}
          />
          </ReferenceInput>
          <ReferenceInput reference="MembershipRole" source="pair:membershipRole">
            <SelectInput optionText="pair:label" />
          </ReferenceInput>
        </ReificationArrayInput>
      </FormTab> */}
      <FormTab label="Concepts">
        {/* <OrganizationsInput source="pair:partnerOf" /> */}
        {/* <EventsInput source="pair:involvedIn" /> */}
        {/* <SectorsInput label="Secteurs Géographique" source="peps:hasSector" /> */}
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
        {/* <AccessibilityInput label="Accessibilité" source="peps:hasAccessibility" /> */}
        <ReferenceArrayInput label="Accessibilité" source="peps:hasAccessibility" reference="Accessibility" fullWidth >
          <CheckboxGroupInput optionText="pair:label" />
        </ReferenceArrayInput>
        {/* <DocumentsInput source="pair:documentedBy" /> */}
      </FormTab>
    </TabbedForm>
  </Edit>
);

export default OrganizationEdit;
