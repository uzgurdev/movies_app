import { Link } from "react-router-dom";

interface UpdateProps {}

const Update = (props: UpdateProps) => (
  <div>
    <h1>Update Page</h1>
    <Link to="/movies" className="btn btn-outline-primary">Back</Link>
  </div>
);

export default Update;
