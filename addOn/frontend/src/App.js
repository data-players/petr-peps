import React from 'react';
import { Admin, Resource } from 'react-admin';
import { Layout } from '@semapps/archipelago-layout';
import { LoginPage, LogoutButton, UserMenu } from '@semapps/auth-provider';
import { createBrowserHistory as createHistory } from 'history';
import AppBar from './AppBar';

import HomePage from './HomePage';
import i18nProvider from './config/i18nProvider';
import authProvider from './config/authProvider';
import dataProvider from './config/dataProvider';
import * as resources from './resources';
import customTheme from './customTheme';
import customRoutes from './customRoutes';


const history = createHistory();
const AppBarWithUserMenu = props => <AppBar userMenu={<UserMenu />} {...props} />;
const LayoutWithUserMenu = props => <Layout {...props} appBar={AppBarWithUserMenu} />;

const App = () => (
  <Admin
    disableTelemetry
    history={history}
    // Change your App Name (In app bar)
    title="Petr Peps"
    authProvider={authProvider}
    dataProvider={dataProvider}
    i18nProvider={i18nProvider}
    layout={LayoutWithUserMenu}
    theme={customTheme}
    loginPage={LoginPage}
    logoutButton={LogoutButton}
    dashboard={HomePage}
    customRoutes={customRoutes}
  >
    {Object.entries(resources).map(([key, resource]) => (
      <Resource key={key} name={key} {...resource.config} />
    ))}
  </Admin>
);

export default App;
