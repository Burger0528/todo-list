import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { TaskModel } from "@/models/Task";

export async function GET() {
  try {
    await connectDB();
    const tasks = await TaskModel.find();
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json({ error: "Error obteniendo tareas" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title } = await req.json();
    await connectDB();
    const task = await TaskModel.create({ title, state: "pending" });
    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error guardando tarea" }, { status: 500 });
  }
}
