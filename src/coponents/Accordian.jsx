const Accordian = ({
  title,
  description,
  isCompleted,
  updateHandler,
  deleteHandler,
  id,
}) => {
  return (
    <div
      className="alert alert-primary d-flex justify-content-between align-items-center"
      role="alert"
      style={{ width: "400px" }}
    >
      <div>
        <b>{title}</b> <br />
        {description}
      </div>
      <div className="d-flex align-items-center">
        <input
          type="checkbox"
          checked={isCompleted}
          className="form-check-input me-3"
          onChange={() => updateHandler(id)}
        />
        <button
          className="btn btn-danger btn-sm"
          onClick={() => deleteHandler(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Accordian;
