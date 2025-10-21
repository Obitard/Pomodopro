import React, { useState, useContext } from 'react'
import { TimerContext } from '../../context/TimerContext'
import '../../styles/TimerActions.css'

export default function TimerActions() {
  const {
    startTimer,
    addToQueue,
    pauseTimer,
    resetTimer,
    startQueue,
    queue,
    isRunning,
    isPaused
  } = useContext(TimerContext)

  const [minutes, setMinutes] = useState('')
  const [lastAction, setLastAction] = useState(null)

  // --- Lancer : si une durée est saisie -> démarre maintenant,
  // sinon -> démarre la file si possible, sinon alerte.
  const handleLaunch = () => {
    const duration = parseInt(minutes, 10)

    if (!isNaN(duration) && duration > 0) {
      startTimer(duration * 60, 'work')
      setLastAction('started')
      setMinutes('')
      return
    }

    if (!isRunning && !isPaused && queue && queue.length > 0) {
      startQueue()
      setLastAction('startedFromQueue')
      return
    }

    alert('Durée invalide. Saisis des minutes ou ajoute d’abord une session à la file.')
  }

  // --- Ajout manuel via le champ minutes
  const handleAddToQueue = (type) => {
    const duration = parseInt(minutes, 10)
    if (isNaN(duration) || duration <= 0) {
      alert('Durée invalide.')
      return
    }
    addToQueue({ type, duration: duration * 60 })
    setMinutes('')
    setLastAction(type)
  }

  // --- Pré-réglages qui ajoutent DIRECT à la file (sans changer le style)
  const addPresetWork = (m) => {
    addToQueue({ type: 'work', duration: m * 60 })
    setLastAction('work')
  }
  const addPresetPause = (m) => {
    addToQueue({ type: 'pause', duration: m * 60 })
    setLastAction('pause')
  }
  const addPresetCycle = () => {
    const cycle = [
      { type: 'work',  duration: 25 * 60 },
      { type: 'pause', duration:  5 * 60 },
      { type: 'work',  duration: 25 * 60 },
      { type: 'pause', duration: 15 * 60 },
    ]
    cycle.forEach(s => addToQueue(s))
    // on ne modifie pas l'affichage du message pour garder le rendu d'avant
  }

  return (
    <div className="timer-actions">
      {/* Durée + Lancer (inchangé) */}
      <div className="manual-start-row">
        <input
          type="number"
          placeholder="Durée en minutes"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          min="1"
        />
        <button className="start-btn" onClick={handleLaunch}>
          Lancer
        </button>
      </div>

      {/* Pré-réglages -> mêmes styles génériques que le reste (pas de nouveau CSS) */}
      <div className="queue-buttons-row">
        <button onClick={() => addPresetWork(25)}>Pomodoro 25′</button>
        <button onClick={() => addPresetPause(5)}>Pause 5′</button>
        <button onClick={() => addPresetPause(15)}>Longue 15′</button>
        <button onClick={addPresetCycle}>Cycle complet</button>
      </div>

      {/* Ajout manuel à la file (inchangé) */}
      <div className="queue-buttons-row">
        <button onClick={() => handleAddToQueue('work')}>+ Travail</button>
        <button onClick={() => handleAddToQueue('pause')}>+ Pause</button>
      </div>

      {/* Pause / Reset (inchangé) */}
      <button className="pause-btn" onClick={pauseTimer}>
        ⏸ Pause / Reprendre
      </button>
      <button className="reset-btn" onClick={resetTimer}>
        🔁 Reset
      </button>

      {/* Message (inchangé) */}
      {lastAction && (
        <div className="feedback">
          {lastAction === 'work'
            ? 'Session de travail ajoutée ✅'
            : lastAction === 'pause'
            ? 'Pause ajoutée ✅'
            : lastAction === 'started'
            ? 'Session démarrée ✅'
            : lastAction === 'startedFromQueue'
            ? 'File démarrée ✅'
            : ''}
        </div>
      )}
    </div>
  )
}
