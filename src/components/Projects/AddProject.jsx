import React, { useState } from "react";

import ProjectService from "../../services/ProjectService";

const initialState = {
  title: "",
  description: "",
};

const AddProject = ({ getData }) => {
  const [formState, setFormState] = useState(initialState);

  const service = new ProjectService();

  // HANDLE THE CHANGES IN THE INPUT FIELDS
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  // HANDLE FORM SUBMISSION
  const handleFormSubmit = (event) => {
    event.preventDefault();

    service
      .createProject(formState)
      .then(() => {
        getData();
        setFormState(initialState);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>Projects Form</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formState.title}
          onChange={handleInputChange}
        />
        <label>Description:</label>
        <textarea
          name="description"
          value={formState.description}
          onChange={handleInputChange}
        />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AddProject;
