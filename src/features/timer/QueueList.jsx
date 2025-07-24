// Import de React et du hook useContext
import React, { useContext } from 'react';

// Import du contexte qui contient la file d’attente des sessions
import { TimerContext } from '../../context/TimerContext';

// Import du fichier de styles CSS associé à la liste
import '../../styles/QueueList.css';

// Composant qui affiche toutes les sessions en attente dans la file (liste verticale)
export default function QueueList() {
  // On récupère la file et la fonction de suppression depuis le contexte
  const { queue, removeFromQueue } = useContext(TimerContext);

  // Fonction utilitaire pour convertir une durée (en secondes) en minutes lisibles
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60); // conversion en minutes entières
    return `${m} minute${m > 1 ? 's' : ''}`; // gestion du pluriel
  };

  return (
    <div className="queue-list">
      <h3>📋 Sessions à venir</h3>

      {/* Si la file est vide */}
      {queue.length === 0 ? (
        <p>Aucune session dans la file.</p>
      ) : (
        // Sinon, on affiche chaque session dans une liste
        <ul>
          {queue.map((item, index) => (
            <li key={index} className={`queue-item ${item.type}`}>
              <span>
                {/* Affiche le type de session (Travail ou Pause) et sa durée */}
                {item.type === 'work' ? 'Travail' : 'Pause'} — {formatTime(item.duration)}
              </span>

              {/* Bouton pour retirer cette session de la file */}
              <button onClick={() => removeFromQueue(index)} aria-label="Supprimer">
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
