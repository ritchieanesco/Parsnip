import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../actions";
import { getCurrentProjectId } from "../reducers";

const AddTaskForm = () => {
  const dispatch = useDispatch();
  const currentProjectId = useSelector(getCurrentProjectId);
  const initialState = {
    title: "",
    description: "",
  };
  const [task, setTask] = React.useState(initialState);
  const resetForm = () => {
    setTask(initialState);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      actions.createTask({
        projectId: currentProjectId,
        title: task.title,
        description: task.description,
      })
    );
    resetForm();
  };
  const handleTitleChange = (e) => {
    setTask({ ...task, title: e.target.value });
  };
  const handleDescriptionChange = (e) => {
    setTask({ ...task, description: e.target.value });
  };
  return (
    <form className="new-task-form" onSubmit={handleSubmit}>
      <input
        className="full-width-input"
        value={task.title}
        onChange={handleTitleChange}
        name="title"
        type="text"
        placeholder="title"
      />{" "}
      <input
        className="full-width-input"
        value={task.description}
        onChange={handleDescriptionChange}
        name="description"
        type="text"
        placeholder="description"
      />{" "}
      <button className="button" type="submit">
        Save{" "}
      </button>
    </form>
  );
};

export default AddTaskForm;
