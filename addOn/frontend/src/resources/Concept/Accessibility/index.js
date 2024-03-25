import AccessibilityCreate from "./AccessibilityCreate";
import AccessibilityEdit from './AccessibilityEdit';
import AccessibilityList from './AccessibilityList';
import AccessibilityShow from './AccessibilityShow';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

export default {
  config: {
    list: AccessibilityList,
    show: AccessibilityShow,
    create: AccessibilityCreate,
    edit: AccessibilityEdit,
    icon: LocalOfferIcon,
    options: {
      label: 'Accessibilité',
      parent: 'Concept'
    }
  },
  dataModel: {
    types: ['peps:Accessibility'],
    list: {
      servers: '@default'
    },
    fieldsMapping: {
      title: 'pair:label'
    }
  },
  translations: {
    fr: {
      name: 'Accessibilité',
      fields: {
        'pair:label': 'Titre',
        'pair:comment': 'Courte description',
        'pair:description': 'Description',
        'pair:topicOf': 'Sujet de'
      }
    }
  }
};
