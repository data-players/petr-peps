import React from 'react';
import {
  TextInput,
  ImageInput,
  AutocompleteInput,
  SelectInput,
  TabbedForm,
  FormTab
} from 'react-admin';
import { ReificationArrayInput } from '@semapps/semantic-data-provider';
import { ImageField } from '@semapps/field-components';
import { ReferenceInput } from '@semapps/input-components';
import { MarkdownInput } from '@semapps/markdown-components';
import { MobilitiesInput, SectorsInput, ProfilesInput, NeedsInput, LifestagesInput, LocationInput, AccessibilityInput } from '../../../../common/input';
import OrganizationTitle from './OrganizationTitle';
import Edit from "../../../../layout/edit/Edit";

export const OrganizationEdit = props => (
  <Edit title={<OrganizationTitle />} {...props}>
    <TabbedForm redirect="show">
      <FormTab label="Données">
        <TextInput source="pair:label" fullWidth />
        <TextInput label="Type de professionnels / services" source="peps:type" fullWidth  />
        {/* <TextInput source="pair:comment" fullWidth /> */}
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
      <FormTab label="Membres">
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
      </FormTab>
      <FormTab label="Concepts">
        {/* <OrganizationsInput source="pair:partnerOf" /> */}
        {/* <EventsInput source="pair:involvedIn" /> */}
        <SectorsInput label="Secteurs Géographique" source="peps:hasSector" />
        <ProfilesInput label="Profil Prioritaire" source="peps:hasProfile" />
        <NeedsInput label="Besoin" source="peps:hasNeed" />
        <MobilitiesInput label="Mobilité" source="peps:hasMobility" />
        <LifestagesInput label="Etape de la vie" source="peps:hasLifeStage" />
        <AccessibilityInput label="Accessibilité" source="peps:hasAccessibility" />
        {/* <DocumentsInput source="pair:documentedBy" /> */}
      </FormTab>
    </TabbedForm>
  </Edit>
);

export default OrganizationEdit;
