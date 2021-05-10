import React, { Component } from "react";
import axios from "axios";

class AddTask extends Component {
  state = { title: "", description: "", isShowing: false }; // `isShowing` will help us to toggle add task form

  handleFormSubmit = (event) => {
    event.preventDefault();
    const title = this.state.title;
    const description = this.state.description;
    const projectID = this.props.theProject._id; // <== we need to know to which project the created task belong, so we need to get its 'id'
    // it has to be the 'id' because we are referencing project
    // by its id in the task model on the server side ( project: {type: Schema.Types.ObjectId, ref: 'Project'})

    // { title, description, projectID } => this is 'req.body' that will be received on the server side in this route,
    // so the names have to match
    axios
      .post("http://localhost:5000/api/tasks", {
        title,
        description,
        projectID,
      })
      .then(() => {
        // after submitting the form, retrieve project one more time so the new task is displayed as well
        //              |
        this.props.getTheProject();
        this.setState({ title: "", description: "" });
      })
      .catch((error) => console.log(error));
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
