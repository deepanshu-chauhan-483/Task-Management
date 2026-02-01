import { prisma } from "../../prisma";

export const countTasks = async (
  userId: string,
  status?: string,
  search?: string
) => {
  const where: any = { userId };

  if (status === "completed") where.completed = true;
  else if (status === "pending") where.completed = false;

  if (search) where.title = { contains: search, mode: "insensitive" };

  return await prisma.task.count({ where });
};

export const getTasks = async (
  userId: string,
  page: number,
  limit: number,
  status?: string,
  search?: string
) => {
  const where: any = { userId };

  if (status === "completed") where.completed = true;
  else if (status === "pending") where.completed = false;

  if (search) where.title = { contains: search, mode: "insensitive" };

  return await prisma.task.findMany({
    where,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { createdAt: "desc" },
  });
};

export const createTask = async (userId: string, title: string) => {
  return await prisma.task.create({
    data: { title, userId },
  });
};

export const getTaskById = async (taskId: string, userId: string) => {
  return await prisma.task.findFirst({
    where: { id: taskId, userId },
  });
};

export const updateTask = async (taskId: string, userId: string, title: string) => {
  return await prisma.task.updateMany({
    where: { id: taskId, userId },
    data: { title },
  });
};

export const deleteTask = async (taskId: string, userId: string) => {
  return await prisma.task.deleteMany({
    where: { id: taskId, userId },
  });
};

export const toggleTask = async (taskId: string, userId: string) => {
  const task = await prisma.task.findFirst({
    where: { id: taskId, userId },
  });

  if (!task) return null;

  return await prisma.task.update({
    where: { id: taskId },
    data: { completed: !task.completed },
  });
};
