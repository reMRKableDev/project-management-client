import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import AuthService from "../../services/AuthService";

const Navbar = ({ userInSession, setUser }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const service = new AuthService();
  // KEEP AN EYE ON THE UPDATES OF THIS COMPONENT'S PROPS
  useEffect(() => {
    setLoggedInUser(userInSession);
  }, [userInSession]);

  // FUNCTION TO LOG USER OUT
  const logoutUser = () => {
    service
      .logout()
      .then(() => {
        setLoggedInUser(null);
        setUser(null);
      })
      .catch((err) => console.error(err));
  };

  return loggedInUser ? (
    <nav className="nav-style">
      <span>Welcome, {loggedInUser.username}</span>

      <ul style={{ listStyleType: "none" }}>
        <li>
          <Link to="/projects" style={{ textDecoration: "none" }}>
            Projects
          </Link>
        </li>
        <li>
          <Link to="/">
            <button onClick={() => logoutUser()}>Logout</button>
          </Link>
        </li>
      </ul>
    </nav>
  ) : (
    <nav className="nav-style">
      <ul style={{ listStyleType: "none" }}>
        <li>
          <Link to="/signup" style={{ textDecoration: "none" }}>
            Sign Up
          </Link>
        </li>
        <li>
          <Link to="/login" style={{ textDecoration: "none" }}>
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
