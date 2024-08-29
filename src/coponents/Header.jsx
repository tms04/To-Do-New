import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context, server } from "../main";
import axios from "axios";
import toast from "react-hot-toast";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  const logoutHandler = async (e) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/user/logout`, {
        withCredentials: true,
      });
      toast.success(data.message);
      setIsAuthenticated(false);
      setLoading(false);
      return <Navigate to={"/"} />;
    } catch (error) {
      toast.error("Unable to Logout");
      console.log(error);
      setIsAuthenticated(true);
      setLoading(false);
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary bg-dark"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <h2 className="navbar-brand p-3">To-Do</h2>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <Link className="nav-link active p-3" aria-current="page" to="/">
              Home
            </Link>
            {isAuthenticated ? (
              <Link className="nav-link p-3" to="/profile">
                Profile
              </Link>
            ) : (
              <></>
            )}
            {isAuthenticated ? (
              <button
                type="button"
                className="btn btn-outline-secondary"
                disabled={loading}
                onClick={logoutHandler}
              >
                Logout
              </button>
            ) : (
              <Link className="nav-link p-3" to="/login">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
