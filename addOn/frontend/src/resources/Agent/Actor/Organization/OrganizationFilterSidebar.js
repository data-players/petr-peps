import React from 'react';
import { Grid, Card, CardContent, makeStyles, TextField } from '@material-ui/core';
// import { ReferenceFilter } from '@semapps/list-components';
import ReferenceFilterTree from './ReferenceFilterTree'
import { Form, Field } from 'react-final-form';
import { useHistory, useLocation } from 'react-router-dom';
import { useStore } from 'react-redux';

const useStyles = makeStyles(theme => ({
  card: {
    paddingTop: 0,
    [theme.breakpoints.up('sm')]: {
      minWidth: '15em',
      marginLeft: '1em'
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  cardContent: {
    paddingTop: 0
  },
  searchBar: {
    padding: "10px"
  },
}));

const FilterText = ({ input, ...otherProps }) => <TextField {...input} {...otherProps} />;

const ProjectFilterSidebar = () => {
  const classes = useStyles();
  const history = useHistory();

  const location = useLocation();
  const matches = location.pathname.match(/^\/([^/]+)/);
  const currentType = matches ? matches[1] : 'Organization';

  const store = useStore();
  const state = store.getState();
  const qFilter = state?.admin?.resources[location.pathname.split('/')[1]]?.list?.params?.filter?.q;

  const onSubmit = ({ filter, type }) => {
    if (filter) {
      history.push(`/${type}?filter=${encodeURIComponent(`{"q": "${filter}"}`)}`);
    } else {
      history.push(`/${type}?filter=${encodeURIComponent(`{}`)}`);
    }
  };
  return (
    <Card className={classes.searchBar}>
      <Form
      onSubmit={onSubmit}
      initialValues={{ type: currentType, filter: qFilter ? qFilter : '' }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Field 
                name="filter" 
                component={FilterText} 
                placeholder="Rechercher..." 
                fullWidth />
            </Grid>
          </Grid>
        </form>
      )}
    />
      <CardContent className={classes.cardContent}>
        <ReferenceFilterTree
          reference="Theme"
          source="pair:broader"
          label="pair:label"
          limit={100}
          sort={{ field: 'pair:label', order: 'DESC' }}
        />
      </CardContent>
    </Card>
  );
};

export default ProjectFilterSidebar;
