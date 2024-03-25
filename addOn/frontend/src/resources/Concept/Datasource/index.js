import DatasourceCreate from "./DatasourceCreate";
import DatasourceEdit from './DatasourceEdit';
import DatasourceList from './DatasourceList';
import DatasourceShow from './DatasourceShow';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

export default {
  config: {
    list: DatasourceList,
    show: DatasourceShow,
    create: DatasourceCreate,
    edit: DatasourceEdit,
    icon: LocalOfferIcon,
    options: {
      label: 'Sources de données',
      parent: 'Concept'
    }
  },
  dataModel: {
    types: ['peps:Datasource'],
    list: {
      servers: '@default'
    },
    fieldsMapping: {
      title: 'pair:label'
    }
  },
  translations: {
    fr: {
      name: 'Source de donnée |||| Sources de données',
      fields: {
        'pair:label': 'Titre',
        'pair:region': "Région",
        'peps:DatasourceNb':'Numéro'
      }
    }
  }
};
