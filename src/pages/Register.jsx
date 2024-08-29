import { useState, useContext } from "react";
import axios from "axios";
import { server } from "../main";
import toast from "react-hot-toast";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${server}/user/new`,
        { name, email, password },
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
      toast.error("Already Registered");
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
      className="d-flex vh-100 justify-content-center vh-100 mb-2 bg-dark-subtle text-dark-emphasis"
      onSubmit={submitHandler}
    >
      <div className="w-25 p-2">
        <div className="h1 text-center mb-5 mt-5 pt-3">REGISTER</div>
        <div className="form-floating mb-3">
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            className="form-control"
            id="floatingInput1"
            placeholder="Full Name"
            style={{ minWidth: "200px" }}
            required
          />
          <label htmlFor="floatingInput">Name</label>
        </div>
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
      </div>
    </form>
  );
};
export default Register;
