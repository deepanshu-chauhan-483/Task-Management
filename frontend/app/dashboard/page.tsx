"use client";

import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
import { getTasks, createTask as apiCreateTask } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { RefreshCw, Search, Filter } from "lucide-react";
import { toast } from "sonner";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

const ITEMS_PER_PAGE = 6;

export default function DashboardPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"" | "true" | "false">("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTasks = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    
    try {
      const data = await getTasks({
        page,
        limit: ITEMS_PER_PAGE,
        status,
        search,
      });
      setTasks(data.tasks);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
      toast.error("Failed to load tasks");
    } finally {
      if (isRefresh) setRefreshing(false);
      else setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [page, status, search]);

  const handleCreate = async (title: string) => {
    try {
      await apiCreateTask(title);
      setPage(1);
      await fetchTasks();
    } catch (err) {
      console.error("Failed to create task:", err);
      throw err;
    }
  };

  const handleRefresh = async () => {
    await fetchTasks(true);
    toast.success("Tasks refreshed");
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusChange = (value: "" | "true" | "false") => {
    setStatus(value);
    setPage(1);
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
            My Tasks
          </h1>
          <p className="text-slate-600">
            {completedCount} of {totalCount} tasks completed
          </p>
        </div>

        {/* Task Form */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-slate-200">
          <TaskForm onCreate={handleCreate} isLoading={loading} />
        </div>

        {/* Filters and Refresh */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-slate-200">
          <div className="flex flex-col gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-900 placeholder-slate-400"
              />
            </div>

            {/* Status Filter and Refresh */}
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-slate-400" />
                <select
                  value={status}
                  onChange={(e) =>
                    handleStatusChange(e.target.value as "" | "true" | "false")
                  }
                  className="flex-1 px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-900"
                >
                  <option value="">All Tasks</option>
                  <option value="true">Completed</option>
                  <option value="false">Pending</option>
                </select>
              </div>

              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw
                  className={`w-5 h-5 ${refreshing ? "animate-spin" : ""}`}
                />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tasks List */}
        <div className="mb-8">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-slate-600">Loading tasks...</p>
              </div>
            </div>
          ) : tasks.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 border border-slate-200 text-center">
              <p className="text-slate-500 text-lg mb-2">No tasks found</p>
              <p className="text-slate-400">
                {search || status ? "Try adjusting your filters" : "Create your first task to get started!"}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  refresh={() => fetchTasks(false)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white rounded-lg shadow-sm p-4 border border-slate-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-slate-600">
                Page <span className="font-semibold">{page}</span> of{" "}
                <span className="font-semibold">{totalPages}</span>
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-100"
                >
                  ← Previous
                </button>

                {/* Page Numbers */}
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .slice(
                      Math.max(0, page - 2),
                      Math.min(totalPages, page + 1)
                    )
                    .map((p) => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                          page === p
                            ? "bg-blue-600 text-white"
                            : "border border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                </div>

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-100"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
