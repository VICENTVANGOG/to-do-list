"use client";

import { Task } from "@/interfaces/tareas";
import { useState } from 'react';

interface AgregarTareaProps {
  onTareaAgregada: (tarea: Task) => void;
}

const AgregarTarea: React.FC<AgregarTareaProps> = ({ onTareaAgregada }) => {
  const [name, setName] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nuevaTarea: Task = { name, date, description, completed: false, id: Date.now() };

    // Guardar en localStorage
    const tareasGuardadas: Task[] = JSON.parse(localStorage.getItem('tareas') || '[]');
    tareasGuardadas.push(nuevaTarea);
    localStorage.setItem('tareas', JSON.stringify(tareasGuardadas));

    onTareaAgregada(nuevaTarea);

    setName('');
    setDate('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre de la tarea"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit">Agregar Tarea</button>
    </form>
  );
};

export default AgregarTarea;
