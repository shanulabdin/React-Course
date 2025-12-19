import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState(() => {
    // ✅ Optional: load from localStorage
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all"); // 'all' | 'active' | 'completed'

  // ✅ Optional: save to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleAddTask(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    const newTask = {
      id: Date.now(),
      text: trimmed,
      completed: false,
    };

    setTasks(prev => [newTask, ...prev]);
    setText("");
  }

  function toggleTask(id) {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(task => task.id !== id));
  }

  function clearCompleted() {
    setTasks(prev => prev.filter(task => !task.completed));
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const activeCount = tasks.filter(t => !t.completed).length;

  return (
    <div style={styles.app}>
      <h1 style={styles.title}>Focus Tasks ✅</h1>

      {/* Add Task */}
      <form onSubmit={handleAddTask} style={styles.form}>
        <input
          style={styles.input}
          type="text"
          placeholder="What do you want to do today?"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button style={styles.button} type="submit">
          Add
        </button>
      </form>

      {/* Filters */}
      <div style={styles.filterBar}>
        <span>{activeCount} tasks left</span>
        <div>
          <button
            style={{
              ...styles.filterButton,
              fontWeight: filter === "all" ? "bold" : "normal",
            }}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            style={{
              ...styles.filterButton,
              fontWeight: filter === "active" ? "bold" : "normal",
            }}
            onClick={() => setFilter("active")}
          >
            Active
          </button>
          <button
            style={{
              ...styles.filterButton,
              fontWeight: filter === "completed" ? "bold" : "normal",
            }}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>
        <button style={styles.clearButton} onClick={clearCompleted}>
          Clear completed
        </button>
      </div>

      {/* Task List */}
      <ul style={styles.list}>
        {filteredTasks.map(task => (
          <li key={task.id} style={styles.listItem}>
            <label style={styles.taskLabel}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <span
                style={{
                  marginLeft: 8,
                  textDecoration: task.completed ? "line-through" : "none",
                  opacity: task.completed ? 0.6 : 1,
                }}
              >
                {task.text}
              </span>
            </label>
            <button style={styles.deleteButton} onClick={() => deleteTask(task.id)}>
              ✕
            </button>
          </li>
        ))}

        {filteredTasks.length === 0 && (
          <p style={{ marginTop: 16, opacity: 0.7 }}>No tasks here. Add one 🙂</p>
        )}
      </ul>
    </div>
  );
}

const styles = {
  app: {
    maxWidth: 480,
    margin: "40px auto",
    padding: "24px 20px",
    borderRadius: 12,
    border: "1px solid #ddd",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  form: {
    display: "flex",
    gap: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    padding: "8px 10px",
    borderRadius: 8,
    border: "1px solid #ccc",
    outline: "none",
  },
  button: {
    padding: "8px 14px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
  },
  filterBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    fontSize: 14,
    marginBottom: 12,
    flexWrap: "wrap",
  },
  filterButton: {
    marginLeft: 4,
    border: "none",
    background: "transparent",
    cursor: "pointer",
  },
  clearButton: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: 12,
    textDecoration: "underline",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "6px 0",
    borderBottom: "1px solid #eee",
  },
  taskLabel: {
    display: "flex",
    alignItems: "center",
    flex: 1,
  },
  deleteButton: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: 16,
    padding: 4,
  },
};

export default App;
