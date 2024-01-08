interface LoaderProps {
  height?: number;
}

const Loader: React.FC<LoaderProps> = ({ height = "100vh" }) => (
  <div style={{ height, display: "grid", placeItems: "center" }}>
    <div
      className="spinner-border"
      style={{ width: 50, height: 50, fontSize: 30 }}
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export default Loader;
