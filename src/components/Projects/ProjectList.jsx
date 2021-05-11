import React, { Component } from "react";
import { Link } from "react-router-dom";

import AddProject from "./AddProject";
import ProjectService from "../../services/ProjectService";

class ProjectList extends Component {
  state = {
    listOfProjects: [],
  };

  service = new ProjectService();

  // Api Caller Function
  getAllProjects = () => {
    this.service
      .getProjects()
      .then((responseFromApi) => {
        this.setState({
          listOfProjects: responseFromApi,
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
          {this.state.listOfProjects &&
            this.state.listOfProjects.map((projectItem) => {
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
