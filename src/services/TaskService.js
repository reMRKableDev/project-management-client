import axios from "axios";
const { REACT_APP_BACKEND_BASE_URL } = process.env;

class TaskService {
  constructor() {
    let service = axios.create({
      baseURL: REACT_APP_BACKEND_BASE_URL,
      withCredentials: true,
    });

    this.service = service;
  }

  createTask = (data) =>
    this.service.post("/api/tasks", data).then((response) => response.data);

  getOneTask = (projectId, taskId) =>
    this.service
      .get(`/api/projects/${projectId}/tasks/${taskId}`)
      .then((response) => response.data);
}

export default TaskService;
