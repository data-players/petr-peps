import React, { useState, useCallback } from 'react';
import { Button, useDataProvider, useRefresh, useNotify, useGetResourceLabel } from 'react-admin';
import { Dialog, DialogTitle, DialogContent, DialogActions, makeStyles } from '@material-ui/core';
import ConceptList from './ConceptList';
import { useDataModel } from '@semapps/semantic-data-provider';

const useStyles = makeStyles(() => ({
  title: {
    paddingBottom: 8
  },
  actions: {
    padding: 15
  },
  addForm: {
    paddingTop: 0
  },
  listForm: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 0,
    paddingBottom: 0,
    maxHeight: 210
  }
}));

const QuickAppendDialog = ({ open, onClose, subjectUri, resource, source, reference }) => {
  const classes = useStyles();
  const [keyword, setKeyword] = useState('');
  const [setPanel] = useState('find');
  const dataProvider = useDataProvider();
  const refresh = useRefresh();
  const notify = useNotify();
  const getResourceLabel = useGetResourceLabel();
  const dataModel = useDataModel(reference);

  const appendLink = useCallback(
    async objectUri => {
      // Get the freshest data so that the put operation doesn't overwrite anything
      const { data } = await dataProvider.getOne(resource, { id: subjectUri });

      await dataProvider.update(resource, {
        id: subjectUri,
        data: {
          ...data,
          [source]: data[source]
            ? Array.isArray(data[source])
              ? [...data[source], objectUri]
              : [data[source], objectUri]
            : objectUri
        },
        previousData: data
      });

      refresh();

      onClose();
    },
    [dataProvider, subjectUri, resource, source, refresh, onClose]
  );

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle className={classes.title}>Ajouter Un Concept</DialogTitle>
      <DialogContent className={classes.addForm}>
      </DialogContent>
      <DialogContent className={classes.listForm}>
        <ConceptList
          source={source}
          reference={reference}
          appendLink={appendLink}
          switchToCreate={() => setPanel('create')}
        />
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button label="ra.action.close" variant="text" onClick={onClose} />
      </DialogActions>
    </Dialog>
  );
};

export default QuickAppendDialog;
