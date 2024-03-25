import React,{useState} from 'react';
import { Card, CardContent } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { ReferenceFilter } from '@semapps/list-components';
import { TextInput, Filter } from 'react-admin';
// import ReferenceFilterTree from '../../../../common/ReferenceFilterTree';

const useStyles = makeStyles(theme => ({
  card: {
    paddingTop: 0,
    [theme.breakpoints.up('sm')]: {
      minWidth: '15em',
      marginLeft: '1em'
    },
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  cardContent: {
    paddingTop: 0
  }
}));

const OrganisationFilterSidebar = ({ setFilters }) => {

  const [searchText, setSearchText] = useState('');

  // Met à jour l'état local avec la valeur du champ de recherche
  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  // Déclenche la mise à jour des filtres uniquement lorsque la touche "Enter" est pressée
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setFilters({ q: searchText }, null);
    }
  };

  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        {/* <TextInput
          label="Recherche"
          value={searchText}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          resettable
        /> */}
        <Filter>
          <TextInput label="Recherche" source="q" alwaysOn />
        </Filter>
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

export default OrganisationFilterSidebar;

