import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

const UserMenu = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <Link to="/login" className="auth-link">
        Login
      </Link>
    );
  }

  const handleLogout = () => {
    logout();
    showToast("You have been logged out");
    navigate("/");
  };

  return (
    <div className="user-menu">
      {isAdmin && <span className="user-menu-badge">ADMIN</span>}
      <span className="user-menu-email" title={user.email}>
        {user.email}
      </span>
      <button className="user-menu-logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default UserMenu;