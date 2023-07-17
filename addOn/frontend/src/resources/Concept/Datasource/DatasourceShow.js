import React from 'react';
import { TextField } from 'react-admin';
import DatasourceTitle from './DatasourceTitle';
import Show from "../../../layout/show/Show";
import { MainList } from '../../../common/list';

const DatasourceShow = props => (
  <Show title={<DatasourceTitle />} {...props}>
    <MainList>
      <TextField source="pair:label" style={{fontSize: "30px", paddingLeft: "1%"}} />
    </MainList>
  </Show>
);

export default DatasourceShow;
