const customSearchConfig = [
  {
    "name": "Organization",
    "label": "Des Organisations",
    "fields" : [
      {
        "type": "Theme",
        "name": "pair:hasTopic",
        "label": "Thématique",
      },
    ],
    "result-path" : {
      "type": "Organization",
      "name": "pair:topicOf",
    }
  },
  {
    "name": "Person",
    "label": "Des Persons",
    "fields" : [
      {
        "type": "Theme",
        "name": "pair:hasTopic",
        "label": "Thématique",
      },
    ],
    "result-path" : {
      "type": "Organization",
      "name": "pair:topicOf",
    }
  }
];

export default customSearchConfig;