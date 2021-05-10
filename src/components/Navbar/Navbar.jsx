import React from "react";
import { Link } from "react-router-dom";

const navbar = () => {
  return (
    <nav className="nav-style">
      <ul style={{ listStyleType: "none" }}>
        <li>
          <Link to="/projects" style={{ textDecoration: "none" }}>
            Projects
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default navbar;
