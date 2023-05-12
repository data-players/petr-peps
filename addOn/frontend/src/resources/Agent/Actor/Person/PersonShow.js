import React from 'react';
import { TextField } from 'react-admin';
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

const Test = ({ record, source, label }) => {
  if (record["peps:showEmail"])
    return (
      <div style={{display: "flex", padding: "12px", marginLeft:"16%"}}>
        <div style={{color: "rgba(0, 0, 0, 0.54)"}}>Email</div>
        <TextField style={{marginLeft: "28px"}} label={label} source={source} />
      </div>
    )
}

const PersonShow = props => {
  return (
    <Show title={<PersonTitle />} {...props}>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={9}>
          <Hero image="image">
            <TextField source="pair:firstName" />
            <TextField source="pair:lastName" />
            <TextField source="pair:comment" />
            <Test label="Email" source="foaf:email" />
          </Hero>
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
