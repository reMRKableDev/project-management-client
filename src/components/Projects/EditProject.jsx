import React, { Component } from "react";

import ProjectService from "../../services/ProjectService";
class EditProject extends Component {
  state = {
    title: this.props.project.title,
    description: this.props.project.description,
  };

  service = new ProjectService();

  // HANDLE INPUT CHANGES
  handleInputChanges = (event) => {
    const { name, value } = event.target;
    this.setState({ ...this.state, [name]: value });
  };

  // HANDLE FORM SUBMISSION
  handleFormSubmit = (event) => {
    event.preventDefault();

    const { title, description } = this.state;
    const { _id } = this.props.project;

    this.service
      .updateProject(_id, { title, description })
      .then((response) => {
        response.message && this.props.getTheProject();
      })
      .catch((err) => console.error(err));

    /*     axios
      .put(`http://localhost:5000/api/projects/${_id}`, { title, description })
      .then((response) => {
        response.data.message && this.props.getTheProject();
      })
      .catch((err) => console.error(err)); */
  };

  render() {
    return (
      <div>
        <hr />
        <h3>Edit form</h3>
        <form onSubmit={this.handleFormSubmit}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={(e) => this.handleInputChanges(e)}
          />
          <label>Description:</label>
          <textarea
            name="description"
            value={this.state.description}
            onChange={(e) => this.handleInputChanges(e)}
          />

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default EditProject;
