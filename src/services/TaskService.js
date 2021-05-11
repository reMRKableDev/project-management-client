import axios from "axios";

class TaskService {
  constructor() {
    let service = axios.create({
      baseURL: "http://localhost:5000/api",
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
