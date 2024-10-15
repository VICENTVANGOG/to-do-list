import Tareas from "@/components/tareas/tareas";
import Link from 'next/link';


export default function Home() {
  return (
    <div>
      <div>
        <h1>Tareas</h1>
        <Link href="/agregar">Agregar Tarea</Link>
      </div>
    <Tareas/>
    </div>
  );
}
