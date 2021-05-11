import axios from "axios";

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: "http://localhost:5000/api",
      withCredentials: true,
    });

    this.service = service;
  }

  signup = (username, password) =>
    this.service
      .post("/signup", { username, password })
      .then((response) => response.data);

  login = (username, password) =>
    this.service
      .post("/login", { username, password })
      .then((response) => response.data);

  logout = () =>
    this.service.post("/logout", {}).then((response) => response.data);

  isLoggedIn = () =>
    this.service.get("/loggedin").then((response) => response.data);
}

export default AuthService;
