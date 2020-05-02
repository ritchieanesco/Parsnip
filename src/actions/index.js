import { normalize, schema } from "normalizr";
import * as api from "../api";
import {
  CREATE_TASK_SUCCEEDED,
  EDIT_TASK_SUCCEEDED,
  DELETE_TASK_SUCCEEDED,
} from "../reducers/tasks";
import {
  FETCH_PROJECTS_STARTED,
  FETCH_PROJECTS_FAILED,
  FETCH_PROJECTS_SUCCEEDED,
} from "../reducers/projects";
import { FILTER_TASKS, SET_CURRENT_PROJECT_ID } from "../reducers/page";

const taskSchema = new schema.Entity("tasks");
const projectSchema = new schema.Entity("projects", {
  tasks: [taskSchema],
});

const receiveEntities = (entities) => ({
  type: "RECEIVE_ENTITIES",
  payload: entities,
});

/** Page Action Creators */

export const filterTasks = (searchTerm) => ({
  type: FILTER_TASKS,
  payload: {
    searchTerm,
  },
});

export const setCurrentProjectId = (id) => ({
  type: SET_CURRENT_PROJECT_ID,
  payload: {
    id,
  },
});

/** Task Action Creators */

export const editTaskSucceeded = (task) => ({
  type: EDIT_TASK_SUCCEEDED,
  payload: {
    task,
  },
});

export const editTask = (task, params = {}) => (dispatch) => {
  const updatedTask = {
    ...task,
    ...params,
  };
  api.editTask(task.id, updatedTask).then((resp) => {
    dispatch(editTaskSucceeded(resp.data));
  });
};

export const deleteTaskSucceeded = (task) => ({
  type: DELETE_TASK_SUCCEEDED,
  payload: {
    task,
  },
});

export const deleteTask = (task) => (dispatch) => {
  api.deleteTask(task.id).then((resp) => {
    dispatch(deleteTaskSucceeded(task));
  });
};

export const createTaskSucceeded = (task) => ({
  type: CREATE_TASK_SUCCEEDED,
  payload: {
    task,
  },
});

export const createTask = ({
  projectId,
  title,
  description,
  status = "Unstarted",
}) => (dispatch) =>
  api.createTask({ title, description, status, projectId }).then((resp) => {
    dispatch(createTaskSucceeded(resp.data));
  });

/** Project Action Creators */

export const fetchProjectsStarted = (boards) => ({
  type: FETCH_PROJECTS_STARTED,
  payload: {
    boards,
  },
});

export const fetchProjectsSucceeded = (projects) => ({
  type: FETCH_PROJECTS_SUCCEEDED,
  payload: {
    projects,
  },
});

export const fetchProjectsFailed = (err) => ({
  type: FETCH_PROJECTS_FAILED,
  payload: {
    err,
  },
});

export const fetchProjects = () => (dispatch, getState) => {
  dispatch(fetchProjectsStarted());
  api
    .fetchProjects()
    .then((resp) => {
      const projects = resp.data;
      const normalizedData = normalize(projects, [projectSchema]);

      dispatch(receiveEntities(normalizedData));

      if (!getState().page.currentProjectId) {
        const defaultProjectId = projects[0].id;
        dispatch(setCurrentProjectId(defaultProjectId));
      }
    })
    .catch((error) => {
      dispatch(fetchProjectsFailed(error.message));
    });
};
