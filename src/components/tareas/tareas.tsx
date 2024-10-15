"use client";

import { Task } from "@/interfaces/tareas";
import { useEffect, useState } from 'react';
import './tarea.css';
import Checkbox from "@mui/material/Checkbox/Checkbox";

export default function Tareas() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/to-do');
      if (!response.ok) {
        throw new Error('Error al cargar las tareas');
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false); 
    }
  };

  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);

  if (loading) {
    return <div>Cargando tareas...</div>; 
  }

  return (
    <div className="tareas-container">
      <h1 className="tareas-title">Tareas</h1>

      <h2 className="tareas-subtitle">Pendientes</h2>
      <ul className="tareas-list">
        {pendingTasks.map((task) => (
          <li key={task.id} className="tarea-card">
            <h3 className="tarea-name">{task.name}</h3>
            <p className="tarea-description">{task.description}</p>
            <p className="tarea-date">{task.date}</p>
            <p className={`tarea-status pending`}>
              Pendiente
            </p>
            <Checkbox 
              defaultChecked={task.completed} 
              color="success" 
            />
          </li>
        ))}
      </ul>

      <h2 className="tareas-subtitle">Completadas</h2>
      <ul className="tareas-list">
        {completedTasks.map((task) => (
          <li key={task.id} className="tarea-card">
            <h3 className="tarea-name">{task.name}</h3>
            <p className="tarea-description">{task.description}</p>
            <p className="tarea-date">{task.date}</p>
            <p className={`tarea-status completed`}>
              Completada
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
