import ProfileCreate from "./ProfileCreate";
import ProfileEdit from './ProfileEdit';
import ProfileList from './ProfileList';
import ProfileShow from './ProfileShow';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

export default {
  config: {
    list: ProfileList,
    show: ProfileShow,
    create: ProfileCreate,
    edit: ProfileEdit,
    icon: LocalOfferIcon,
    options: {
      label: 'Profil Prioritaire',
      parent: 'Concept'
    }
  },
  dataModel: {
    types: ['peps:Profile'],
    list: {
      servers: '@default'
    },
    fieldsMapping: {
      title: 'pair:label'
    }
  },
  translations: {
    fr: {
      name: 'Profil Prioritaire |||| Profils Prioritaires',
      fields: {
        'pair:label': 'Titre',
        'pair:comment': 'Courte description',
        'pair:description': 'Description',
        'pair:topicOf': 'Sujet de'
      }
    }
  }
};
