import React from 'react';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import SimpleList from "../../../common/list/SimpleList";
import List from "../../../layout/list/List";

const NeedList = props => (
  <List {...props}>
    <SimpleList primaryText={record => record['pair:label']} leftAvatar={() => <LocalOfferIcon />} linkType="show" />
  </List>
);

export default NeedList;
