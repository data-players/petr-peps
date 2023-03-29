import React from 'react';
import { ShowButton, EditButton, useResourceDefinition } from 'react-admin';
import { Typography } from '@material-ui/core';



const PopupContent = ({ record, basePath }) => {
  const resourceDefinition = useResourceDefinition({});
  const isIframe = window !== window.top;

  return (
    <>
      {record.label && <Typography variant="h5">{record.label}</Typography>}
      {record.description && (
        <Typography>
          {record.description.length > 150 ? record.description.substring(0, 150) + '...' : record.description}
        </Typography>
      )}
      {resourceDefinition.hasShow && <ShowButton basePath={basePath} record={record} />}
      {!isIframe && resourceDefinition.hasEdit && <EditButton basePath={basePath} record={record} />}
    </>
  );
};

export default PopupContent;
