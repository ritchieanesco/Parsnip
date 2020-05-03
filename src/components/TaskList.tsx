import * as React from "react";
import Task from "./Task";
import { Task as TaskType } from "../reducers/tasks";

interface Props {
  status: string;
  tasks: TaskType[];
}

const TaskList: React.FC<Props> = ({ status, tasks }) => {
  return (
    <div className="task-list">
      <div className="task-list-title">
        <strong>{status}</strong>
      </div>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
