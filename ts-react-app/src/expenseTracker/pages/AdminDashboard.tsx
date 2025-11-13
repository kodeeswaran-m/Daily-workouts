import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authReducer";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      <h2>Admin Dashboard </h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminDashboard;
