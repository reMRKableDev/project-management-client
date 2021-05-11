import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Project Management App</h1>
      <div>
        <p>
          <Link to="/login">Login</Link>
        </p>
        <p>
          <Link to="/signup">Signup</Link>
        </p>
        <p>
          <Link to="/projects">See All Projects</Link>
        </p>
      </div>
    </div>
  );
};

export default Home;
