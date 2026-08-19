import React, { useEffect } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useLogin, useNotify } from 'react-admin';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'flex-start',
    background: 'radial-gradient(circle at 50% 14em, #313264 0%, #00023b 60%, #00023b 100%)'
  },
  card: {
    minWidth: 300,
    maxWidth: 350,
    marginTop: '6em'
  }
}));

// Reprend la logique de connexion SSO de @semapps/auth-provider (SsoLoginPage) :
// - bouton "Les Communs" qui appelle authProvider.login({ redirect: '/Organization' }).
//   En mode SSO, le authProvider construit l'URL /auth?redirectUrl=<origin>/login?login=true&redirect=/Organization
//   (avec le bon origin cross-origin du serveur d'auth), puis redirige vers le SSO.
// - au retour du SSO, sur /login?login=true&token=...&redirect=/Organization, ce composant
//   stocke le token et redirige directement vers /Organization (évite le passage par la racine /
//   qui annulait le fetch du profil et déclenchait un localStorage.clear()).
const LoginPage = ({ theme }) => {
  const classes = useStyles(theme);
  const login = useLogin();
  const notify = useNotify();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.has('login')) {
      if (params.has('token')) {
        localStorage.setItem('token', params.get('token'));
        const redirect = params.get('redirect') || '/';
        notify('auth.message.user_connected', { type: 'info' });
        window.location.href = redirect;
      }
    } else if (params.has('logout')) {
      localStorage.clear();
      notify('auth.message.user_disconnected', { type: 'info' });
      window.location.href = '/';
    }
  }, [notify]);

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" align="center">
            Petr Peps
          </Typography>
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            onClick={() => login({ redirect: '/Organization' })}
          >
            Les Communs
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
