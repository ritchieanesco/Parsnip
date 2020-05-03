import * as React from "react";
import TaskList from "./TaskList";
import { useSelector } from "react-redux";
import { getGroupedAndFilteredTasks } from "../reducers";

const TasksPage: React.FC = () => {
  const tasks = useSelector(getGroupedAndFilteredTasks);
  return (
    <div className="task-lists">
      {Object.keys(tasks).map((status) => {
        const tasksByStatus = tasks[status];
        return <TaskList key={status} status={status} tasks={tasksByStatus} />;
      })}
    </div>
  );
};

export default TasksPage;
