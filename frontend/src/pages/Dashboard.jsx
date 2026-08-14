import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import TaskStats from '../components/TaskStats';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';

const FILTERS = ['All', 'Pending', 'Completed', 'High Priority'];

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await api.get('/tasks/');
      setTasks(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (data) => {
    await api.post('/tasks/', data);
    setShowForm(false);
    fetchTasks();
  };

  const handleEditTask = async (data) => {
    await api.put(`/tasks/${editingTask.id}/`, data);
    setEditingTask(null);
    fetchTasks();
  };

  const handleToggleComplete = async (task) => {
    await api.patch(`/tasks/${task.id}/`, { is_completed: !task.is_completed });
    fetchTasks();
  };

  const handleDelete = async (task) => {
    if (!window.confirm(`Delete "${task.title}"?`)) return;
    await api.delete(`/tasks/${task.id}/`);
    fetchTasks();
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'Pending') return !t.is_completed;
    if (filter === 'Completed') return t.is_completed;
    if (filter === 'High Priority') return t.priority === 'High';
    return true;
  });

  return (
    <div>
      <Navbar />
      <div className="container">
        <TaskStats tasks={tasks} />

        <div className="section-header">
          <h2>My Tasks</h2>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            <Plus size={16} /> Add Task
          </button>
        </div>

        <div className="filter-row">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'filter-active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="task-list">
          {loading && <p className="empty-msg">Loading tasks...</p>}
          {!loading && filteredTasks.length === 0 && <p className="empty-msg">No tasks found.</p>}
          {!loading &&
            filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={handleToggleComplete}
                onEdit={setEditingTask}
                onDelete={handleDelete}
              />
            ))}
        </div>
      </div>

      {showForm && <TaskForm onSubmit={handleAddTask} onCancel={() => setShowForm(false)} />}
      {editingTask && (
        <TaskForm initialTask={editingTask} onSubmit={handleEditTask} onCancel={() => setEditingTask(null)} />
      )}
    </div>
  );
};

export default Dashboard;
