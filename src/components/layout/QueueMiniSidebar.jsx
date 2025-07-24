import React, { useContext } from 'react';
import { TimerContext } from '../../context/TimerContext';
import '../../styles/queueMiniSidebar.css';

import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableItem({ item, onRemove }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: 'none'
  };

  return (
    <li ref={setNodeRef} style={style} className={item.type}>
      <div
        className="queue-mini-content"
        {...attributes}
        {...listeners}
        style={{ pointerEvents: 'auto', zIndex: 1 }}
      >
        <div>
          {item.type === 'work' ? '🟢 Travail' : '🔵 Pause'}<br />
          <span>{Math.floor(item.duration / 60)} min</span>
        </div>
        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onRemove(item.id);
          }}
          title="Supprimer"
        >
          ✕
        </button>
      </div>
    </li>
  );
}

export default function QueueMiniSidebar() {
  const { queue, setQueue, removeFromQueue, clearQueue } = useContext(TimerContext);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = queue.findIndex((item) => item.id === active.id);
    const newIndex = queue.findIndex((item) => item.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    setQueue((items) => arrayMove(items, oldIndex, newIndex));
  };

  return (
    <aside className="queue-mini-sidebar">
      <h4>
        ⏳ File {queue.length > 0 && <span className="badge">{queue.length}</span>}
      </h4>

      <div className="queue-content-wrapper">
        {queue.length === 0 ? (
          <p className="empty">Vide</p>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={queue.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              <ul>
                {queue.map((item) => (
                  <SortableItem
                    key={item.id}
                    item={item}
                    onRemove={removeFromQueue}
                  />
                ))}
              </ul>
            </SortableContext>
          </DndContext>
        )}
      </div>

      <button className="clear-queue-btn" onClick={clearQueue}>
        🗑 Vider la file
      </button>
    </aside>
  );
}
