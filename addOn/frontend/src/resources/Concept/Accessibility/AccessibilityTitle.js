import React from 'react';

const AccessibilityTitle = ({ record }) => {
  return <span>{record ? record['pair:label'] : ''}</span>;
};

export default AccessibilityTitle;
