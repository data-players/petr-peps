import SectorCreate from "./SectorCreate";
import SectorEdit from './SectorEdit';
import SectorList from './SectorList';
import SectorShow from './SectorShow';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

export default {
  config: {
    list: SectorList,
    show: SectorShow,
    create: SectorCreate,
    edit: SectorEdit,
    icon: LocalOfferIcon,
    options: {
      label: 'Secteur géographique',
      parent: 'Concept'
    }
  },
  dataModel: {
    types: ['peps:Sector'],
    list: {
      servers: '@default'
    },
    fieldsMapping: {
      title: 'pair:label'
    }
  },
  translations: {
    fr: {
      name: 'Secteur Géographique |||| Secteurs géographiques',
      fields: {
        'pair:label': 'Titre',
        'pair:comment': 'Courte description',
        'pair:description': 'Description',
        'pair:topicOf': 'Sujet de'
      }
    }
  }
};
