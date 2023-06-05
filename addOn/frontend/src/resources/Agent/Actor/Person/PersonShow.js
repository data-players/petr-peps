import React from 'react';
import { TextField,useRecordContext } from 'react-admin';
import { Grid } from '@material-ui/core';
import { QuickAppendReferenceArrayField } from '@semapps/field-components';
import { ChipList } from '@semapps/list-components';
import { MapField } from '@semapps/geo-components';
import PersonTitle from './PersonTitle';
import { Hero, MainList, SideList } from '../../../../common/list';
import RightLabel from "../../../../common/list/SideList/RightLabel";
import Show from "../../../../layout/show/Show";

const ConditionalSourceDefinedHandler = ({ record, source, children, ...otherProps }) => {
  if (record?.[source] && (!Array.isArray(record[source]) || record[source].length > 0)) {
    return React.Children.map(children, (child, i) => {
      return React.cloneElement(child, { ...otherProps, record, source });
    });
  } else {
    return <></>;
  }
};

const EmailBooleanView = () => {
  const record = useRecordContext();
  if (!record) return null;

  if(record["peps:showEmail"] === true) {
    return (
      <Hero image="image">
        <TextField source="pair:firstName" />
        <TextField source="pair:lastName" />
        <TextField label="Email" source="pair:e-mail" />
        <TextField source="pair:comment" />
      </Hero>
    )
  } else {
    return (
      <Hero image="image">
        <TextField source="pair:firstName" />
        <TextField source="pair:lastName" />
        <TextField source="pair:comment" />
      </Hero>
    )
  }

}

const PersonShow = props => {
  return (
    <Show title={<PersonTitle />} {...props}>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={9}>
          <EmailBooleanView />
          <MainList>
            <MapField
              source="pair:hasLocation"
              address={record => record['pair:hasLocation'] && record['pair:hasLocation']['pair:label']}
              latitude={record => record['pair:hasLocation'] && record['pair:hasLocation']['pair:latitude']}
              longitude={record => record['pair:hasLocation'] && record['pair:hasLocation']['pair:longitude']}
            />
          </MainList>
        </Grid>
        <Grid item xs={12} sm={3}>
          <SideList>
            <QuickAppendReferenceArrayField reference="Activity" source="pair:involvedIn">
              <ChipList primaryText="pair:label" linkType="show" externalLinks />
            </QuickAppendReferenceArrayField>
            <QuickAppendReferenceArrayField reference="Theme" source="pair:hasTopic">
              <ChipList primaryText="pair:label" linkType="show" externalLinks />
            </QuickAppendReferenceArrayField>
            <QuickAppendReferenceArrayField reference="Skill" source="pair:offers">
              <ChipList primaryText="pair:label" linkType="show" externalLinks />
            </QuickAppendReferenceArrayField>
          </SideList>
        </Grid>
      </Grid>
    </Show>
  )
}

export default PersonShow;
