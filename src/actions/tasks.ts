import { ThunkAction } from "redux-thunk";
import * as api from "../api";
import { RootState } from "../reducers";
import {
  CREATE_TASK_SUCCEEDED,
  EDIT_TASK_SUCCEEDED,
  DELETE_TASK_SUCCEEDED,
  CreateTaskSucceeded,
  EditTaskSucceeded,
  DeleteTaskSucceeded,
  Task,
  InitialTask,
} from "../reducers/tasks";

export const editTaskSucceeded = (task: Task): EditTaskSucceeded => ({
  type: EDIT_TASK_SUCCEEDED,
  payload: {
    task,
  },
});

type EditTask = ThunkAction<Promise<void>, RootState, void, EditTaskSucceeded>;

export const editTask = (task: Task, params = {}): EditTask => async (
  dispatch
) => {
  const updatedTask = {
    ...task,
    ...params,
  };
  const resp = await api.editTask(task.id, updatedTask);
  dispatch(editTaskSucceeded(resp.data));
};

export const deleteTaskSucceeded = (task: Task): DeleteTaskSucceeded => ({
  type: DELETE_TASK_SUCCEEDED,
  payload: {
    task,
  },
});

type DeleteTask = ThunkAction<
  Promise<void>,
  RootState,
  void,
  DeleteTaskSucceeded
>;

export const deleteTask = (task: Task): DeleteTask => async (dispatch) => {
  await api.deleteTask(task.id);
  dispatch(deleteTaskSucceeded(task));
};

export const createTaskSucceeded = (task: Task): CreateTaskSucceeded => ({
  type: CREATE_TASK_SUCCEEDED,
  payload: {
    task,
  },
});

type CreateTask = ThunkAction<
  Promise<void>,
  RootState,
  void,
  CreateTaskSucceeded
>;

export const createTask = ({
  projectId,
  title,
  description,
  status = "Unstarted",
}: InitialTask): CreateTask => async (dispatch) => {
  const resp = await api.createTask({ title, description, status, projectId });
  dispatch(createTaskSucceeded(resp.data));
};
