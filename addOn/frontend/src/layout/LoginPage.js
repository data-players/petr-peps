import React from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useLogin } from 'react-admin';

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
  },
  avatar: {
    margin: '1em',
    display: 'flex',
    justifyContent: 'center'
  }
}));

// Écran de connexion SSO.
// Au clic, on appelle authProvider.login({ redirect: '/Organization' }) : en mode SSO,
// le authProvider construit l'URL /auth?redirectUrl=<origin>/login?login=true&redirect=/Organization
// (avec le bon origin cross-origin du serveur d'auth). Au retour du SSO, SsoLoginPage lit le
// paramètre `redirect` et redirige l'utilisateur directement vers /Organization.
const LoginPage = ({ theme }) => {
  const classes = useStyles(theme);
  const login = useLogin();

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
