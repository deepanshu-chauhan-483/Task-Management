import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import * as service from "./task.service";

export const getTasks = async (req: AuthRequest, res: Response) => {
  const page =
    typeof req.query.page === "string" ? Number(req.query.page) : 1;

  const limit =
    typeof req.query.limit === "string" ? Number(req.query.limit) : 10;

  const status =
    typeof req.query.status === "string"
      ? req.query.status
      : undefined;

  const search =
    typeof req.query.search === "string"
      ? req.query.search
      : undefined;

  // Get total count for pagination
  const totalTasks = await service.countTasks(req.userId!, status, search);

  const tasks = await service.getTasks(
    req.userId!,
    page,
    limit,
    status,
    search
  );

  const totalPages = Math.ceil(totalTasks / limit);

  res.json({
    tasks,
    totalTasks,
    totalPages,
    currentPage: page,
  });
};

export const createTask = async (req: AuthRequest, res: Response) => {
  const { title } = req.body;

  if (!title || typeof title !== "string") {
    return res.status(400).json({ message: "Title required" });
  }

  const task = await service.createTask(req.userId!, title);
  res.status(201).json(task);
};

export const getTask = async (req: AuthRequest, res: Response) => {
  const taskId =
    typeof req.params.id === "string" ? req.params.id : req.params.id[0];

  const task = await service.getTaskById(taskId, req.userId!);

  if (!task) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json(task);
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  const taskId =
    typeof req.params.id === "string" ? req.params.id : req.params.id[0];

  const { title } = req.body;

  if (!title || typeof title !== "string") {
    return res.status(400).json({ message: "Title required" });
  }

  await service.updateTask(taskId, req.userId!, title);
  res.json({ message: "Updated" });
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  const taskId =
    typeof req.params.id === "string" ? req.params.id : req.params.id[0];

  await service.deleteTask(taskId, req.userId!);
  res.json({ message: "Deleted" });
};

export const toggleTask = async (req: AuthRequest, res: Response) => {
  const taskId =
    typeof req.params.id === "string" ? req.params.id : req.params.id[0];

  const task = await service.toggleTask(taskId, req.userId!);

  if (!task) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json(task);
};
