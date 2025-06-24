import { Link } from "react-router-dom";
import Button from "./Button";

const EmptyState = () => (
  <>
    <h3
      style={{
        color: "#f04848",
        marginTop: "5rem",
        textAlign: "left",
      }}
    >
      You do not have any notes yet.
      <br />
      Go add some.
    </h3>
    <Link to="/create">
      <Button
        label="Create Note"
        style={{ textAlign: "center", margin: "1rem auto 0" }}
      />
    </Link>
  </>
);

export default EmptyState;
