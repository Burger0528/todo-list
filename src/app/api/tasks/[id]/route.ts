import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { TaskModel } from "@/models/Task";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    await connectDB();
    await TaskModel.findByIdAndUpdate(id, body);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: "Error actualizando tarea" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectDB();
    await TaskModel.findByIdAndDelete(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: "Error eliminando tarea" }, { status: 500 });
  }
}
