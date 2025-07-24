// Import de React et du hook useContext pour accéder au contexte
import React, { useContext } from 'react';

// Import du contexte qui contient les infos du timer (état global)
import { TimerContext } from '../../context/TimerContext';

// Import du fichier CSS qui stylise cette boîte d’état
import '../../styles/CurrentSessionBox.css';

// Composant qui affiche un encadré indiquant l’état actuel de la session (Travail / Pause / En pause / Rien)
export default function CurrentSessionBox() {
  // On extrait les infos nécessaires depuis le contexte
  const { isRunning, isPaused, currentType } = useContext(TimerContext);

  // Valeurs par défaut si aucune session n’est active
  let message = 'Aucune session en cours';
  let color = '#666'; // gris par défaut

  // Si une session est en cours
  if (isRunning) {
    if (isPaused) {
      message = '⏸️ En pause';      // Affiche "En pause"
      color = '#facc15';            // Couleur jaune
    } else if (currentType === 'work') {
      message = '🟢 Travail';       // Affiche "Travail"
      color = '#10b981';            // Couleur verte
    } else if (currentType === 'pause') {
      message = '🔵 Pause';         // Affiche "Pause"
      color = '#3b82f6';            // Couleur bleue
    }
  }

  // Rendu du composant : une boîte stylisée avec un message et une bordure colorée
  return (
    <div className="session-box" style={{ borderColor: color }}>
      {message}
    </div>
  );
}
