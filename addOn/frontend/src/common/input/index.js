import React from 'react';
import { SelectArrayInput } from 'react-admin';
import { ReferenceArrayInput, MultiServerAutocompleteArrayInput } from "@semapps/input-components";

const ifTwoLetters = ({ q }) => !!(q && q.length > 1);
const filterOnlyLabel = { _predicates: ['pair:label'] };

export const OrganizationsInput = ({ label, source }) => (
  <ReferenceArrayInput label={label} reference="Organization" source={source} enableGetChoices={ifTwoLetters} filter={filterOnlyLabel}>
    <MultiServerAutocompleteArrayInput optionText="pair:label" shouldRenderSuggestions={value => value.length > 1} fullWidth />
  </ReferenceArrayInput>
);

export const ActorsInput = ({ label, source }) => (
  <ReferenceArrayInput label={label} reference="Actor" source={source} enableGetChoices={ifTwoLetters} filter={filterOnlyLabel}>
    <MultiServerAutocompleteArrayInput optionText="pair:label" shouldRenderSuggestions={value => value.length > 1} fullWidth />
  </ReferenceArrayInput>
);

export const ResourcesInput = ({ label, source }) => (
  <ReferenceArrayInput label={label} reference="Resource" source={source} enableGetChoices={ifTwoLetters}>
    <MultiServerAutocompleteArrayInput optionText="pair:label" shouldRenderSuggestions={value => value.length > 1} fullWidth />
  </ReferenceArrayInput>
);

export const ActivitiesInput = ({ label, source }) => (
  <ReferenceArrayInput label={label} reference="Activity" source={source} enableGetChoices={ifTwoLetters} filter={filterOnlyLabel}>
    <MultiServerAutocompleteArrayInput optionText="pair:label" shouldRenderSuggestions={value => value.length > 1} fullWidth />
  </ReferenceArrayInput>
);

export const DocumentsInput = ({ label, source }) => (
  <ReferenceArrayInput label={label} reference="Document" source={source} enableGetChoices={ifTwoLetters} filter={filterOnlyLabel}>
    <MultiServerAutocompleteArrayInput optionText="pair:label" shouldRenderSuggestions={value => value.length > 1} fullWidth />
  </ReferenceArrayInput>
);

export const EventsInput = ({ label, source }) => (
  <ReferenceArrayInput label={label} reference="Event" source={source} enableGetChoices={ifTwoLetters} filter={filterOnlyLabel}>
    <MultiServerAutocompleteArrayInput optionText="pair:label" shouldRenderSuggestions={value => value.length > 1} fullWidth />
  </ReferenceArrayInput>
);

export const TasksInput = ({ label, source }) => (
  <ReferenceArrayInput label={label} reference="Task" source={source} enableGetChoices={ifTwoLetters} filter={filterOnlyLabel}>
    <MultiServerAutocompleteArrayInput optionText="pair:label" shouldRenderSuggestions={value => value.length > 1} fullWidth />
  </ReferenceArrayInput>
);

export const SkillsInput = ({ label, source }) => (
  <ReferenceArrayInput label={label} reference="Skill" source={source} enableGetChoices={ifTwoLetters} filter={filterOnlyLabel}>
    <MultiServerAutocompleteArrayInput optionText="pair:label" shouldRenderSuggestions={value => value.length > 1} fullWidth />
  </ReferenceArrayInput>
);

export const ThemesInput = ({ label, source }) => (
  <ReferenceArrayInput label={label} reference="Theme" source={source} enableGetChoices={ifTwoLetters} filter={filterOnlyLabel}>
    <MultiServerAutocompleteArrayInput optionText="pair:label" shouldRenderSuggestions={value => value.length > 1} fullWidth />
  </ReferenceArrayInput>
);

export const UsersInput = ({ label, source }) => (
  <ReferenceArrayInput label={label} reference="Person" source={source} enableGetChoices={ifTwoLetters} filter={filterOnlyLabel}>
    <MultiServerAutocompleteArrayInput optionText="pair:label" shouldRenderSuggestions={value => value.length > 1} fullWidth />
  </ReferenceArrayInput>
);

export const AgentsInput = ({ label, source }) => (
  <ReferenceArrayInput label={label} reference="Agent" source={source} enableGetChoices={ifTwoLetters} filter={filterOnlyLabel}>
    <MultiServerAutocompleteArrayInput optionText="pair:label" shouldRenderSuggestions={value => value.length > 1} fullWidth />
  </ReferenceArrayInput>
);

export const SectorsInput = ({ label, source }) => (
  <ReferenceArrayInput label={label} reference="Sector" source={source} enableGetChoices={ifTwoLetters} filter={filterOnlyLabel}>
    <MultiServerAutocompleteArrayInput optionText="pair:label" shouldRenderSuggestions={value => value.length > 1} fullWidth />
  </ReferenceArrayInput>
);

export const NeedsInput = ({ label, source }) => (
  <ReferenceArrayInput label={label} reference="Need" source={source} enableGetChoices={ifTwoLetters} filter={filterOnlyLabel}>
    <MultiServerAutocompleteArrayInput optionText="pair:label" shouldRenderSuggestions={value => value.length > 1} fullWidth />
  </ReferenceArrayInput>
);

export const LifestagesInput = ({ label, source }) => (
  <ReferenceArrayInput label={label} reference="Lifestage" source={source} enableGetChoices={ifTwoLetters} filter={filterOnlyLabel}>
    <MultiServerAutocompleteArrayInput optionText="pair:label" shouldRenderSuggestions={value => value.length > 1} fullWidth />
  </ReferenceArrayInput>
);

export const AccessibilityInput = ({ label, source }) => (
  <ReferenceArrayInput label={label} reference="Accessibility" source={source} enableGetChoices={ifTwoLetters} filter={filterOnlyLabel}>
    <SelectArrayInput optionText="pair:label" shouldRenderSuggestions={value => value.length > 1} fullWidth />
  </ReferenceArrayInput>
);

export const ProfilesInput = ({ label, source }) => (
  <ReferenceArrayInput label={label} reference="Profile" source={source} enableGetChoices={ifTwoLetters} filter={filterOnlyLabel}>
    <MultiServerAutocompleteArrayInput optionText="pair:label" shouldRenderSuggestions={value => value.length > 1} fullWidth />
  </ReferenceArrayInput>
);

export const MobilitiesInput = ({ label, source }) => (
  <ReferenceArrayInput label={label} reference="Mobility" source={source} enableGetChoices={ifTwoLetters} filter={filterOnlyLabel}>
    <MultiServerAutocompleteArrayInput optionText="pair:label" shouldRenderSuggestions={value => value.length > 1} fullWidth />
  </ReferenceArrayInput>
);

export { default as DateTimeInput } from './DateTimeInput';
export { default as LocationInput } from './LocationInput';
