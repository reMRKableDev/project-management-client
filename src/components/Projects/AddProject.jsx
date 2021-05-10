import React, { useState } from "react";
import axios from "axios";

const initialState = {
  title: "",
  description: "",
};

const AddProject = ({ getData }) => {
  const [formState, setFormState] = useState(initialState);

  // HANDLE THE CHANGES IN THE INPUT FIELDS
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  // HANDLE FORM SUBMISSION
  const handleFormSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:5000/api/projects", formState)
      .then((response) => {
        console.log(response);
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
          required
        />
        <label>Description:</label>
        <textarea
          name="description"
          value={formState.description}
          onChange={handleInputChange}
          required
        />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AddProject;
