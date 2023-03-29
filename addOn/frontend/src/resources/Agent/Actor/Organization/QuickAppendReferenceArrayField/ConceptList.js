import React, { useMemo, useState } from 'react';
import {
  getResources,
  linkToRecord,
  useGetList,
  useRecordContext,
} from 'react-admin';
import { shallowEqual, useSelector } from 'react-redux';
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  makeStyles,
  CircularProgress
} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { useDataServers, useDataModel } from '@semapps/semantic-data-provider';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
    paddingTop: 0,
    paddingBottom: 0
  },
  primaryText: {
    width: '30%'
  },
  secondaryText: {
    fontStyle: 'italic',
    color: 'grey'
  }
}));

const getServerName = (resourceUri, dataServers) => {
  const server = dataServers && Object.values(dataServers).find(server => resourceUri.startsWith(server.baseUrl));
  return server ? server.name : 'Inconnu';
};

const ConceptList = ({ reference, appendLink, source }) => {
  const classes = useStyles();
  const [loading] = useState(false);
  const dataServers = useDataServers();
  const { data } = useGetList(reference, { page: 1, perPage: Infinity });
  const record = useRecordContext();

  const resources = useSelector(getResources, shallowEqual);
  const referenceDefinition = useMemo(() => {
    return resources.find(r => r.name === reference);
  }, [resources, reference]);
  const dataModel = useDataModel(reference);

  if (dataModel && Object.keys(dataModel).length > 0 && !dataModel?.fieldsMapping?.title) {
    throw new Error(`No fieldsMapping.title config found for ${reference} dataModel`);
  }
  if (!dataModel || !record) return null

  let AdditemsArray = [], DeleteItemArray = [];
  for (let item in data) {
    if (!record[source] || record[source].includes(item)) {
      AdditemsArray.push(data[item])
      continue;
    }
    DeleteItemArray.push(data[item])
  }

  return (
    <List dense className={classes.root}>
      { AdditemsArray.map(resource => (
          <ListItem key={resource.id} button onClick={() => appendLink(resource.id)} >
            <ListItemAvatar>
              <Avatar>{React.createElement(referenceDefinition.icon)}</Avatar>
            </ListItemAvatar>
            <ListItemText className={classes.primaryText} primary={resource[dataModel.fieldsMapping.title]} />
            <ListItemText className={classes.secondaryText} primary={getServerName(resource.id, dataServers)} />
            <ListItemSecondaryAction>
              <a href={linkToRecord('/' + reference, resource.id, 'show')} target="_blank" rel="noopener noreferrer">
                <IconButton edge="end">
                  <VisibilityIcon />
                </IconButton>
              </a>
            </ListItemSecondaryAction>
          </ListItem>
        ))}

      {loading && (
        <Box display="flex" alignItems="center" justifyContent="center" height={150}>
          <CircularProgress size={60} thickness={6} />
        </Box>
      )}
    </List>
  );
};


export default ConceptList;
