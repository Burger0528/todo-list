import type { Task } from "@/types/task";
import { useEffect, useState } from "react";

export const useTodoList = () => {
  const [valor, setValor] = useState("");
  const [todoList, setTodoList] = useState<Task[]>([]);

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => {
        const tasks: Task[] = data.map((t: any) => ({
          id: t._id,
          title: t.title,
          state: t.state,
          startDate: t.startDate,
          endDate: t.endDate,
        }));
        setTodoList(tasks);
      });
  }, []);

  const addTask = async () => {
    if (valor.trim() === "") return;

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: valor }),
    });
    const data = await res.json();

    const task: Task = {
      id: data._id,
      title: valor,
      state: "pending",
    };

    setTodoList((prev) => [...prev, task]);
    setValor("");
  };

  const startTask = async (id: string) => {
    const startDate = Date.now();
    await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ state: "inProgress", startDate }),
    });
    setTodoList((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, state: "inProgress", startDate } : task
      )
    );
  };

  const endTask = async (id: string) => {
    const endDate = Date.now();
    await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ state: "done", endDate }),
    });
    setTodoList((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, state: "done", endDate } : task
      )
    );
  };

  const deleteTask = async (id: string) => {
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    setTodoList((prev) => prev.filter((task) => task.id !== id));
  };
  return { valor, setValor, todoList, addTask, startTask, endTask, deleteTask };
};
