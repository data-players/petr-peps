import React from 'react'
import {useRecordContext} from 'react-admin'
import {Typography} from '@mui/material'

const OrganizationTitle = (props) => {
  const record = useRecordContext();
  return <Typography  variant="h3" style={{paddingLeft: "25px", color: "#f08a4c"}}> {record ? record['pair:label'] : ''}</Typography>;
};

export default OrganizationTitle;
