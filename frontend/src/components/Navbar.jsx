import { LogOut, GraduationCap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { username, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <GraduationCap size={26} />
        <span>Student Task Manager</span>
      </div>
      <div className="navbar-user">
        <span>Welcome, {username}</span>
        <button className="btn btn-outline" onClick={handleLogout}>
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
