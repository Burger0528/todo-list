'use client';

import { Card } from "@/components/Card";
import { useTodoList } from "./useTodoList";



export const TodoApp = () => {

const { valor, setValor, todoList, addTask, startTask, endTask, deleteTask } = useTodoList();

 
 

  return (
    <main className="todo-app">
      <h1 className="todo-title">Todo list</h1>

      <div className="todo-form">
        <input
          className="todo-input"
          onChange={(e) => {
            setValor(e.target.value);
          }}
          placeholder="Escribe una tarea"
          value={valor}
        />
        <button className="todo-button" onClick={addTask}>
          Agregar tarea
        </button>
      </div>

      <section className="todo-list">
        {/* Renderiza una tarjeta por cada tarea creada en la lista. */}
        {todoList.map((task) => (
          <Card
            key={task.id}
            description={task.title}
            state={task.state}
            startDate={task.startDate}
            endDate={task.endDate}
            id={task.id}
            handleStart={startTask}
            handleEnd={endTask}
            handleDelete={deleteTask}
          />
        ))}
      </section>
    </main>
  );
};
