import React, { useState } from "react";

import ProjectService from "../../services/ProjectService";
import UploadService from "../../services/UploadService";

const initialState = {
  title: "",
  description: "",
  imageUrl: "",
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

    const service = new ProjectService();

    service
      .createProject(formState)
      .then(() => {
        getData();
        setFormState(initialState);
      })
      .catch((err) => console.error(err));
  };

  // HANDLE FILE UPLOAD
  const handleFileUpload = (event) => {
    // Creates a new FormData object that will take the file upload data
    const uploadData = new FormData();
    uploadData.append("imageUrl", event.target.files[0]);

    const service = new UploadService();

    // upload the data to cloudinary
    service
      .upload(uploadData)
      .then((response) => {
        // The response from uploading to cloudinary is the url which will be saved in the database.
        setFormState({ ...formState, imageUrl: response.cloudinaryUrl });
      })
      .catch((err) => {
        console.error("Error while uploading the file: ", err);
      });
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

        <label htmlFor="imageUrl">Description:</label>
        <input type="file" name="imageUrl" onChange={handleFileUpload} />

        {formState.imageUrl ? (
          <button type="submit">Submit</button>
        ) : (
          <button disabled type="submit">
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default AddProject;
