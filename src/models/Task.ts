import { Schema, model, models } from "mongoose";

const taskSchema = new Schema({
  title: { type: String, required: true },
  state: { type: String, enum: ["pending", "inProgress", "done"], default: "pending" },
  startDate: { type: Number },
  endDate: { type: Number },
});

export const TaskModel = models.Task || model("Task", taskSchema);
