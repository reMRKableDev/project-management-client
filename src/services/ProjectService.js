import axios from "axios";
const { REACT_APP_BACKEND_BASE_URL } = process.env;

class ProjectService {
  constructor() {
    let service = axios.create({
      baseURL: REACT_APP_BACKEND_BASE_URL,
      withCredentials: true,
    });

    this.service = service;
  }

  createProject = (data) =>
    this.service.post("/projects", data).then((response) => response.data);

  getProjects = () =>
    this.service.get("/projects").then((response) => response.data);

  getOneProject = (projectId) =>
    this.service
      .get(`/projects/${projectId}`)
      .then((response) => response.data);

  updateProject = (projectId, data) =>
    this.service
      .put(`/projects/${projectId}`, data)
      .then((response) => response.data);

  removeProject = (projectId) =>
    this.service
      .delete(`/projects/${projectId}`)
      .then((response) => response.data);
}

export default ProjectService;
