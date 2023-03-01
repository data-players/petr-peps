import React from 'react';

const LifestageTitle = ({ record }) => {
  return <span>{record ? record['pair:label'] : ''}</span>;
};

export default LifestageTitle;
