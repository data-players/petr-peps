import React from 'react';
import { Grid, Card, CardContent, makeStyles, TextField } from '@material-ui/core';
import { ReferenceFilter } from '@semapps/list-components';
import { Form, Field } from 'react-final-form';
import { useHistory, useLocation } from 'react-router-dom';
import { useStore } from 'react-redux';

const useStyles = makeStyles(theme => ({
  card: {
    padding: "10px",
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
  }
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
    <Card className={classes.card}>
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
        <ReferenceFilter
          reference="Sector"
          source="peps:hasSector"
          limit={100}
          showCounters={false}
          sort={{ field: 'pair:label', order: 'DESC' }}
        />
        <ReferenceFilter
          reference="Profile"
          source="peps:hasProfile"
          limit={100}
          showCounters={false}
          sort={{ field: 'pair:label', order: 'DESC' }}
        />
        <ReferenceFilter
          reference="Need"
          source="peps:hasNeed"
          limit={100}
          showCounters={false}
          sort={{ field: 'pair:label', order: 'DESC' }}
        />
        <ReferenceFilter
          reference="Mobility"
          source="peps:hasMobility"
          limit={100}
          showCounters={false}
          sort={{ field: 'pair:label', order: 'DESC' }}
        />
        <ReferenceFilter
          reference="Lifestage"
          source="peps:hasLifeStage"
          limit={100}
          showCounters={false}
          sort={{ field: 'pair:label', order: 'DESC' }}
        />
        <ReferenceFilter
          reference="Accessibility"
          source="peps:hasAccessibility"
          limit={100}
          showCounters={false}
          sort={{ field: 'pair:label', order: 'DESC' }}
        />
        <ReferenceFilter
          reference="Datasource"
          source="peps:hasDataSource"
          limit={100}
          showCounters={false}
          sort={{ field: 'pair:label', order: 'DESC' }}
        />
      </CardContent>
    </Card>
  );
};

export default ProjectFilterSidebar;
