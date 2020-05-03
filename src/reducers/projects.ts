import { Action, Reducer } from "redux";
import {
  CREATE_TASK_SUCCEEDED,
  DELETE_TASK_SUCCEEDED,
  Tasks,
  CreateTaskSucceeded,
  DeleteTaskSucceeded,
} from "./tasks";

export const RECEIVE_ENTITIES = "RECEIVE_ENTITIES";
export const FETCH_PROJECTS_STARTED = "FETCH_PROJECTS_STARTED";
export const FETCH_PROJECTS_FAILED = "FETCH_PROJECTS_FAILED";
export const FETCH_PROJECTS_SUCCEEDED = "FETCH_PROJECTS_SUCCEEDED";

export interface Project {
  id: number;
  name: string;
  tasks: number[];
}

export interface Projects {
  [index: string]: Project;
}

export interface ProjectsState {
  items: Projects;
  isLoading: boolean;
  error: null | string;
}

export interface Entities {
  projects: Projects;
  tasks: Tasks;
}

export interface ReceiveEntities extends Action<typeof RECEIVE_ENTITIES> {
  payload: {
    entities: Entities;
  };
}

export interface FetchProjectsStarted
  extends Action<typeof FETCH_PROJECTS_STARTED> {
  // no payload
}

export interface FetchProjectsFailed
  extends Action<typeof FETCH_PROJECTS_FAILED> {
  payload: {
    error: string;
  };
}

export interface FetchProjectsSucceeded
  extends Action<typeof FETCH_PROJECTS_SUCCEEDED> {
  payload: {
    projects: Projects;
  };
}

const initialState: ProjectsState = {
  items: {},
  isLoading: false,
  error: null,
};

export type ProjectActions =
  | ReceiveEntities
  | FetchProjectsStarted
  | FetchProjectsFailed
  | FetchProjectsSucceeded
  | CreateTaskSucceeded
  | DeleteTaskSucceeded;

const projects: Reducer<ProjectsState, ProjectActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case RECEIVE_ENTITIES: {
      const { entities } = action.payload;
      if (entities && entities.projects) {
        return {
          ...state,
          isLoading: false,
          items: entities.projects,
        };
      }
      return state;
    }
    case FETCH_PROJECTS_STARTED:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_PROJECTS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    case FETCH_PROJECTS_SUCCEEDED:
      return {
        ...state,
        items: action.payload.projects,
        isLoading: false,
      };
    case CREATE_TASK_SUCCEEDED: {
      const { task } = action.payload;
      const project = state.items[task.projectId];
      return {
        ...state,
        items: {
          ...state.items,
          [task.projectId]: {
            ...project,
            tasks: project.tasks.concat(task.id),
          },
        },
      };
    }
    case DELETE_TASK_SUCCEEDED:
      const { task } = action.payload;
      const project = state.items[task.projectId];
      const tasks = project.tasks.filter((t) => t !== task.id);
      return {
        ...state,
        items: {
          ...state.items,
          [task.projectId]: {
            ...project,
            tasks,
          },
        },
      };
    default:
      return state;
  }
};

export default projects;

export const getProjects = (state: ProjectsState) => state.items;
export const getIsLoading = (state: ProjectsState) => state.isLoading;
export const getError = (state: ProjectsState) => state.error;
