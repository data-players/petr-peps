import React, { useState, useMemo } from 'react';
import { ReferenceArrayField as RaReferenceArrayField, usePermissionsOptimized, useRecordContext } from 'react-admin';
import QuickAppendDialog from './QuickAppendDialog';

const QuickAppendReferenceArrayField = ({ reference, source, resource, ...otherProps }) => {
  const [showDialog, setShowDialog] = useState(false);
  const record = useRecordContext();
  let myRecord = {};

  if (record) myRecord = record;  
  const { permissions } = usePermissionsOptimized(myRecord.id);

  const canAppend = useMemo(
    () => !!permissions && permissions.some(p => ['acl:Append', 'acl:Write', 'acl:Control'].includes(p['acl:mode'])),
    [permissions]
  );

  if (record?.[source]) {
    if (!Array.isArray(record[source])) {
      record[source] = [record[source]];
    }
    record[source] = record[source].map(i => i['@id'] || i.id || i);
  }

  return (
    <>
      <RaReferenceArrayField
        record={record}
        reference={reference}
        source={source}
        resource={resource}
        appendLink={canAppend ? () => setShowDialog(true) : undefined}
        {...otherProps}
      />
      {canAppend && showDialog && (
        <QuickAppendDialog
          open={showDialog}
          onClose={() => setShowDialog(false)}
          subjectUri={record.id}
          resource={resource}
          source={source}
          reference={reference}
        />
      )}
    </>
  );
};

QuickAppendReferenceArrayField.defaultProps = {
  addLabel: true
};

export default QuickAppendReferenceArrayField;
