import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import "../CSS/Navigation.css";

const UserDropdown = () => {
  const { handleLogOut } = useAuth();
  // const userName = `${firstName} ${lastName}`;

  return (
    <div className="dropdown-menu-user">
      <p className="nav-username">Dinesh R</p>
      <p className="nav-email">rdineshrdp@gmail.com</p>
      <div className="d-flex justify-content-center">
        <Link to="/login" className="links">
          <button
            className="btn btn-nav btn-outline-success rounded-pill px-4 py-1 text-center"
            type="button"
            onClick={handleLogOut}
            data-bs-dismiss="offcanvas"
          >
            Logout
          </button>
        </Link>
      </div>
    </div>
  );
};

export { UserDropdown };
