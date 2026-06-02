/**
 * Modelo base de una tarea dentro de la aplicación.
 * Guarda su identidad, nombre, estado y marcas de tiempo opcionales.
 */
export interface Task {
  id: string;
  title: string;
  startDate?: number;
  endDate?: number;
  state: "pending" | "inProgress" | "done";
}
 