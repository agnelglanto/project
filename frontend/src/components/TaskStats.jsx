const TaskStats = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.is_completed).length;
  const pending = total - completed;

  return (
    <div className="stats-row">
      <div className="stat-card">
        <span className="stat-value">{total}</span>
        <span className="stat-label">Total Tasks</span>
      </div>
      <div className="stat-card">
        <span className="stat-value">{completed}</span>
        <span className="stat-label">Completed</span>
      </div>
      <div className="stat-card">
        <span className="stat-value">{pending}</span>
        <span className="stat-label">Pending</span>
      </div>
    </div>
  );
};

export default TaskStats;
