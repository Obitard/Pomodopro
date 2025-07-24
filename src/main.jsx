// Import de React (nécessaire pour tout projet React)
import React from 'react';

// Import du module ReactDOM pour rendre l’application dans le DOM
import ReactDOM from 'react-dom/client';

// Import de ton composant principal (le cœur de l'app)
import App from './App';

// Import des styles globaux
import './styles/base.css';
import './styles/theme.css';

// Point d’entrée de l’application : on sélectionne l’élément HTML avec l’ID "root"
// et on y injecte l’application React
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* React.StrictMode active des vérifications supplémentaires en développement */}
    <App />
  </React.StrictMode>
);
