import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Project Management App</h1>
      <Link to="/projects">See All Projects</Link>
    </div>
  );
};

export default Home;
