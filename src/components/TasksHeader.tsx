import * as React from "react";
import AddTask from "./AddTask";
import SearchTask from "./SearchTask";

const TasksHeader: React.FC = () => {
  const [visible, setVisible] = React.useState<boolean>(false);
  const toggleForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setVisible(!visible);
  };

  return (
    <>
      <div className="tasks-header">
        <SearchTask />
        <button
          type="button"
          className="button button-default"
          onClick={toggleForm}
        >
          + New task
        </button>
      </div>
      {visible && <AddTask />}
    </>
  );
};

export default TasksHeader;
