import React from 'react';
import { ShowButton, EditButton, useResourceDefinition, useRecordContext, usePermissions } from 'react-admin';
import { Typography } from '@mui/material';

const EDIT_MODES = ['acl:Append', 'acl:Write', 'acl:Control'];

const PopupContent = () => {
  const record = useRecordContext();
  const resourceDefinition = useResourceDefinition({});
  const isIframe = window !== window.top;
  const recordId = record ? record.id || record['@id'] : undefined;
  const { permissions } = usePermissions(recordId || {});
  if (!record) return null;
  const canEdit =
    permissions && permissions.some(permission => EDIT_MODES.includes(permission['acl:mode']));
  return (
    <>
      {record.label && <Typography variant="h5">{record.label}</Typography>}
      {record.description && (
        <Typography>
          {record.description.length > 150 ? `${record.description.substring(0, 150)}...` : record.description}
        </Typography>
      )}
      {resourceDefinition.hasShow && <ShowButton />}
      {!isIframe && resourceDefinition.hasEdit && canEdit && <EditButton />}
    </>
  );
};

export default PopupContent;
