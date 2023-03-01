import React from 'react';

const NeedTitle = ({ record }) => {
  return <span>{record ? record['pair:label'] : ''}</span>;
};

export default NeedTitle;
