import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import AddProject from "./AddProject";

class ProjectList extends Component {
  state = {
    listOfProjects: [],
  };

  // Api Caller Function
  getAllProjects = () => {
    axios
      .get(`http://localhost:5000/api/projects`)
      .then((responseFromApi) => {
        this.setState({
          listOfProjects: responseFromApi.data,
        });
      })
      .catch((err) => console.error(err));
  };

  // MAKE AN API CALL WHEN COMPONENT MOUNTS
  componentDidMount() {
    this.getAllProjects();
  }

  render() {
    return (
      <div>
        <div style={{ width: "60%", float: "left" }}>
          {this.state.listOfProjects.map((projectItem) => {
            return (
              <div key={projectItem._id}>
                <Link to={`/projects/${projectItem._id}`}>
                  <h3>Project: {projectItem.title}</h3>
                </Link>
              </div>
            );
          })}
        </div>
        <div style={{ width: "40%", float: "right" }}>
          {/* We'll get back to this after lunch */}
          <AddProject getData={() => this.getAllProjects()} />
        </div>
      </div>
    );
  }
}

export default ProjectList;
