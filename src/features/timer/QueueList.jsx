
import React, { useContext } from 'react'
import { TimerContext } from '../../context/TimerContext'
import '../../styles/QueueList.css'

export default function QueueList() {
  const { queue, removeFromQueue } = useContext(TimerContext)

  if (!queue || queue.length === 0) {
    return (
      <div className="queue-empty">
        Aucune session dans la file.
      </div>
    )
  }

  return (
    <ul className="queue-list">
      {queue.map((item) => (
        <li key={item.id} className={`queue-item ${item.type}`}>
          <span>
            {item.type === 'work' ? 'Travail' : 'Pause'} — {Math.round(item.duration / 60)} minutes
          </span>

          {/* ❌ Supprimer la session de la file */}
          <button
            className="remove-btn"
            onClick={() => removeFromQueue(item.id)}
            aria-label="Supprimer cette session"
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  )
}
