import React from 'react';

const OrganizationTitle = ({ record }) => {
  return <span style={{paddingLeft: "25px"}}> {record ? record['pair:label'] : ''}</span>;
};

export default OrganizationTitle;
