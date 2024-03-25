import MobilityCreate from "./MobilityCreate";
import MobilityEdit from './MobilityEdit';
import MobilityList from './MobilityList';
import MobilityShow from './MobilityShow';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

export default {
  config: {
    list: MobilityList,
    show: MobilityShow,
    create: MobilityCreate,
    edit: MobilityEdit,
    icon: LocalOfferIcon,
    options: {
      label: 'Mobilité',
      parent: 'Concept'
    }
  },
  dataModel: {
    types: ['peps:Mobility'],
    list: {
      servers: '@default'
    },
    fieldsMapping: {
      title: 'pair:label'
    }
  },
  translations: {
    fr: {
      name: 'Mobilité',
      fields: {
        'pair:label': 'Titre',
        'pair:comment': 'Courte description',
        'pair:description': 'Description',
        'pair:topicOf': 'Sujet de'
      }
    }
  }
};
