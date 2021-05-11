import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import EditProject from "./EditProject";
import AddTask from "../Tasks/AddTask";

import ProjectService from "../../services/ProjectService";

const ProjectDetails = (props) => {
  const [details, setDetails] = useState({});

  // API CALLER
  const getSingleProject = () => {
    const { id } = props.match.params;

    // NEW PROJECT SERVICE INSTANCE
    const service = new ProjectService();

    service
      .getOneProject(id)
      .then((responseFromApi) => setDetails(responseFromApi))
      .catch((error) => {
        console.error(error);
      });
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

    const service = new ProjectService();

    const response = await service.removeProject(id);

    response.message && props.history.push("/projects");
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

  const ownershipCheck = (project) => {
    if (props.loggedInUser && project.owner === props.loggedInUser._id) {
      return (
        <div>
          <div>{renderEditForm()}</div>

          <button onClick={() => deleteProject()}>Delete</button>
        </div>
      );
    }
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

      {ownershipCheck(details)}

      <div>{renderAddTaskForm()}</div>
    </div>
  );
};

export default ProjectDetails;
