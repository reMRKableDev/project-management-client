import React, { Component } from "react";

import TaskService from "../../services/TaskService";

class TaskDetails extends Component {
  state = {};

  service = new TaskService();

  componentDidMount() {
    this.getTheTask();
  }

  getTheTask = () => {
    const { params } = this.props.match;

    this.service
      .getOneTask(params.id, params.taskId)
      .then((responseFromApi) => {
        this.setState(responseFromApi);
      })
      .catch((error) => console.error(error));
  };

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <p>{this.state.description}</p>
      </div>
    );
  }
}

export default TaskDetails;
