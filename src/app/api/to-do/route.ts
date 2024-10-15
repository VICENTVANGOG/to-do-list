import { NextResponse } from "next/server";

export interface Task {
    id: number;
    name: string;
    date: string;
    description: string;
    completed: boolean;
}
export async function GET(req: Request) {
    const url = new URL(req.url);
    const status = url.searchParams.get("status");

    const storedTasks = typeof window !== "undefined" ? JSON.parse(localStorage.getItem('tareas') || '[]') : [];
    console.log("veo el local")
    let filterTask: Task[] = storedTasks;

    if (!status) return NextResponse.json(filterTask);

    if (status === "completed") {
        filterTask = storedTasks.filter((task: Task) => task.completed);
    } else {
        filterTask = storedTasks.filter((task: Task) => !task.completed);
    }

    return NextResponse.json(filterTask);
}
export async function POST(req: Request) {
    const body = await req.json(); 

    if (!body) {
        return NextResponse.json(
            { message: "La tarea no es válida" },
            { status: 400 }
        );
    }

    if (!body.date || !body.description || !body.name) {
        return NextResponse.json(
            { message: "Faltan campos requeridos" },
            { status: 400 }
        );
    }

    const newTask: Task = {
        id: Date.now(), 
        name: body.name,
        date: body.date,
        description: body.description,
        completed: false,
    };

    return NextResponse.json({ status: 201, task: newTask }); 
}
