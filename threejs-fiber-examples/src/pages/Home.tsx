import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Bookkeeper</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/Example1">Example1</Link> |{" "}
      </nav>
    </div>
  );
}