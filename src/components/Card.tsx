'use client';

import { useEffect, useState } from "react";

/**
 * Props necesarias para representar una tarea individual y sus acciones.
 */
interface CardProps {
  description: string;
  state: "pending" | "inProgress" | "done";
  startDate: number | undefined;
  endDate: number | undefined;
  id: string;
  handleStart: (id: string) => void;
  handleEnd: (id: string) => void;
  handleDelete: (id: string) => void;
}

/**
 * Tarjeta visual de una tarea.
 * Muestra el estado actual y el tiempo transcurrido o total de ejecución.
 */
export const Card = ({
  description,
  state,
  startDate,
  endDate,
  id,
  handleStart,
  handleEnd,
  handleDelete,
}: CardProps) => {
  const [currentTime, setCurrentTime] = useState(() => Date.now());

  /**
   * Convierte milisegundos en una representación simple HH:MM:SS.
   *
   * @param time Tiempo en milisegundos.
   * @returns Texto formateado para mostrar la duración.
   */
  const formatTime = (time: number) => {
    return new Date(time).toISOString().slice(11, 19);
  };

  useEffect(() => {
    if (state !== "inProgress") {
      return;
    }

    // Actualiza el contador cada segundo mientras la tarea está en progreso.
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [state]);

  let timeInProgress = "";

  // Calcula la duración finalizada o el tiempo transcurrido en vivo.
  if (startDate) {
    if (state === "done" && endDate) {
      timeInProgress = formatTime(endDate - startDate);
    } else if (state === "inProgress") {
      timeInProgress = formatTime(currentTime - startDate);
    }
  }

  return (
    <div
      className={`card2 ${state === "inProgress" ? "card-ip" : ""} ${state === "done" ? "card-done" : ""}`}
    >
      <div className="card-title">{description}</div>
      <div className="card-state">{state}</div>
      <div className="card-time">
        {state === "done"
          ? `La tarea tardo: ${timeInProgress}`
          : `La tarea lleva: ${timeInProgress}`}
      </div>

      {state === "pending" && (
        <button
          className="card-button"
          onClick={() => {
            handleStart(id);
          }}
        >
          Iniciar tarea
        </button>
      )}

      {state === "inProgress" && (
        <button
          className="card-button"
          onClick={() => {
            handleEnd(id);
          }}
        >
          Finalizar tarea 
        </button>
      )}

      {state === "done" && (
        <button
          className="card-button"
          onClick={() => {
            handleDelete(id);
          }}
        >
          Eliminar
        </button>
      )}
    </div>
  );
};
