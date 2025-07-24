import React, { useState, useContext } from 'react';
import { TimerContext } from '../../context/TimerContext';
import '../../styles/TimerActions.css';

export default function TimerActions() {
  const {
    startTimer,
    addToQueue,
    pauseTimer,
    resetTimer,
    startQueue,
    isRunning
  } = useContext(TimerContext);

  const [minutes, setMinutes] = useState('');
  const [lastAction, setLastAction] = useState(null);

  const handleManualStart = () => {
    const duration = parseInt(minutes);
    if (isNaN(duration) || duration <= 0) {
      alert("Durée invalide.");
      return;
    }
    startTimer(duration * 60, 'work');
    setLastAction(null);
  };

  const handleAddToQueue = (type) => {
    const duration = parseInt(minutes);
    if (isNaN(duration) || duration <= 0) {
      alert("Durée invalide.");
      return;
    }
    addToQueue({ type, duration: duration * 60 });
    setMinutes('');
    setLastAction(type);
  };

  return (
    <div className="timer-actions">
      {/* LIGNE : champ + bouton lancer */}
      <div className="manual-start-row">
        <input
          type="number"
          placeholder="Durée en minutes"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          min="1"
        />
        <button className="start-btn" onClick={handleManualStart}>Lancer</button>
      </div>

      {/* BOUTONS POUR AJOUTER A LA FILE */}
      <div className="queue-buttons-row">
        <button onClick={() => handleAddToQueue('work')}>+ Travail</button>
        <button onClick={() => handleAddToQueue('pause')}>+ Pause</button>
      </div>

      {/* LANCER LA FILE */}
      <button className="start-queue-btn" onClick={startQueue} disabled={isRunning}>
        ▶️ Lancer la file
      </button>

      {/* BOUTON PAUSE */}
      <button className="pause-btn" onClick={pauseTimer}>
        ⏸ Pause / Reprendre
      </button>

      {/* BOUTON RESET */}
      <button className="reset-btn" onClick={resetTimer}>
        🔁 Reset
      </button>

      {/* MESSAGE ✅ */}
      {lastAction && (
        <div className="feedback">
          {lastAction === 'work' ? 'Session de travail ajoutée' : 'Pause ajoutée'} ✅
        </div>
      )}
    </div>
  );
}
