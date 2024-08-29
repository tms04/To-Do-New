import { useContext, useEffect } from "react";
import { Context, server } from "../main";
import Loader from "../coponents/Loader";
import axios from "axios";
// import { Navigate } from "react-router-dom";

const Profile = () => {
  // const { loading, user } = useContext(Context);
  const { setIsAuthenticated, setUser, setLoading, loading, user } =
    useContext(Context);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${server}/user/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        setIsAuthenticated(true);
        setLoading(false);
      })
      .catch((e) => {
        setUser({});
        setIsAuthenticated(false);
        setLoading(false);
      });
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="d-flex justify-content-center vh-100 p-3 mb-2 bg-dark-subtle text-dark-emphasis ">
      <div
        className="card"
        style={{ width: "18rem", height: "10rem", marginTop: "30vh" }}
      >
        <div className="card-body">
          <h5 className="card-title text-center pt-4">{user?.name}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary text-center pt-4">
            {user?.email}
          </h6>
        </div>
      </div>
    </div>
  );
  // console.log(user.name);
};

export default Profile;
