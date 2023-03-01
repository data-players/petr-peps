import NeedCreate from "./NeedCreate";
import NeedEdit from './NeedEdit';
import NeedList from './NeedList';
import NeedShow from './NeedShow';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

export default {
  config: {
    list: NeedList,
    show: NeedShow,
    create: NeedCreate,
    edit: NeedEdit,
    icon: LocalOfferIcon,
    options: {
      label: 'Besoin',
      parent: 'Concept'
    }
  },
  dataModel: {
    types: ['peps:Need'],
    list: {
      servers: '@default'
    },
    fieldsMapping: {
      title: 'pair:label'
    }
  },
  translations: {
    fr: {
      name: 'Besoin |||| Besoins',
      fields: {
        'pair:label': 'Titre',
        'pair:comment': 'Courte description',
        'pair:description': 'Description',
        'pair:topicOf': 'Sujet de'
      }
    }
  }
};
