import React from "react";
import TasksHeader from "./TasksHeader";
import GroupedTasks from "./GroupedTasks";
import { useSelector } from "react-redux";
import { getIsLoading } from "../reducers";

const TasksPage = () => {
  const isLoading = useSelector(getIsLoading);
  return isLoading ? (
    <div className="tasks-loading">Loading...</div>
  ) : (
    <div className="tasks">
      <TasksHeader />
      <GroupedTasks />
    </div>
  );
};

export default TasksPage;
