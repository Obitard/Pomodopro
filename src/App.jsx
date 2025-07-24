// Import de React (nécessaire pour JSX)
import React from 'react';

// Import des composants de layout (en-tête et mini-sidebar à gauche)
import Header from './components/layout/Header';
import QueueMiniSidebar from './components/layout/QueueMiniSidebar';

// Import des fonctionnalités liées au timer
import TimerDisplay from './features/timer/TimerDisplay';           // Affiche le temps
import CurrentSessionBox from './features/timer/CurrentSessionBox'; // Montre l'état en cours (travail/pause)
import TimerActions from './features/timer/TimerActions';           // Saisie durée / boutons
import QueueList from './features/timer/QueueList';                 // Liste des sessions en attente

// Import du fournisseur de contexte pour gérer l'état global (timer, file, etc.)
import { TimerProvider } from './context/TimerContext';

// Import des fichiers de styles globaux
import './styles/base.css';
import './styles/theme.css';

// Composant principal de l'application
export default function App() {
  return (
    // Fournit tout le contexte Timer à l’ensemble de l’application
    <TimerProvider>
      <div className="app">
        {/* En-tête avec le logo et les boutons Connexion/Inscription */}
        <Header />

        {/* Layout principal : sidebar à gauche + contenu principal au centre */}
        <div className="main-layout">
          
          {/* Mini file d'attente à gauche (draggable) */}
          <QueueMiniSidebar />

          {/* Contenu principal de l’app */}
          <main className="main-content">
            {/* Affichage du temps restant */}
            <TimerDisplay />

            {/* Encadré qui indique si on est en pause, travail ou rien */}
            <CurrentSessionBox />

            {/* Actions disponibles : pause / reset / ajout file / démarrer file */}
            <TimerActions />

            {/* Liste détaillée des sessions en file (section inférieure) */}
            <section className="queue-section">
              <QueueList />
            </section>
          </main>
        </div>
      </div>
    </TimerProvider>
  );
}
