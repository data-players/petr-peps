import React from 'react';

const MobilityTitle = ({ record }) => {
  return <span>{record ? record['pair:label'] : ''}</span>;
};

export default MobilityTitle;
