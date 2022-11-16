import React from 'react';
import { useStore } from 'react-redux';
import DefaultIcon from '@material-ui/icons/Home';

const ResourceIcon = ({resource}) => {
  const store = useStore();
  const state = store.getState();
  if ( state.admin?.resources[resource]?.props.icon ) {
    return state.admin.resources[resource].props.icon.type.render()
  } else {
    return <DefaultIcon />
  }
}

export default ResourceIcon;