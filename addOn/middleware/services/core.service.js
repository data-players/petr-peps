const path = require('path');
const urlJoin = require("url-join");
const { CoreService } = require('@semapps/core');
const CONFIG = require('../config/config');
const containers = require('../config/containers');
const ApiGatewayService = require('moleculer-web');

module.exports = {
  mixins: [CoreService],
  settings: {
    baseUrl: CONFIG.HOME_URL,
    baseDir: path.resolve(__dirname, '..'),
    jsonContext: urlJoin('https://data.petr-peps.data-players.com/context.json'),
    triplestore: {
      url: CONFIG.SPARQL_ENDPOINT,
      user: CONFIG.JENA_USER,
      password: CONFIG.JENA_PASSWORD,
      mainDataset: CONFIG.MAIN_DATASET,
    },
    containers,
    api: {
      port: CONFIG.PORT,
      routes: [
        {
          path: '/ontology',
          use: [
            ApiGatewayService.serveStatic('./public/ontology.ttl', {
              setHeaders: res => {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Content-Type', 'text/turtle; charset=utf-8');
              }
            })
          ]
        },
        {
           path: '/context.json',
           use: [
             ApiGatewayService.serveStatic('./public/context.json', {
               setHeaders: res => {
                 res.setHeader('Access-Control-Allow-Origin', '*');
                 res.setHeader('Content-Type', 'application/json; charset=utf-8');
               }
             })
           ]
       }
      ]
    },
    ldp: false,
    void: {
      title: CONFIG.INSTANCE_NAME,
      description: CONFIG.INSTANCE_DESCRIPTION
    },
    webacl: {
      superAdmins: [
      'http://localhost:3000/users/simon.louvet.zen',
      'http://localhost:3000/users/bastien.siguier',
      'https://data.petr-peps.data-players.com/users/simon.louvet.zen',
      'https://data.petr-peps.data-players.com/users/bastien.siguier1',
      'https://data.petr-peps.data-players.com/users/acordier',
      'https://data.petr-peps.data-players.com/users/bplassard',
      'https://data.petr-peps.data-players.com/users/xavier', 
    ]}
  }
};
