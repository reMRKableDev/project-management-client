import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import EditProject from "./EditProject";
import AddTask from "../Tasks/AddTask";

const ProjectDetails = (props) => {
  const [details, setDetails] = useState({});

  // Api Caller
  const getSingleProject = () => {
    const { id } = props.match.params;

    fetch(`http://localhost:5000/api/projects/${id}`)
      .then((response) => response.json())
      .then((data) => setDetails(data))
      .catch((err) => console.error(err));
  };

  // MAKE API CALL WHEN COMPONENT MOUNTS
  useEffect(getSingleProject, [props.match.params]);

  // Rendering the edit form
  const renderEditForm = () => {
    /* if (!details.title) {
      getSingleProject();
    } else {
      return <EditProject project={details} {...props} />;
    } */
    return (
      details.title && (
        <EditProject
          project={details}
          getTheProject={getSingleProject}
          {...props}
        />
      )
    );
  };

  // Deleting
  const deleteProject = async () => {
    const { id } = props.match.params;
    // const { _id } = details;

    const response = await axios.delete(
      `http://localhost:5000/api/projects/${id}`
    );
    const { data } = response;

    data.message ? props.history.push("/projects") : props.history.push("/404");
  };

  // Render task form
  const renderAddTaskForm = () => {
    /*  if (!details.title) {
      getSingleProject();
    } else {
      // pass the project and method getSingleProject() as a props down to AddTask component
      return <AddTask theProject={details} getTheProject={getSingleProject} />;
    } */

    return (
      details.title && (
        <AddTask theProject={details} getTheProject={getSingleProject} />
      )
    );
  };

  return (
    <div>
      <h1>{details.title}</h1>
      <p>{details.description}</p>

      <h3>Tasks</h3>
      {details.tasks && details.tasks.length === 0 && (
        <p>No tasks are here yet!, Add a new one</p>
      )}

      {details.tasks &&
        details.tasks.map((task) => (
          <div key={task._id}>
            <Link to={`/projects/${details._id}/tasks/${task._id}`}>
              {task.title}
            </Link>
          </div>
        ))}

      <div>{renderEditForm()}</div>

      <button onClick={() => deleteProject()}>Delete</button>

      <div>{renderAddTaskForm()}</div>
    </div>
  );
};

export default ProjectDetails;
