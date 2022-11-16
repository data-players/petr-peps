# Deploy-archipelago-classic

The easiest way to deploy an archipelago with few customisation thing ! 

## Introduction

First make sur you get docker, docker-compose and git install on your linux server.
Make sure you have an usable domain name, then create 3 sub-domain :
- middleware (Exemple : data.myDomain.com)
- frontend (Exemple : myDomain.com)
- authentification (Exemple login.myDomain.com)

## 1 Fork the Deploye repo

Fork this project to get your own version.

### Local test

You can test localy on your device by using the .local docker-compose : 
```
make start-local
```
To stop it : ``` make stop-local ```
Frontend on http://localhost:4000/
Middleware on http://localhost:3000/
Fuseki database on http://localhost:3030 (user: admin, password : admin)
keycloak on http://localhost:8080 (Keycloak is a custom OIDC)
You will get an error when creating some organisation :
```
index.js:209 Error: @semapps/geo-components : No access token in mapbox configuration
```
This is because MapBox Access Token is not define in the docker-compose file. This is not really a problem for local testing.

## 2 Deploying on internet

Some variables in the docker-compose file are default values. You need to replace them with yours to make it works.
- line 18 myEmail@myemail.fr
- line 39 MyJenaPassword
- line 62 MyJenaPassword
- line 63 https://data.myDomain.com/ (middleware URL)
- line 74 data.myDomain.com (middleware domain name)
- line 81 https://data.myDomain.com/ (middleware URL)
- line 82 MyMapBoxToken (obtain an access token : https://docs.mapbox.com/help/getting-started/access-tokens/)
- line 93 myDomain.com (Your domain name)
- line 101 myKeycloakPassword (To access OIDC amdin page)
- line 103 https://login.myDomain.com/auth (Login URL)
- line 120 login.mydomain.com (Login domain name)

Of course you have to set up your domain name and sub domain name in your domain provider to make it works !

## 3 Launch your archipelago

Launch your app by making a 

```
make start-prod
```

If you need to force dockers to restart add : --force-recreate

Check in your favorite browser if it's work.

Before testing your new app, you must configurate your OIDC to autorize connexion from your domain name "data" (See environement variable line 67 above).
Go to https://login.mydomain.com/auth and click on administration console. Connect with admin and "myKeycloakPassword".
On the left panel, click on Clients, then semapps as client ID.
If you scroll down, you must see a line "Valid Redirect URIs. Add your middleware address + "/*" (exemple : https://data.mydomain.com/*)

## Customisation

#### Custom frontend

If you want minor frontend change you can follow this step. Exemples : App Title, App Bar Color, Tab title and favicon.
Use the addOn directory in the repo to replace logo192/512.png, App.js, index.html and favicon.ico.
logo192.png : App Bar Logo, change it by your own logo (same name).
logo512.png : Ressource Logo, change it by your own (same name).
App.js : App Bar title, replace "MyArchipelago" line 23.
index.html : tab bar title, replace "MyArchipelago" line 18.
favicon.ico : tab bar icon, replace the file by your own (same name).

You can change the theme by owervriting customTheme.js, if you just need to change the App Bar color, replace css color "#28ccfb" line 8 by your selected color.

You can easily change other file and custom your archipelago from this directory. But if you begin to change everithing, maybe you need a custom deploye. More optimised.

#### Custom middleware

Of course you can also change middleware files by adding them into the addOn/middlewaredirectory. Same advise as frontend, rememeber that if you need more than simple changes, you probably need a custom archipelago.

#### Custom Authentificator

##### Do not change anything

You can perfectly use the custom keycloak installed in the docker-compose.

##### Use Les commun's OIDC

###### Data-Players OIDC

It is possible to use the les commun's OIDC, to doo it, you have to replace :
- line 58 http://keycloak:8080/auth/realms/DP/' -> https://login.lescommuns.org//auth/realms/master/
- line 59 semapps -> semapps-dp
Then send an email to contact@data-players.com and give us your middleware domain name. Like in stape 3, we must authorize your connexion on our client.

###### Les commun Custom OIDC

You need to contact les communs if you need your own les commun's OIDC client.
Ask in the rocket Chat for a "les communs" admins.
https://chat.lescommuns.org/channel/accueil

##### Other authentification method

###### JWT
https://www.npmjs.com/package/wait-on
###### CAS
https://semapps.org/docs/middleware/auth

1 Laisser le keycloak par défault
2 les commun.org - Faire une demande sur le chat des communs https://chat.lescommuns.org/channel/accueil
3 d'autre system d'authentification que oicd, jwt / cas

#### Restart
Don't forget to restart
```
docker-compose up -d --force-recreate
```

## Other

If you need to use local dockerfile, you can use :
```
make start-dockerfile 
```
instead.

### compact

To compact your data you can use make compact.
You can also use :
```
make set-compact-cron
```
This will create a cron job to compact data every day at 4am. The cron will use compact-cron.sh

This method, will shut down your service for 2min a 4am, so use it wisely