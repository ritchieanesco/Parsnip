import React from "react";
import TasksPage from "./components/TasksPage";
import { useSelector, useDispatch } from "react-redux";
import { getError } from "./reducers";
import * as actions from "./actions";
import ErrorMessage from "./components/ErrorMessage";
import Header from "./components/Header";

function App() {
  const dispatch = useDispatch();
  const error = useSelector(getError);

  React.useEffect(() => {
    dispatch(actions.fetchProjects());
  }, [dispatch]);

  return (
    <div className="container">
      {error && <ErrorMessage message={error} />}
      <div className="main-content">
        <Header />
        <TasksPage />
      </div>
    </div>
  );
}

export default App;
