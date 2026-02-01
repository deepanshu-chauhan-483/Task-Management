"use client";

import { useState } from "react";
import { Check, Trash2, Edit2, Save, X } from "lucide-react";
import { toggleTask, deleteTask, updateTask } from "../lib/api";
import { toast } from "sonner";

interface TaskProps {
  task: { id: string; title: string; completed: boolean };
  refresh: () => void;
}

export default function TaskItem({ task, refresh }: TaskProps) {
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const handleToggle = async () => {
    setLoading(true);
    try {
      await toggleTask(task.id);
      toast.success(task.completed ? "Task marked as pending" : "Task completed!");
      await refresh();
    } catch (error) {
      toast.error("Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    
    setLoading(true);
    try {
      await deleteTask(task.id);
      toast.success("Task deleted successfully");
      await refresh();
    } catch (error) {
      toast.error("Failed to delete task");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!title.trim()) {
      toast.error("Task title cannot be empty");
      return;
    }
    
    setLoading(true);
    try {
      await updateTask(task.id, title);
      setEditing(false);
      toast.success("Task updated successfully");
      await refresh();
    } catch (error) {
      toast.error("Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setTitle(task.title);
    setEditing(false);
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 rounded-lg p-4 hover:shadow-md hover:border-purple-300/50 transition-all">
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <button
          onClick={handleToggle}
          disabled={loading}
          className={`flex-shrink-0 mt-1 w-6 h-6 rounded-md border-2 transition-all flex items-center justify-center ${
            task.completed
              ? "bg-gradient-to-br from-green-400 to-emerald-500 border-emerald-500 shadow-md"
              : "border-blue-300 hover:border-purple-400 hover:bg-purple-50/50"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {task.completed && <Check className="w-4 h-4 text-white" />}
        </button>

        {/* Title/Edit */}
        <div className="flex-1 min-w-0">
          {editing ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
              autoFocus
              className="w-full px-3 py-2 rounded-md border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-slate-900 disabled:bg-slate-100"
            />
          ) : (
            <p
              className={`break-words ${
                task.completed
                  ? "line-through text-slate-400"
                  : "text-slate-900"
              }`}
            >
              {task.title}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex-shrink-0 flex gap-2">
          {editing ? (
            <>
              <button
                onClick={handleUpdate}
                disabled={loading}
                className="p-2 text-white bg-gradient-to-br from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                title="Save"
              >
                <Save className="w-4 h-4" />
              </button>
              <button
                onClick={handleCancel}
                disabled={loading}
                className="p-2 text-white bg-gradient-to-br from-slate-400 to-slate-500 hover:from-slate-500 hover:to-slate-600 rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                title="Cancel"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditing(true)}
                disabled={loading}
                className="p-2 text-white bg-gradient-to-br from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                title="Edit"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="p-2 text-white bg-gradient-to-br from-red-400 to-rose-500 hover:from-red-500 hover:to-rose-600 rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
