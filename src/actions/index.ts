import { normalize, schema, NormalizedSchema } from "normalizr";
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
  Tasks,
  Task,
  InitialTask,
} from "../reducers/tasks";
import {
  FETCH_PROJECTS_STARTED,
  FETCH_PROJECTS_FAILED,
  FETCH_PROJECTS_SUCCEEDED,
  RECEIVE_ENTITIES,
  FetchProjectsFailed,
  FetchProjectsStarted,
  FetchProjectsSucceeded,
  ReceiveEntities,
  Projects,
  Entities,
} from "../reducers/projects";
import {
  FILTER_TASKS,
  SET_CURRENT_PROJECT_ID,
  SetCurrentProjectId,
  SetFilterTasks,
} from "../reducers/page";

const taskSchema = new schema.Entity("tasks");
const projectSchema = new schema.Entity("projects", {
  tasks: [taskSchema],
});

const receiveEntities = (entities: Entities): ReceiveEntities => ({
  type: RECEIVE_ENTITIES,
  payload: {
    entities,
  },
});

/** Page Action Creators */

export const filterTasks = (searchTerm: string): SetFilterTasks => ({
  type: FILTER_TASKS,
  payload: {
    searchTerm,
  },
});

export const setCurrentProjectId = (id: number): SetCurrentProjectId => ({
  type: SET_CURRENT_PROJECT_ID,
  payload: {
    id,
  },
});

/** Task Action Creators */

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

/** Project Action Creators */

export const fetchProjectsStarted = (): FetchProjectsStarted => ({
  type: FETCH_PROJECTS_STARTED,
});

export const fetchProjectsSucceeded = (
  projects: Projects
): FetchProjectsSucceeded => ({
  type: FETCH_PROJECTS_SUCCEEDED,
  payload: {
    projects,
  },
});

export const fetchProjectsFailed = (error: string): FetchProjectsFailed => ({
  type: FETCH_PROJECTS_FAILED,
  payload: {
    error,
  },
});

type FetchProjects = ThunkAction<
  Promise<void>,
  RootState,
  void,
  | FetchProjectsFailed
  | ReceiveEntities
  | SetCurrentProjectId
  | FetchProjectsStarted
>;

export const fetchProjects = (): FetchProjects => async (
  dispatch,
  getState
) => {
  dispatch(fetchProjectsStarted());
  try {
    const resp = await api.fetchProjects();
    const projects = resp.data;
    const normalizedData: NormalizedSchema<
      {
        projects: Projects;
        tasks: Tasks;
      },
      any
    > = normalize(projects, [projectSchema]);
    dispatch(receiveEntities(normalizedData.entities));
    if (!getState().page.currentProjectId) {
      const defaultProjectId = projects[0].id;
      dispatch(setCurrentProjectId(defaultProjectId));
    }
  } catch (error) {
    dispatch(fetchProjectsFailed(error.message));
  }
};
