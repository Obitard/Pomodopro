import React, { createContext, useState } from 'react';

export const TimerContext = createContext();

export function TimerProvider({ children }) {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [queue, setQueue] = useState([]);
  const [currentType, setCurrentType] = useState(null);

  const startTimer = (duration, type = null) => {
    clearInterval(intervalId);
    setTimeLeft(duration);
    setIsRunning(true);
    setIsPaused(false);
    if (type) setCurrentType(type);

    const id = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          handleQueueNext();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setIntervalId(id);
  };

  const pauseTimer = () => {
    if (!isRunning) return;

    if (!isPaused) {
      clearInterval(intervalId);
    } else {
      const id = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(id);
            handleQueueNext();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      setIntervalId(id);
    }

    setIsPaused((prev) => !prev);
  };

  const resetTimer = () => {
    clearInterval(intervalId);
    setTimeLeft(0);
    setIsRunning(false);
    setIsPaused(false);
    setCurrentType(null);
  };

  const handleQueueNext = () => {
    if (queue.length > 0) {
      const next = queue[0];
      setQueue((prev) => prev.slice(1));
      startTimer(next.duration, next.type);
    } else {
      setIsRunning(false);
      setCurrentType(null);
    }
  };

  const addToQueue = (item) => {
    const id = crypto.randomUUID(); // ✅ ID unique
    setQueue((prev) => [...prev, { ...item, id }]);
  };

  const removeFromQueue = (idToRemove) => {
    setQueue((prev) => prev.filter((item) => item.id !== idToRemove));
  };

  const clearQueue = () => {
    setQueue([]); // ✅ vider complètement
  };

  const startQueue = () => {
    if (queue.length > 0 && !isRunning && !isPaused) {
      const first = queue[0];
      setQueue((prev) => prev.slice(1));
      startTimer(first.duration, first.type);
    }
  };

  return (
    <TimerContext.Provider
      value={{
        timeLeft,
        isRunning,
        isPaused,
        currentType,
        startTimer,
        pauseTimer,
        resetTimer,
        queue,
        setQueue,
        addToQueue,
        removeFromQueue,
        clearQueue, // ✅ exposé ici
        startQueue
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}
