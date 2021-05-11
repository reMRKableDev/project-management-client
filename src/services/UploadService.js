import axios from "axios";

class UploadService {
  constructor() {
    let service = axios.create({
      baseURL: "http://localhost:5000/api",
      withCredentials: true,
    });

    this.service = service;
  }

  // Method to use for uploading an image
  upload = (theFile) => {
    return this.service
      .post("/upload", theFile)
      .then((response) => response.data)
      .catch((err) => {
        console.error(err);
        throw err;
      });
  };
}

export default UploadService;
