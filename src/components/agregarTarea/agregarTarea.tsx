"use client";

import { Task } from "@/interfaces/tareas";
import { useState } from 'react';
import './tarea.css';

interface AgregarTareaProps {
  onTareaAgregada: (tarea: Task) => void;
}

const AgregarTarea: React.FC<AgregarTareaProps> = ({ onTareaAgregada }) => {
  const [name, setName] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const generateRandomId = () => {
    return Math.floor(Math.random() * 1000000) + Date.now(); 
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nuevaTarea: Task = { 
      id: generateRandomId(), 
      name, 
      date, 
      description, 
      completed: false 
    };

    try {
      const response = await fetch('/api/to-do', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevaTarea),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(errorData.message);
        return; 
      }

      const taskData = await response.json();
      if (typeof onTareaAgregada === 'function') {
        onTareaAgregada(taskData);
      }


      setName('');
      setDate('');
      setDescription('');

      window.location.href = '/'; 

    } catch (error) {
      console.error('Error al agregar tarea:', error);
    }
  };

  return (
    <div className="task-form-container">
      <form onSubmit={handleSubmit} className="task-form">
        <h2 className="task-form__title">Nueva Tarea</h2>
        <input
          type="text"
          placeholder="Nombre de la tarea"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="task-form__input"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="task-form__input"
        />
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="task-form__textarea"
        />
        <button type="submit" className="task-form__button">Agregar Tarea</button> 
      </form>
    </div>
  );
};

export default AgregarTarea;
