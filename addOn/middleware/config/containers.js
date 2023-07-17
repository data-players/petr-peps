const CONFIG = require('./config');
const { ACTOR_TYPES } = require("@semapps/activitypub");

module.exports = [
  {
    path: '/'
  },
  {
    path: '/organizations',
    acceptedTypes: ['pair:Organization'],
    preferredView: '/Organization',
    dereference: ['sec:publicKey', 'pair:hasLocation/pair:hasPostalAddress'],
    disassembly: [{ path: 'pair:organizationOfMembership', container: CONFIG.HOME_URL + 'membership-associations' }]
  },
  {
    path: '/membership-associations',
    acceptedTypes: ['pair:MembershipAssociation']
  },
  {
    path: '/groups',
    preferredView: '/Group',
    acceptedTypes: ['pair:Group', 'og:Circle'],
    dereference: ['sec:publicKey']
  },
  {
    path: '/users',
    preferredView: '/Person',
    acceptedTypes: ['pair:Person'],
    dereference: ['sec:publicKey', 'pair:hasLocation/pair:hasPostalAddress']
  },
  {
    path: '/bots',
    acceptedTypes: [ACTOR_TYPES.APPLICATION],
    dereference: ['sec:publicKey'],
    excludeFromMirror: true
  },
  {
    path: '/themes',
    preferredView: '/Theme',
    acceptedTypes: ['pair:Theme']
  },
  {
    path: '/datasources',
    preferredView: '/Datasource',
    acceptedTypes: ['peps:Datasource']
  },
  {
    path: '/sectors',
    preferredView: '/Sector',
    acceptedTypes: ['peps:Sector']
  },
  {
    path: '/profiles',
    preferredView: '/Profile',
    acceptedTypes: ['peps:Profile']
  },
  {
    path: '/mobilities',
    preferredView: '/Mobility',
    acceptedTypes: ['peps:Mobility']
  },
  {
    path: '/lifestages',
    preferredView: '/Lifestage',
    acceptedTypes: ['peps:Lifestage']
  },
  {
    path: '/needs',
    preferredView: '/Need',
    acceptedTypes: ['peps:Need']
  },
  {
    path: '/accessibility',
    preferredView: '/Accessibility',
    acceptedTypes: ['peps:Accessibility']
  },
  {
    path: '/membership-roles',
    preferredView: '/MembershipRole',
    acceptedTypes: ['pair:MembershipRole']
  },
  {
    path: '/pages',
    preferredView: '/Page',
    acceptedTypes: ['semapps:Page']
  }
];
