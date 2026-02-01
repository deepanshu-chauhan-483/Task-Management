"use client";

import React from "react"

import { useState } from "react";

export default function TaskForm({ onCreate }: { onCreate: (title: string) => void }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onCreate(title);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        className="flex-1 px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-background text-foreground placeholder:text-foreground/40 transition-all"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        type="submit"
        className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg active:scale-95"
      >
        Add Task
      </button>
    </form>
  );
}
