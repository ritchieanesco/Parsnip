import React from "react";
import { useDispatch } from "react-redux";
import * as actions from "../actions";
import SelectStatus from "./SelectStatus";

const Task = ({ task }) => {
  const dispatch = useDispatch();
  const { title, description, status } = task;
  const handleStatus = (e) => {
    e.preventDefault();
    dispatch(actions.editTask(task, { status: e.target.value }));
  };
  const handleRemove = (e) => {
    e.preventDefault();
    dispatch(actions.deleteTask(task));
  };
  return (
    <div className="task">
      <div className="task-header">
        <div>{title}</div>
        <button type="button" onClick={handleRemove}>
          Remove
        </button>
        <SelectStatus selected={status} handleStatus={handleStatus} />
      </div>
      <hr />
      <div className="task-body">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Task;
