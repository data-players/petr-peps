import React from 'react';
import { ShowButton, EditButton, useResourceDefinition, useRecordContext } from 'react-admin';
import { Typography } from '@mui/material';

const PopupContent = () => {
  const record = useRecordContext();
  const resourceDefinition = useResourceDefinition({});
  const isIframe = window !== window.top;
  if (!record) return null;
  return (
    <>
      {record.label && <Typography variant="h5">{record.label}</Typography>}
      {record.description && (
        <Typography>
          {record.description.length > 150 ? `${record.description.substring(0, 150)}...` : record.description}
        </Typography>
      )}
      {resourceDefinition.hasShow && <ShowButton />}
      {!isIframe && resourceDefinition.hasEdit && <EditButton />}
    </>
  );
};

export default PopupContent;
