// Import de React et du hook useContext pour accéder au contexte global
import React, { useContext } from 'react';

// Import du contexte du timer (pour accéder au temps restant)
import { TimerContext } from '../../context/TimerContext';

// Import du style pour l’affichage du timer
import '../../styles/TimerDisplay.css';

// Composant qui affiche le temps restant sous forme "mm:ss"
export default function TimerDisplay() {
  // On récupère le temps restant (en secondes) depuis le contexte
  const { timeLeft } = useContext(TimerContext);

  // Calcul des minutes et secondes à partir du temps total
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Mise en forme du texte pour l'affichage (ex : 3:07)
  const formatted = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  return (
    <div className="timer-display">
      <h1>{formatted}</h1> {/* Affiche le temps formaté dans un grand titre */}
    </div>
  );
}
