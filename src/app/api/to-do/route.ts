import { NextResponse } from "next/server";

export interface Task {
  id: number;
  name: string;
  date: string;
  description: string;
  completed: boolean;
}

const taskList: Task[] = [
  {
    id: 1,
    completed: true,
    date: "hpy",
    description: "sacar al perro",
    name: "Sacar a  coffe",
  },
  {
    id: 2,
    completed: false,
    date: "hoy2",
    description: "hacer el desayuno",
    name: "Hacer de comer",
  },
];

export async function GET(req: Request) {
  const url = new URL(req.url);
  const status = url.searchParams.get("status");
  let filterTask = taskList;
  if (!status) return NextResponse.json(filterTask);
  console.log(status == "completed")

  if (status == "completed") {
    filterTask = taskList.filter((task) => task.completed);
  } else {
    filterTask = taskList.filter((task) => !task.completed);
  }

  return NextResponse.json(filterTask);
}

export async function  POST(req:Request) {
    const body = await req.json();
    if(!body) return NextResponse.json({
        message: "La tarea no es valida"
    }, {status: 400})

    if(!body.date || !body.description || !body.name ){
        return NextResponse.json({
            message: "La tarea no es valida"
        }, {status: 400})
    }

    const newTask: Task = { id: Date.now(),completed: false , ...body  }
    taskList.push(newTask)

    return NextResponse.json(newTask, { status: 201})
}