import { Link, Navigate } from "react-router-dom";
import { Context, server } from "../main";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/user/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      toast.error("Invalid Email or Password");
      console.log(error);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };
  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <form
      className="d-flex vh-100 justify-content-center vh-100 p-3 mb-2 bg-dark-subtle text-dark-emphasis"
      onSubmit={submitHandler}
    >
      <div className="w-25 p-2">
        <div className="h1 text-center mb-5 mt-5 pt-3">LOGIN</div>
        <div className="form-floating mb-3">
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            style={{ minWidth: "200px" }}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            style={{ minWidth: "200px" }}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100 mt-5"
          disabled={loading}
        >
          Submit
        </button>
        <h4 className="text-center mt-4">OR</h4>
        <div className="text-center mt-3">
          <Link
            to="/register"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Login;
