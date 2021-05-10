import "./App.css";
import { Switch, Route } from "react-router-dom";

import ProjectList from "./components/Projects/ProjectList";
import ProjectDetails from "./components/Projects/ProjectDetails";
import EditProject from "./components/Projects/EditProject";
import TaskDetails from "./components/Tasks/TaskDetails";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          path="/projects/:projectId/tasks/:taskId"
          component={TaskDetails}
        />
        <Route path="/projects/:id" component={ProjectDetails} />
        <Route path="/edit" component={EditProject} />
        <Route path="/projects" component={ProjectList} />
      </Switch>
    </div>
  );
}

export default App;
