import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../actions";
import { getCurrentProjectId } from "../reducers";

interface Fields {
  title: string;
  description: string;
}

const AddTaskForm: React.FC = () => {
  const dispatch = useDispatch();
  const currentProjectId = useSelector(getCurrentProjectId);
  const initialState: Fields = {
    title: "",
    description: "",
  };
  const [task, setTask] = React.useState<Fields>(initialState);
  const resetForm = () => {
    setTask(initialState);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProjectId) return;
    dispatch(
      actions.createTask({
        projectId: currentProjectId,
        title: task.title,
        description: task.description,
      })
    );
    resetForm();
  };
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask({ ...task, title: e.target.value });
  };
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
