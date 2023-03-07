import React from 'react';

const HometripTitle = ({ record }) => {
  return <span>{record ? record['pair:label'] : ''}</span>;
};

export default HometripTitle;
