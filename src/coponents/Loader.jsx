const Loader = () => {
  return (
    <div className="d-flex vh-100 justify-content-center mb-2 bg-dark-subtle text-dark-emphasis">
      <div
        className="spinner-border text-secondary align-center"
        style={{ paddingTop: "30vh", marginTop: "30vh" }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
