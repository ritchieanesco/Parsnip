import { CREATE_TASK_SUCCEEDED, DELETE_TASK_SUCCEEDED } from "./tasks";

export const FETCH_PROJECTS_STARTED = "FETCH_PROJECTS_STARTED";
export const FETCH_PROJECTS_FAILED = "FETCH_PROJECTS_FAILED";
export const FETCH_PROJECTS_SUCCEEDED = "FETCH_PROJECTS_SUCCEEDED";

const initialState = {
  items: {},
  isLoading: false,
  error: null,
};

const projects = (state = initialState, action) => {
  switch (action.type) {
    case "RECEIVE_ENTITIES": {
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

export const getProjects = (state) => state.items;
export const getIsLoading = (state) => state.isLoading;
export const getError = (state) => state.error;
