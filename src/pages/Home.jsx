import { useContext, useEffect, useState } from "react";
import { Context, server } from "../main";
import Accordian from "../coponents/Accordian";
import axios from "axios";
import toast from "react-hot-toast";

const Home = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useContext(Context);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const updateHandler = async (id) => {
    // toast.success(id);
    try {
      const { data } = await axios.put(
        `${server}/task/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const deleteHandler = async (id) => {
    // toast.error(id);
    try {
      const { data } = await axios.delete(`${server}/task/${id}`, {
        withCredentials: true,
      });
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const submitHandler = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      const { data } = await axios.post(
        `${server}/task/new`,
        {
          title,
          description,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setTitle("");
      setDescription("");
      toast.success(data.message);
      setLoading(false);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get(`${server}/task/my`, {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res.data.data);
        setTasks(res.data.data);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }, [refresh]);

  if (isAuthenticated) {
    return (
      <>
        <form
          className="d-flex justify-content-center mb-2 bg-dark-subtle text-dark-emphasis"
          onSubmit={submitHandler}
          style={{ minHeight: "100vh" }}
        >
          <div className="w-35 p-2">
            <div className="h1 text-center mb-5 mt-5 pt-3">T O - D O ' s</div>
            <div className="form-floating mb-3">
              <input
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                type="text"
                className="form-control"
                id="floatingInput1"
                placeholder="To-Do Title"
                style={{ minWidth: "200px" }}
                required
              />
              <label htmlFor="floatingInput">Title</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                required
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Description"
                style={{ minWidth: "200px" }}
              />
              <label htmlFor="floatingInput">Description</label>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 mt-5"
              disabled={loading}
            >
              ADD TASK
            </button>
            <section className="p-5 text-align-center">
              {tasks.map((i) => (
                <Accordian
                  title={i.title}
                  description={i.description}
                  key={i._id}
                  isCompleted={i.isCompleted}
                  updateHandler={updateHandler}
                  deleteHandler={deleteHandler}
                  id={i._id}
                ></Accordian>
              ))}
            </section>
          </div>
        </form>
      </>
    );
  } else {
    return (
      <div className="d-flex flex-column min-vh-100 bg-dark-subtle text-dark-emphasis">
        <header className="text-center p-5 bg-secondary-subtle text-danger-emphasis">
          <h1>Welcome to the To-Do List Generator</h1>
          <p className="lead">Organize your tasks efficiently</p>
        </header>

        <main className="container my-5">
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card h-100 bg-light">
                <div className="card-body">
                  <h5 className="card-title">Prioritize Your Tasks</h5>
                  <p className="card-text">
                    Create to-do lists that help you focus on what matters most.
                    Sort tasks by priority to tackle your most important work
                    first.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 bg-light">
                <div className="card-body">
                  <h5 className="card-title">Stay Organized</h5>
                  <p className="card-text">
                    Keep track of your tasks with organized lists. Use
                    categories to separate work, personal, and other activities.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 bg-light">
                <div className="card-body">
                  <h5 className="card-title">Boost Productivity</h5>
                  <p className="card-text">
                    Increase your productivity by breaking down tasks into
                    manageable steps. Achieve more by staying focused on your
                    goals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
};

export default Home;
