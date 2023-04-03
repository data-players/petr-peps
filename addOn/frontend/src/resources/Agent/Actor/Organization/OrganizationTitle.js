import React from 'react';

const OrganizationTitle = ({ record, theme }) => {
  return <span style={{paddingLeft: "25px", color: "#f08a4c"}}> {record ? record['pair:label'] : ''}</span>;
};

export default OrganizationTitle;
