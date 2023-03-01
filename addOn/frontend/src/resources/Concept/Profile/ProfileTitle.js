import React from 'react';

const ProfileTitle = ({ record }) => {
  return <span>{record ? record['pair:label'] : ''}</span>;
};

export default ProfileTitle;
