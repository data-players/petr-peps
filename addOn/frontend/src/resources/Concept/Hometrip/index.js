import HometripCreate from "./HometripCreate";
import HometripEdit from './HometripEdit';
import HometripList from './HometripList';
import HometripShow from './HometripShow';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

export default {
  config: {
    list: HometripList,
    show: HometripShow,
    create: HometripCreate,
    edit: HometripEdit,
    icon: LocalOfferIcon,
    options: {
      label: 'Déplacement à Domicile',
      parent: 'Concept'
    }
  },
  dataModel: {
    types: ['peps:Hometrip'],
    list: {
      servers: '@default'
    },
    fieldsMapping: {
      title: 'pair:label'
    }
  },
  translations: {
    fr: {
      name: 'Déplacement à Domicile',
      fields: {
        'pair:label': 'Titre',
        'pair:comment': 'Courte description',
        'pair:description': 'Description',
        'pair:topicOf': 'Sujet de'
      }
    }
  }
};
