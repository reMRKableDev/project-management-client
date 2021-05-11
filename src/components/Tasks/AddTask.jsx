import React, { Component } from "react";

import TaskService from "../../services/TaskService";
class AddTask extends Component {
  state = { title: "", description: "", isShowing: false }; // `isShowing` will help us to toggle add task form

  service = new TaskService();

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { title, description } = this.state;
    const { _id } = this.props.theProject; // the project id

    this.service
      .createTask({ title, description, _id })
      .then(() => {
        this.props.getTheProject();
        this.setState({ title: "", description: "" });
      })
      .catch((err) => console.error(err));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ ...this.state, [name]: value });
  };

  toggleForm = () => {
    if (!this.state.isShowing) {
      this.setState({ ...this.state, isShowing: true });
    } else {
      this.setState({ ...this.state, isShowing: false });
    }
  };

  showAddTaskForm = () => {
    if (this.state.isShowing) {
      return (
        <div>
          <h3>Add Task</h3>
          <form onSubmit={this.handleFormSubmit}>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={(e) => this.handleChange(e)}
            />
            <label>Description:</label>
            <textarea
              name="description"
              value={this.state.description}
              onChange={(e) => this.handleChange(e)}
            />

            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <hr />
        <button onClick={() => this.toggleForm()}> Add task </button>
        {this.showAddTaskForm()}
      </div>
    );
  }
}

export default AddTask;
