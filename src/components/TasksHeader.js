import React from "react";
import AddTask from "./AddTask";
import SearchTask from "./SearchTask";

const TasksHeader = () => {
  const [visible, setVisible] = React.useState(false);
  const toggleForm = () => setVisible(!visible);

  return (
    <>
      <div className="tasks-header">
        <SearchTask />
        <button className="button button-default" onClick={toggleForm}>
          + New task
        </button>
      </div>
      {visible && <AddTask />}
    </>
  );
};

export default TasksHeader;
