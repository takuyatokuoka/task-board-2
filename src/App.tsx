import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { Task } from "./types";
import "./App.css";

const STORAGE_KEY = "task-board-2:tasks";

function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);
  const [text, setText] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      text: trimmed,
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
    setText("");
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div className="app">
      <h1>タスクボード</h1>

      <form className="task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="新しいタスクを入力..."
        />
        <button type="submit">追加</button>
      </form>

      <ul className="task-list">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`task-item ${task.completed ? "completed" : ""}`}
          >
            <label className="task-label">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <span>{task.text}</span>
            </label>
            <button
              className="delete-button"
              onClick={() => deleteTask(task.id)}
              aria-label="削除"
            >
              削除
            </button>
          </li>
        ))}
      </ul>

      {tasks.length === 0 && <p className="empty-message">タスクがありません</p>}
    </div>
  );
}

export default App;
