import axios from "axios";
const { REACT_APP_BACKEND_BASE_URL } = process.env;

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: REACT_APP_BACKEND_BASE_URL,
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
