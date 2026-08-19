import React from 'react';

const HomePage = () => {
  // Redirection vers /Organization désactivée : elle annulait le fetch du profil
  // pendant le login, ce qui déclenchait un localStorage.clear() (perte du token).
  return <></>;
};

export default HomePage;
