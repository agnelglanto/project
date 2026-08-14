import { CheckCircle, Circle, Pencil, Trash2 } from 'lucide-react';

const priorityClass = {
  Low: 'priority-low',
  Medium: 'priority-medium',
  High: 'priority-high',
};

const TaskCard = ({ task, onToggleComplete, onEdit, onDelete }) => {
  return (
    <div className={`task-card ${task.is_completed ? 'task-completed' : ''}`}>
      <div className="task-main">
        <button className="check-btn" onClick={() => onToggleComplete(task)}>
          {task.is_completed ? <CheckCircle size={22} color="#16a34a" /> : <Circle size={22} />}
        </button>
        <div className="task-info">
          <h3 className={task.is_completed ? 'strike' : ''}>{task.title}</h3>
          {task.description && <p className="task-desc">{task.description}</p>}
          <div className="task-meta">
            <span className={`badge ${priorityClass[task.priority]}`}>{task.priority} Priority</span>
            {task.due_date && <span className="due-date">Due: {task.due_date}</span>}
          </div>
        </div>
      </div>
      <div className="task-actions">
        {!task.is_completed && (
          <button className="btn btn-small btn-success" onClick={() => onToggleComplete(task)}>
            Complete
          </button>
        )}
        <button className="btn btn-small btn-outline" onClick={() => onEdit(task)}>
          <Pencil size={14} /> Edit
        </button>
        <button className="btn btn-small btn-danger" onClick={() => onDelete(task)}>
          <Trash2 size={14} /> Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
