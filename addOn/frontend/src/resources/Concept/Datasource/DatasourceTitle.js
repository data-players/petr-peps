import React from 'react';

const DatasourceTitle = ({ record }) => {
  return <span>{record ? record['pair:label'] : ''}</span>;
};

export default DatasourceTitle;
