import React from 'react';
import { Navigate } from 'react-router-dom';

const HomePage = () => {
  // Redirection SPA vers /Organization : navigation côté routeur (pas de rechargement
  // de page), donc aucun fetch en cours n'est annulé. Le passage par / ne peut plus
  // déclencher le localStorage.clear() qui perdait le token pendant le login.
  return <Navigate to="/Organization" replace />;
};

export default HomePage;
