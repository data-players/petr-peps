import LifestageCreate from "./LifestageCreate";
import LifestageEdit from './LifestageEdit';
import LifestageList from './LifestageList';
import LifestageShow from './LifestageShow';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

export default {
  config: {
    list: LifestageList,
    show: LifestageShow,
    create: LifestageCreate,
    edit: LifestageEdit,
    icon: LocalOfferIcon,
    options: {
      label: 'Etape de la vie',
      parent: 'Concept'
    }
  },
  dataModel: {
    types: ['peps:Lifestage'],
    list: {
      servers: '@default'
    },
    fieldsMapping: {
      title: 'pair:label'
    }
  },
  translations: {
    fr: {
      name: 'Etape de la vie |||| Etapes de la vie',
      fields: {
        'pair:label': 'Titre',
        'pair:comment': 'Courte description',
        'pair:description': 'Description',
        'pair:topicOf': 'Sujet de'
      }
    }
  }
};
